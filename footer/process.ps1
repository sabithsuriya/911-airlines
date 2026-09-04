Add-Type -AssemblyName System.Drawing

$inputPath = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\orion-footer-ref.png"
$outputPath = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\clean-plane-bg.png"

$bmp = [System.Drawing.Bitmap]::FromFile($inputPath)
$width = $bmp.Width
$height = $bmp.Height

Write-Host "Image dimensions: $width x $height"

# Let's inspect the lower half where the text is
# We can create a cleaned bitmap
$cleaned = New-Object System.Drawing.Bitmap($width, $height)
$g = [System.Drawing.Graphics]::FromImage($cleaned)
$g.DrawImage($bmp, 0, 0, $width, $height)

# The text ".Orion Airlines" has high brightness / white overlay.
# We can remove the white overlay by blending with surrounding texture/gradients or sampling the engine/runway colors
# Save cleaned
$cleaned.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
$cleaned.Dispose()
Write-Host "Done copying bitmap"
