const fs = require('fs');
const html = fs.readFileSync('E:/atsenergybd/client/scratch/ats_homepage.html', 'utf8');

const start = 80507 - 2000;
const slice = html.substring(start, start + 3000);
const imgMatches = slice.match(/src="([^"]+)"/g) || [];
console.log('Images in About Us section:', imgMatches);
