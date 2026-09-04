const sharp = require('sharp');

async function main() {
    const meta = await sharp('C:/Users/rosha/.gemini/antigravity/scratch/911-airlines/airplane.webp').metadata();
    console.log('Metadata:', meta);
    // Crop bottom ~12% which has the footer and plane
    const footerHeight = Math.round(meta.height * 0.115);
    const top = meta.height - footerHeight;
    await sharp('C:/Users/rosha/.gemini/antigravity/scratch/911-airlines/airplane.webp')
        .extract({ left: 0, top: top, width: meta.width, height: footerHeight })
        .toFile('C:/Users/rosha/.gemini/antigravity/scratch/911-airlines/footer-plane-only.png');
    console.log('Successfully cropped footer image to footer-plane-only.png');
}

main().catch(err => console.error(err));
