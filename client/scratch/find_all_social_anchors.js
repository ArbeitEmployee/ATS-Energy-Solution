const fs = require('fs');
const html = fs.readFileSync('E:/atsenergybd/client/scratch/ats_homepage.html', 'utf8');

const regex = /<a[^>]+href="([^"]+)"[^>]*>/gi;
let m;
const social = [];
while ((m = regex.exec(html)) !== null) {
  const href = m[1];
  if (/facebook|twitter|instagram|linkedin|youtube|wa\.me|whatsapp|tel:|mailto:/i.test(href)) {
    social.push({ tag: m[0], href });
  }
}
console.log('Found social/contact anchors:', social);
