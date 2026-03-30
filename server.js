const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use((req, res) => {
  const target = decodeURIComponent(req.url.slice(1));
  if (!target.startsWith('https://stooq.com/')) {
    return res.status(403).json({ error: 'Only stooq.com allowed' });
  }
  fetch(target, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Referer': 'https://stooq.com/',
      'Accept': 'text/html,*/*',
      'Accept-Language': 'en-US,en;q=0.9',
    }
  })
  .then(r => r.text())
  .then(text => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.send(text);
  })
  .catch(e => res.status(502).json({ error: e.message }));
});

app.listen(process.env.PORT || 3000, () => console.log('Proxy ready'));
