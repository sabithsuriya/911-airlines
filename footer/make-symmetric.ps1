Add-Type -AssemblyName System.Drawing

$src = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\boeing-front-777.jpg"
$dst = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\clean-boeing-symmetric.png"

$bmp = [System.Drawing.Bitmap]::FromFile($src)
$noseX = 422
$h = $bmp.Height
$halfW = $bmp.Width - $noseX  # 1280 - 422 = 858
$newW = $halfW * 2 # 1716

$out = New-Object System.Drawing.Bitmap($newW, $h)
$g = [System.Drawing.Graphics]::FromImage($out)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

# Right side (from noseX to right):
$srcRectRight = New-Object System.Drawing.Rectangle($noseX, 0, $halfW, $h)
$dstRectRight = New-Object System.Drawing.Rectangle($halfW, 0, $halfW, $h)
$g.DrawImage($bmp, $dstRectRight, $srcRectRight, [System.Drawing.GraphicsUnit]::Pixel)

# Left side (mirrored):
$bmp.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipX)
$srcRectLeft = New-Object System.Drawing.Rectangle(0, 0, $halfW, $h)
$dstRectLeft = New-Object System.Drawing.Rectangle(0, 0, $halfW, $h)
$g.DrawImage($bmp, $dstRectLeft, $srcRectLeft, [System.Drawing.GraphicsUnit]::Pixel)

$g.Dispose()
$bmp.Dispose()
$out.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
$out.Dispose()
Write-Host "Symmetric clean plane created: $newW x $h"
