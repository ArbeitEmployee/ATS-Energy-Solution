const fs = require('fs');
const html = fs.readFileSync('E:/atsenergybd/client/scratch/ats_homepage.html', 'utf8');

const idx = html.indexOf('ABOUT US');
if (idx !== -1) {
  console.log('--- ABOUT US SECTION ---');
  console.log(html.substring(idx - 600, idx + 1200));
}
