Add-Type -AssemblyName System.Drawing

$src = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\orion-footer-ref.png"
$dst = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\clean-plane.png"

$bmp = [System.Drawing.Bitmap]::FromFile($src)
$w = $bmp.Width
$h = $bmp.Height

$out = New-Object System.Drawing.Bitmap($w, $h)
$graphics = [System.Drawing.Graphics]::FromImage($out)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

# 1. Copy base image
$graphics.DrawImage($bmp, 0, 0, $w, $h)

# 2. Re-paint bottom sky background areas with the exact smooth gradient
# Sky zones in bottom region (y: 280 to 462):
for ($y = 280; $y -lt $h; $y++) {
    $factor = ($y - 280) / ($h - 280)
    $red = [int](142 + $factor * 25)
    $grn = [int](196 + $factor * 18)
    $blu = [int](228 + $factor * 12)
    $skyPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb($red, $grn, $blu), 1)

    # Leftmost sky
    $graphics.DrawLine($skyPen, 0, $y, 65, $y)
    # Between left engine and nose
    $graphics.DrawLine($skyPen, 230, $y, 360, $y)
    # Between nose and right engine
    $graphics.DrawLine($skyPen, 560, $y, 680, $y)
    # Rightmost sky
    $graphics.DrawLine($skyPen, 865, $y, $w, $y)

    $skyPen.Dispose()
}

# 3. Clean Left Engine ring (x: 65 to 230, y: 340 to 462)
$engineBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(40, 46, 54))
$engineRimPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 190, 200), 5)
$engineInnerBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(25, 28, 33))

# Left engine: center ~(148, 430), radius ~65
$graphics.FillEllipse($engineBrush, 83, 365, 130, 130)
$graphics.FillEllipse($engineInnerBrush, 98, 380, 100, 100)
$graphics.DrawEllipse($engineRimPen, 85, 367, 126, 126)

# Right engine: center ~(772, 430), radius ~65
$graphics.FillEllipse($engineBrush, 707, 365, 130, 130)
$graphics.FillEllipse($engineInnerBrush, 722, 380, 100, 100)
$graphics.DrawEllipse($engineRimPen, 709, 367, 126, 126)

# Spinner cones (center of engines)
$coneBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(210, 220, 230))
$graphics.FillEllipse($coneBrush, 142, 424, 12, 12)
$graphics.FillEllipse($coneBrush, 766, 424, 12, 12)

# 4. Clean Lower Fuselage / Nose Strut / Runway (x: 360 to 560, y: 390 to 462)
# Runway line and landing gear
$runwayBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(70, 78, 88))
$graphics.FillRectangle($runwayBrush, 360, 435, 200, 27)

# Tarmac center line
$tarmacLinePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(215, 180, 50), 3)
$graphics.DrawLine($tarmacLinePen, 460, 438, 460, 462)

# Landing gear strut (vertical gray column in center)
$strutBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(200, 205, 215))
$graphics.FillRectangle($strutBrush, 454, 380, 12, 58)

# Wheels
$wheelBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(35, 38, 42))
$graphics.FillEllipse($wheelBrush, 442, 428, 14, 26)
$graphics.FillEllipse($wheelBrush, 464, 428, 14, 26)

# Dispose
$engineBrush.Dispose()
$engineRimPen.Dispose()
$engineInnerBrush.Dispose()
$coneBrush.Dispose()
$runwayBrush.Dispose()
$tarmacLinePen.Dispose()
$strutBrush.Dispose()
$wheelBrush.Dispose()
$graphics.Dispose()
$bmp.Dispose()

$out.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
$out.Dispose()
Write-Host "Pristine clean-plane.png generated!"
