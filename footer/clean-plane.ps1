Add-Type -AssemblyName System.Drawing

$src = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\orion-footer-ref.png"
$dst = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\clean-plane.png"

$bmp = [System.Drawing.Bitmap]::FromFile($src)
$w = $bmp.Width
$h = $bmp.Height

$out = New-Object System.Drawing.Bitmap($w, $h)

# Copy pixel by pixel with smart text removal
for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $c = $bmp.GetPixel($x, $y)
        $r = $c.R
        $g = $c.G
        $b = $c.B
        
        # Check if in text area (bottom 35% of image)
        if ($y -gt 315) {
            $isWhiteText = ($r -gt 215 -and $g -gt 225 -and $b -gt 235) -or ($r -gt 235 -and $g -gt 235 -and $b -gt 235)
            if ($isWhiteText) {
                # Look up and down for non-white pixels to interpolate
                $replaced = $false
                for ($offset = 8; $offset -le 35; $offset++) {
                    if ($y - $offset -ge 280) {
                        $upColor = $bmp.GetPixel($x, $y - $offset)
                        if (-not ($upColor.R -gt 215 -and $upColor.G -gt 225 -and $upColor.B -gt 235)) {
                            $c = $upColor
                            $replaced = $true
                            break
                        }
                    }
                }
                if (-not $replaced) {
                    for ($offset = 8; $offset -le 35; $offset++) {
                        if ($y + $offset -lt $h) {
                            $downColor = $bmp.GetPixel($x, $y + $offset)
                            if (-not ($downColor.R -gt 215 -and $downColor.G -gt 225 -and $downColor.B -gt 235)) {
                                $c = $downColor
                                $replaced = $true
                                break
                            }
                        }
                    }
                }
            }
        }
        
        $out.SetPixel($x, $y, $c)
    }
}

$bmp.Dispose()
$out.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
$out.Dispose()
Write-Host "clean-plane.png successfully generated"
