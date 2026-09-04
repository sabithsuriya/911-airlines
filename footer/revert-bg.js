const fs = require('fs');

function updateFile(filename) {
    let content = fs.readFileSync(filename, 'utf8');

    // Regex to match the current simplified background CSS
    const bgRegex = /background-color: #66a9d7;\s*background-image:[\s\S]*?background-repeat: no-repeat;/;

    const originalBg = `/* Single continuous background: Sky blue gradient multiply-blended over clean nose-on Boeing */
  background-color: #6baed6;
  background-image:
    linear-gradient(180deg,
      rgba(106, 174, 214, 0.96) 0%,
      rgba(125, 185, 221, 0.90) 30%,
      rgba(142, 197, 228, 0.72) 55%,
      rgba(160, 209, 235, 0.35) 75%,
      rgba(175, 218, 240, 0.50) 100%
    ),
    url('./full-footer-plane-bg.jpg');
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  background-blend-mode: multiply, normal;`;

    if (filename === 'index.html') {
        // extract the base64 url from index.html first
        const match = content.match(/url\(['"]?(data:image\/jpeg;base64,[^'"]+)['"]?\)/);
        if (match) {
            const base64Url = match[0];
            const originalBgHTML = `/* Single continuous background: Sky blue gradient multiply-blended over clean nose-on Boeing */
    background-color: #6baed6;
    background-image:
      linear-gradient(180deg,
        rgba(106, 174, 214, 0.96) 0%,
        rgba(125, 185, 221, 0.90) 30%,
        rgba(142, 197, 228, 0.72) 55%,
        rgba(160, 209, 235, 0.35) 75%,
        rgba(175, 218, 240, 0.50) 100%
      ),
      ${base64Url};
    background-size: cover;
    background-position: center bottom;
    background-repeat: no-repeat;
    background-blend-mode: multiply, normal;`;
            content = content.replace(bgRegex, originalBgHTML);
        }
    } else {
        content = content.replace(bgRegex, originalBg);
    }

    fs.writeFileSync(filename, content);
    console.log(`Updated ${filename}`);
}

updateFile('Footer911.css');
updateFile('index.html');
