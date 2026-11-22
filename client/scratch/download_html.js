const https = require('https');
const fs = require('fs');

https.get('https://atsenergybd.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('E:/atsenergybd/client/scratch/ats_homepage.html', data, 'utf8');
    console.log('Saved ats_homepage.html, length:', data.length);
  });
}).on('error', err => console.error(err));
