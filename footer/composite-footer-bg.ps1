Add-Type -AssemblyName System.Drawing

$planePath = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\clean-boeing-symmetric.png"
$outputPath = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\final-clean-footer-plane.jpg"
$base64Path = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\plane-base64.txt"

$plane = [System.Drawing.Bitmap]::FromFile($planePath)

# We want a 1600 x 700 banner for the footer background
$canvasW = 1600
$canvasH = 700

$finalBmp = New-Object System.Drawing.Bitmap($canvasW, $canvasH)
$g = [System.Drawing.Graphics]::FromImage($finalBmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

# 1. Draw smooth sky-blue gradient matching the Orion theme
# Top: #6dafd7, Bottom: #9cd1eb
$rect = New-Object System.Drawing.Rectangle(0, 0, $canvasW, $canvasH)
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.Color]::FromArgb(109, 175, 215), [System.Drawing.Color]::FromArgb(156, 209, 235), [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
$g.FillRectangle($brush, $rect)
$brush.Dispose()

# 2. Draw the plane on the bottom half
# Scale plane to fit width naturally
$planeDestW = 1500
$planeDestH = [int]($plane.Height * ($planeDestW / $plane.Width))
$planeDestX = ($canvasW - $planeDestW) / 2
$planeDestY = $canvasH - $planeDestH + 20

# Create image attributes to make the white background of the plane blend seamlessly with the sky gradient
$imgAttr = New-Object System.Drawing.Imaging.ImageAttributes
# Color key or transparent blend
$destRect = New-Object System.Drawing.Rectangle($planeDestX, $planeDestY, $planeDestW, $planeDestH)
$g.DrawImage($plane, $destRect, 0, 0, $plane.Width, $plane.Height, [System.Drawing.GraphicsUnit]::Pixel)

$g.Dispose()
$plane.Dispose()

# Save as optimized JPEG
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]90)

$finalBmp.Save($outputPath, $codec, $encoderParams)
$finalBmp.Dispose()

# Generate base64 string
$bytes = [System.IO.File]::ReadAllBytes($outputPath)
$base64 = [System.Convert]::ToBase64String($bytes)
"data:image/jpeg;base64,$base64" | Out-File -FilePath $base64Path -Encoding ascii -NoNewline

Write-Host "Done generating final-clean-footer-plane.jpg and base64 string"
