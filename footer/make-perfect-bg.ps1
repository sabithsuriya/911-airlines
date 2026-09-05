Add-Type -AssemblyName System.Drawing

$planePath = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\clean-boeing-symmetric.png"
$outputPath = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\full-footer-plane-bg.jpg"
$base64Path = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\full-plane-base64.txt"

$plane = [System.Drawing.Bitmap]::FromFile($planePath)
$pw = $plane.Width
$ph = $plane.Height

$cw = 1600
$ch = 820

$canvas = New-Object System.Drawing.Bitmap($cw, $ch)
$g = [System.Drawing.Graphics]::FromImage($canvas)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# 1. Sky blue gradient across entire footer
$rect = New-Object System.Drawing.Rectangle(0, 0, $cw, $ch)
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $rect, 
    [System.Drawing.Color]::FromArgb(102, 169, 215), 
    [System.Drawing.Color]::FromArgb(156, 209, 235), 
    [System.Drawing.Drawing2D.LinearGradientMode]::Vertical
)
$g.FillRectangle($brush, $rect)
$brush.Dispose()

# 2. Draw plane cleanly
# Sizing plane to fit across the bottom
$planeW = 1650
$planeH = [int]($ph * ($planeW / $pw))
$planeX = [int](($cw - $planeW) / 2)
$planeY = $ch - $planeH + 10 # Position plane so nose rises into the middle

# Set ColorKey so the light gray/white background of the studio shot becomes transparent
$imgAttr = New-Object System.Drawing.Imaging.ImageAttributes
# Map studio white background (RGB 240-255) to transparent
$imgAttr.SetColorKey([System.Drawing.Color]::FromArgb(238, 238, 238), [System.Drawing.Color]::FromArgb(255, 255, 255))

$destRect = New-Object System.Drawing.Rectangle($planeX, $planeY, $planeW, $planeH)
$g.DrawImage($plane, $destRect, 0, 0, $pw, $ph, [System.Drawing.GraphicsUnit]::Pixel, $imgAttr)

$imgAttr.Dispose()
$g.Dispose()
$plane.Dispose()

# Save high quality JPEG
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]92)

$canvas.Save($outputPath, $codec, $encoderParams)
$canvas.Dispose()

# Export base64
$bytes = [System.IO.File]::ReadAllBytes($outputPath)
$base64 = [System.Convert]::ToBase64String($bytes)
"data:image/jpeg;base64,$base64" | Out-File -FilePath $base64Path -Encoding ascii -NoNewline

Write-Host "Hardware-accelerated smooth background created! Size: $($bytes.Length)"
