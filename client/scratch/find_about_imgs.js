const fs = require('fs');
const html = fs.readFileSync('E:/atsenergybd/client/scratch/ats_homepage.html', 'utf8');

const matches = html.match(/https?:\/\/[^"'\s]+\.(?:jpg|jpeg|png|webp)/gi) || [];
const batteryImgs = matches.filter(m => /battery|ips|solar|photo|banner|about/i.test(m));
console.log('Relevant images from atsenergybd.com:', [...new Set(batteryImgs)]);
