const https = require('https');

https.get('https://atsenergybd.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Find all image URLs
    const matches = data.match(/https?:\/\/[^"'\s]+\.(?:png|jpg|jpeg|webp|svg)/gi) || [];
    const unique = [...new Set(matches)];
    console.log('Unique media URLs:', unique.length);

    // Look for client sections
    const lower = data.toLowerCase();
    const idxClient = lower.indexOf('client');
    if (idxClient !== -1) {
      console.log('--- CLIENT CONTEXT ---');
      console.log(data.substring(Math.max(0, idxClient - 300), idxClient + 1000));
    }

    const idxPartner = lower.indexOf('partner');
    if (idxPartner !== -1) {
      console.log('--- PARTNER CONTEXT ---');
      console.log(data.substring(Math.max(0, idxPartner - 300), idxPartner + 1000));
    }
  });
}).on('error', err => console.error(err));
