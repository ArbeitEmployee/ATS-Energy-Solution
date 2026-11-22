const fs = require('fs');
const html = fs.readFileSync('E:/atsenergybd/client/scratch/ats_homepage.html', 'utf8');

const testIdx = html.indexOf('Client Testimonials');
const testSection = html.substring(testIdx, testIdx + 7000);

const slides = testSection.split('elementskit-single-testimonial-slider');
console.log('Testimonial slides count:', slides.length - 1);

slides.slice(1).forEach((s, i) => {
  const quoteMatch = s.match(/<p>([\s\S]*?)<\/p>/);
  const nameMatch = s.match(/class="elementskit-author-name">([\s\S]*?)<\/strong>/);
  const desMatch = s.match(/class="elementskit-author-des">([\s\S]*?)<\/span>/);
  const imgMatch = s.match(/src="([^"]+)"/);
  console.log('Slide', i + 1, {
    author: nameMatch ? nameMatch[1].trim() : '',
    designation: desMatch ? desMatch[1].trim() : '',
    quote: quoteMatch ? quoteMatch[1].replace(/<[^>]+>/g, '').trim() : '',
    image: imgMatch ? imgMatch[1] : ''
  });
});
