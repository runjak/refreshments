const express = require('express');
const app = express();
const port = 3000;

// https://en.wikipedia.org/wiki/Meta_refresh

const routes = {
  meta: '/meta',
  refresh: '/refresh',
  reload: '/reload',
  unmeta: '/unmeta',
  url: '/url',
  iframe: '/iframe',
};

const getS = () => Math.floor(Math.random() * 10) + 1;

app.get(routes.meta, (req, res) => {
  console.log(routes.meta);
  const s = getS();

  res.send(`
    <html>
      <head>
        <title>/meta</title>
        <meta http-equiv="refresh" content="${s}">
      </head>
      <body>
        Waiting for ${s}.
      </body>
    </html>
  `);
});

app.get(routes.refresh, (req, res) => {
  console.log(routes.refresh);
  const s = getS();

  res.set('refresh', s);
  res.send(`
    <html>
      <head>
        <title>/refresh</title>
      </head>
      <body>
        Waiting for ${s}.
      </body>
    </html>
  `);
});

app.get(routes.reload, (res, req) => {
  console.log(routes.reload);
  const s = getS();

  req.send(`
    <html>
      <head>
        <title>/reload</title>
        <script>
          window.setTimeout(() => {
            window.location.reload();
          }, ${s * 1000});
        </script>
      </head>
      <body>
        Waiting for ${s}.
      </body>
    </html>
  `);
});

app.get(routes.unmeta, (req, res) => {
  console.log(routes.unmeta);
  const s = getS();

  res.send(`
    <html>
      <head>
        <title>${routes.unmeta}</title>
        <meta http-equiv="refresh" content="${s}">
        <script>
          document.querySelector('meta').remove();
          document.querySelector('script').remove();
        </script>
      </head>
      <body>
        Waiting for ${s}.
      </body>
    </html>
  `);
});

app.get(routes.url, (req, res) => {
  console.log(routes.url);
  const s = 1; // getS();
  const m = `${s}; url=data:text/plain,You should not have been redirected here.`;
  // const m = `${s}; url=javascript:alert("wat")`;

  res.set('refresh', m);
  res.send(`
    <html>
      <head>
        <title>/url</title>
      </head>
      <body>
        Waiting for ${s}.
      </body>
    </html>
  `);
});

app.get(routes.iframe, (req, res) => {
  console.log(routes.iframe);
  const s = 1; // getS();
  const html = `
    <html>
      <head>
        <title>/iframe</title>
      </head>
      <body>
        <iframe src="http://localhost:${port}${routes.iframe}" />
      </body>
    </html>
  `;

  const m = `${s}; url=data:text/html,${encodeURIComponent(html)}`;

  res.set('refresh', m);
  res.send(html);
});

app.get('/', (res, req) => {
  req.send(`
    <html>
      <head>
        <title>/</title>
      </head>
      <body>
        Some refreshing eases here:
        <ul>
          ${Object.values(routes).map(r => `<li><a href="${r}">${r}</a></li>`).join('')}
        </ul>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`listening on port ${port}.`);
});

