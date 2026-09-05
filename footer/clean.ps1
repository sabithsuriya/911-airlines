Add-Type -AssemblyName System.Drawing

$inputPath = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\orion-footer-ref.png"
$outputPath = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\clean-plane-bg.png"

$bmp = [System.Drawing.Bitmap]::FromFile($inputPath)
$w = $bmp.Width
$h = $bmp.Height

$cleaned = New-Object System.Drawing.Bitmap($w, $h)

# Process pixel by pixel
for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $c = $bmp.GetPixel($x, $y)
        $r = $c.R
        $g = $c.G
        $b = $c.B
        
        # If in the bottom region where the text overlay is (y > 280)
        # and the pixel is bright white or part of the text overlay:
        if ($y -gt 290 -and $y -lt 450) {
            # Check if this pixel is on the sky/blue background on the left/right
            # or on the engines / fuselage
            # If it's part of the text (high brightness relative to background):
            # For sky area (x < 150 or x > 750), the background is sky blue: R~150, G~195, B~230
            # For engine area, background is dark metallic / runway gray
        }
        
        $cleaned.SetPixel($x, $y, $c)
    }
}

$bmp.Dispose()
$cleaned.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$cleaned.Dispose()
Write-Host "Processed clean image"
