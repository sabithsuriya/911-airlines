Add-Type -AssemblyName System.Drawing

$src = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\clean-boeing-symmetric.png"
$jpgPath = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\clean-boeing-opt.jpg"
$base64Path = "C:\Users\rosha\.gemini\antigravity\scratch\911-airlines\plane-base64.txt"

$bmp = [System.Drawing.Bitmap]::FromFile($src)

# Save as optimized JPEG
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]88)

$bmp.Save($jpgPath, $codec, $encoderParams)
$bmp.Dispose()

$bytes = [System.IO.File]::ReadAllBytes($jpgPath)
$base64 = [System.Convert]::ToBase64String($bytes)
"data:image/jpeg;base64,$base64" | Out-File -FilePath $base64Path -Encoding ascii -NoNewline

Write-Host ("Optimized plane base64 generated! Size: " + $bytes.Length + " bytes")
