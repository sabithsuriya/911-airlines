Add-Type -AssemblyName System.Drawing

$planePath = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\clean-boeing-symmetric.png"
$outputPath = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\final-clean-footer-plane.jpg"
$base64Path = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\plane-base64.txt"

$plane = [System.Drawing.Bitmap]::FromFile($planePath)
$pw = $plane.Width
$ph = $plane.Height

$cw = 1600
$ch = 600

$canvas = New-Object System.Drawing.Bitmap($cw, $ch)

# 1. Paint sky blue gradient (from top #6baed6 to bottom #9bd0eb)
for ($y = 0; $y -lt $ch; $y++) {
    $factor = $y / $ch
    $r = [int](107 + $factor * 48)
    $g = [int](174 + $factor * 34)
    $b = [int](214 + $factor * 21)
    
    for ($x = 0; $x -lt $cw; $x++) {
        $canvas.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($r, $g, $b))
    }
}

# 2. Draw plane with blend
$scale = 1.05
$dw = [int]($pw * $scale)
$dh = [int]($ph * $scale)
$startX = [int](($cw - $dw) / 2)
$startY = [int]($ch - $dh + 40)

for ($py = 0; $py -lt $ph; $py++) {
    $cy = $startY + [int]($py * $scale)
    if ($cy -lt 0 -or $cy -ge $ch) { continue }
    
    for ($px = 0; $px -lt $pw; $px++) {
        $cx = $startX + [int]($px * $scale)
        if ($cx -lt 0 -or $cx -ge $cw) { continue }
        
        $pc = $plane.GetPixel($px, $py)
        $pr = $pc.R
        $pg = $pc.G
        $pb = $pc.B
        
        $bgDist = [Math]::Min($pr, [Math]::Min($pg, $pb))
        if ($bgDist -gt 238 -and $py -lt ($ph * 0.4)) {
            continue
        }
        
        $bgPixel = $canvas.GetPixel($cx, $cy)
        
        $isLight = ($pr -gt 220 -and $pg -gt 200 -and $pb -lt 180)
        if ($isLight) {
            $nr = [Math]::Min(255, $bgPixel.R + $pr)
            $ng = [Math]::Min(255, $bgPixel.G + $pg)
            $nb = [Math]::Min(255, $bgPixel.B + $pb)
            $canvas.SetPixel($cx, $cy, [System.Drawing.Color]::FromArgb($nr, $ng, $nb))
        } elseif ($bgDist -gt 235) {
            $alpha = (255 - $bgDist) / 20.0
            $nr = [int]($bgPixel.R * (1 - $alpha) + $pr * $alpha)
            $ng = [int]($bgPixel.G * (1 - $alpha) + $pg * $alpha)
            $nb = [int]($bgPixel.B * (1 - $alpha) + $pb * $alpha)
            $canvas.SetPixel($cx, $cy, [System.Drawing.Color]::FromArgb($nr, $ng, $nb))
        } else {
            $canvas.SetPixel($cx, $cy, $pc)
        }
    }
}

$plane.Dispose()

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]92)

$canvas.Save($outputPath, $codec, $encoderParams)
$canvas.Dispose()

$bytes = [System.IO.File]::ReadAllBytes($outputPath)
$base64 = [System.Convert]::ToBase64String($bytes)
"data:image/jpeg;base64,$base64" | Out-File -FilePath $base64Path -Encoding ascii -NoNewline

Write-Host "Seamless blended plane background created!"
