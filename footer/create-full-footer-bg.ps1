Add-Type -AssemblyName System.Drawing

$planePath = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\clean-boeing-symmetric.png"
$outputPath = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\full-footer-plane-bg.jpg"
$base64Path = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\full-plane-base64.txt"

$plane = [System.Drawing.Bitmap]::FromFile($planePath)
$pw = $plane.Width
$ph = $plane.Height

# We want a 1600 x 800 canvas spanning the entire footer
$cw = 1600
$ch = 800

$canvas = New-Object System.Drawing.Bitmap($cw, $ch)
$g = [System.Drawing.Graphics]::FromImage($canvas)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

# 1. Paint smooth sky blue gradient matching Orion reference
# Top is #66a9d7, Middle is #7cb8dc, Bottom is #92c9e7
$rect = New-Object System.Drawing.Rectangle(0, 0, $cw, $ch)
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $rect, 
    [System.Drawing.Color]::FromArgb(102, 169, 215), 
    [System.Drawing.Color]::FromArgb(152, 207, 235), 
    [System.Drawing.Drawing2D.LinearGradientMode]::Vertical
)
$g.FillRectangle($brush, $rect)
$brush.Dispose()

# 2. Position the airplane in the lower portion with nose rising into the middle
# Sizing plane to fit nicely across the bottom
$planeW = 1550
$planeH = [int]($ph * ($planeW / $pw))
$planeX = [int](($cw - $planeW) / 2)
$planeY = $ch - $planeH + 30 # Nose reaches y ~ 340px (middle of footer)

# Draw plane with soft alpha blending for pure white background areas
for ($py = 0; $py -lt $ph; $py++) {
    $cy = $planeY + [int]($py * ($planeW / $pw))
    if ($cy -lt 0 -or $cy -ge $ch) { continue }
    
    for ($px = 0; $px -lt $pw; $px++) {
        $cx = $planeX + [int]($px * ($planeW / $pw))
        if ($cx -lt 0 -or $cx -ge $cw) { continue }
        
        $pc = $plane.GetPixel($px, $py)
        $pr = $pc.R
        $pg = $pc.G
        $pb = $pc.B
        
        $bgDist = [Math]::Min($pr, [Math]::Min($pg, $pb))
        
        # Pure white background of plane studio shot above nose/wings
        if ($bgDist -gt 240 -and $py -lt ($ph * 0.45)) {
            continue
        }
        
        $bgPixel = $canvas.GetPixel($cx, $cy)
        
        # Glowing lights
        $isLight = ($pr -gt 210 -and $pg -gt 190 -and $pb -lt 180)
        if ($isLight) {
            $nr = [Math]::Min(255, $bgPixel.R + $pr)
            $ng = [Math]::Min(255, $bgPixel.G + $pg)
            $nb = [Math]::Min(255, $bgPixel.B + $pb)
            $canvas.SetPixel($cx, $cy, [System.Drawing.Color]::FromArgb($nr, $ng, $nb))
        } elseif ($bgDist -gt 230) {
            # Feather edge
            $alpha = (255 - $bgDist) / 25.0
            if ($alpha -lt 0) { $alpha = 0 }
            if ($alpha -gt 1) { $alpha = 1 }
            $nr = [int]($bgPixel.R * (1 - $alpha) + $pr * $alpha)
            $ng = [int]($bgPixel.G * (1 - $alpha) + $pg * $alpha)
            $nb = [int]($bgPixel.B * (1 - $alpha) + $pb * $alpha)
            $canvas.SetPixel($cx, $cy, [System.Drawing.Color]::FromArgb($nr, $ng, $nb))
        } else {
            $canvas.SetPixel($cx, $cy, $pc)
        }
    }
}

$g.Dispose()
$plane.Dispose()

# Save optimized JPEG
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]90)

$canvas.Save($outputPath, $codec, $encoderParams)
$canvas.Dispose()

# Base64 export
$bytes = [System.IO.File]::ReadAllBytes($outputPath)
$base64 = [System.Convert]::ToBase64String($bytes)
"data:image/jpeg;base64,$base64" | Out-File -FilePath $base64Path -Encoding ascii -NoNewline

Write-Host "Full footer background generated! Size: $($bytes.Length) bytes"
