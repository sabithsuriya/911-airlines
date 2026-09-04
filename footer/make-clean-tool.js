const fs = require('fs');

// We can create an HTML file that uses browser canvas to load orion-footer-ref.png,
// remove the white text ".Orion Airlines" using clone stamp / inpainting / gradient blending,
// and export the clean image as PNG!

const htmlContent = `
<!DOCTYPE html>
<html>
<body>
<canvas id="canvas"></canvas>
<img id="refImg" src="./orion-footer-ref.png" style="display:none;" />
<script>
window.onload = function() {
    const img = document.getElementById('refImg');
    const canvas = document.getElementById('canvas');
    canvas.width = img.naturalWidth || 907;
    canvas.height = img.naturalHeight || 462;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    const w = canvas.width;
    const h = canvas.height;

    // The text ".Orion Airlines" is located in y: 310 to 455
    // Let's remove the white text overlay
    for (let y = 300; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const idx = (y * w + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];

            // Detect white text overlay pixels (high brightness or distinct white tint)
            const brightness = (r + g + b) / 3;
            const isWhiteText = (r > 200 && g > 215 && b > 230) || (r > 230 && g > 235 && b > 240);

            if (isWhiteText) {
                // If it's in the sky background area (left or right of fuselage/engines)
                if (x < 110 || (x > 210 && x < 350) || (x > 550 && x < 690) || x > 790) {
                    // Sky gradient: calculate vertical gradient based on y
                    // At y=300: #88c1e2 (136, 193, 226), at y=460: #a2d2ec (162, 210, 236)
                    const factor = (y - 300) / 160;
                    data[idx] = Math.round(136 + factor * 26);
                    data[idx + 1] = Math.round(193 + factor * 17);
                    data[idx + 2] = Math.round(226 + factor * 10);
                } else if (x >= 60 && x <= 220) {
                    // Left engine area: sample from nearby dark engine pixels
                    data[idx] = 45;
                    data[idx + 1] = 50;
                    data[idx + 2] = 58;
                } else if (x >= 690 && x <= 850) {
                    // Right engine area: sample from dark engine
                    data[idx] = 45;
                    data[idx + 1] = 50;
                    data[idx + 2] = 58;
                } else {
                    // Fuselage / strut / ground area (center)
                    // Sample from nearby pixels or smooth
                    data[idx] = 180;
                    data[idx + 1] = 185;
                    data[idx + 2] = 195;
                }
            }
        }
    }

    ctx.putImageData(imgData, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');
    console.log('CLEAN_DATA_URL_GENERATED');
    // Also save to localStorage or document body for preview
    const resultImg = document.createElement('img');
    resultImg.src = dataUrl;
    resultImg.id = 'cleanPlaneImg';
    document.body.appendChild(resultImg);
};
</script>
</body>
</html>
`;

fs.writeFileSync('C:/Users/rosha/.gemini/antigravity/scratch/911-airlines/clean-tool.html', htmlContent);
console.log('clean-tool.html created');
