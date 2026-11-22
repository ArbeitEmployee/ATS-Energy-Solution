const fs = require('fs');
const html = fs.readFileSync('E:/atsenergybd/client/scratch/ats_homepage.html', 'utf8');

const regex = /https?:\/\/(?:www\.)?(?:facebook|fb|instagram|linkedin|youtube|twitter|x|tiktok|whatsapp|wa\.me)[^\s"'<>]+/gi;
const matches = html.match(regex) || [];
console.log('Social media links on atsenergybd.com:', [...new Set(matches)]);

// Also search for hrefs in footer
const footerIdx = html.indexOf('footer');
if (footerIdx !== -1) {
  const footerHtml = html.substring(footerIdx, footerIdx + 5000);
  const hrefMatches = footerHtml.match(/href="([^"]+)"/g) || [];
  console.log('Footer links:', hrefMatches);
}
