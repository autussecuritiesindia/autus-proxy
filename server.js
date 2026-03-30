const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use((req, res) => {
  const target = req.url.slice(1);
  if (!target.startsWith('https://stooq.com/')) {
    return res.status(403).json({ error: 'Only stooq.com allowed' });
  }
  fetch(target, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Referer': 'https://stooq.com/',
      'Accept': 'text/html,*/*',
    }
  })
  .then(r => r.text())
  .then(text => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/plain');
    res.send(text);
  })
  .catch(e => res.status(502).json({ error: e.message }));
});

app.listen(process.env.PORT || 3000);
```

**Step 3 — Connect to Render:**

1. Go to your Render dashboard
2. **New → Web Service → Connect a repository** → pick `autus-proxy`
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Instance: **Free**
6. Deploy

Once deployed, test in browser:
```
https://your-render-url.onrender.com/https://stooq.com/q/l/?s=%5Ensei&f=sd2ohlcvp&e=csv
