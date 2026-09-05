const fs = require('fs');

function updateFile(filename) {
    let content = fs.readFileSync(filename, 'utf8');

    // Regex to match the background-image linear-gradient and url up to background-blend-mode
    const bgRegex = /background-color: #6baed6;\s*background-image:[\s\S]*?background-blend-mode: multiply, normal;/;
    
    const newBg = `background-color: #66a9d7;
  background-image: url('./full-footer-plane-bg.jpg');
  background-size: 140% auto;
  background-position: center bottom;
  background-repeat: no-repeat;`;

    // Note: index.html has a base64 URL. We must preserve that or replace it.
    if (filename === 'index.html') {
        // extract the base64 url from index.html first
        const match = content.match(/url\(['"]?(data:image\/jpeg;base64,[^'"]+)['"]?\)/);
        if (match) {
            const base64Url = match[0];
            const newBgHTML = `background-color: #66a9d7;
    background-image: ${base64Url};
    background-size: 140% auto;
    background-position: center bottom;
    background-repeat: no-repeat;`;
            content = content.replace(bgRegex, newBgHTML);
        } else {
            console.log("Could not find base64 in index.html");
        }
    } else {
        content = content.replace(bgRegex, newBg);
    }
    
    // Check if we need to replace 110vh back to 100vh? The user said "increase... slightly if needed". Let's leave at 100vh just to be standard since it doesn't need height increase anymore.
    content = content.replace(/min-height: 110vh;/g, 'min-height: 100vh;');

    fs.writeFileSync(filename, content);
    console.log(`Updated ${filename}`);
}

updateFile('Footer911.css');
updateFile('index.html');
