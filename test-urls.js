import https from "https";
const urls = [
"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=2000",
"https://images.unsplash.com/photo-1542156822-6924d1a71ace?auto=format&fit=crop&q=80&w=2000",
"https://images.unsplash.com/photo-1484515991647-c5760fce7c70?auto=format&fit=crop&q=80&w=2000",
"https://images.unsplash.com/photo-1489987707023-afc1528abe1b?auto=format&fit=crop&q=80&w=2000"
];
urls.forEach(url => {
  https.get(url, (res) => {
    console.log(res.statusCode, url);
  });
});

