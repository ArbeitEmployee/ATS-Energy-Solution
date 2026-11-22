const fs = require('fs');
const html = fs.readFileSync('E:/atsenergybd/client/scratch/ats_homepage.html', 'utf8');

const regex = /About\s*Us/i;
const match = regex.exec(html);
if (match) {
  console.log('Found About Us at index:', match.index);
  console.log(html.substring(match.index - 500, match.index + 1500));
} else {
  console.log('Not found');
}
