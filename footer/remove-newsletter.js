const fs = require('fs');

function removeNewsletter(filename) {
    let content = fs.readFileSync(filename, 'utf8');

    // Regex to match the newsletter block. We match from the start of the newsletter div
    // down to its specific final closing div, right before the footer-top closing tag.
    const newsletterRegexHTML = /\s*<div class="newsletter">[\s\S]*?<p class="privacy-note">[\s\S]*?<\/p>\s*<\/div>/;
    const newsletterRegexJSX = /\s*\{\/\* Newsletter \*\/\}\s*<div className="newsletter">[\s\S]*?<p className="privacy-note">[\s\S]*?<\/p>\s*<\/div>/;

    if (filename.endsWith('.html')) {
        content = content.replace(newsletterRegexHTML, '');
    } else if (filename.endsWith('.jsx')) {
        content = content.replace(newsletterRegexJSX, '');
    }

    fs.writeFileSync(filename, content);
    console.log(`Updated ${filename}`);
}

removeNewsletter('index.html');
removeNewsletter('Footer911.jsx');
