const express = require('express');
const app = express();
const port = 3000;

// https://en.wikipedia.org/wiki/Meta_refresh

const routes = {
  reload: '/reload',
  iframe: '/iframe',
  meta: '/meta',
  refresh: '/refresh',
  unmeta: '/unmeta',
  stream: '/stream',
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

app.get(routes.iframe, (req, res) => {
  console.log(routes.iframe);
  const s = getS();

  res.send(`
    <html>
      <head>
        <title>/${routes.iframe}</title>
      </head>
      <body>
        Waiting for ${s}.
        <iframe style="display:none;" srcdoc="<script>setTimeout(() => {window.top.location.reload()}, ${s * 1000})</script>" />
      </body>
    </html>
  `);
});

app.get(routes.stream, (req, res) => {
  console.log(routes.stream);
  const s = getS();

  res.write(`
    <html>
      <head>
        <title>${routes.stream}</title>
      </head>
      <body>
        Waiting for ${s}.
  `);

  var x = " ";
  for (var i = 0; i < 1000; i++) {
    x += " ";
  }

  setTimeout(() => {
    res.write(`${x}<script>window.location.reload()</script>`);
    res.end();
  }, s * 1000);
});

app.get('/', (res, req) => {
  req.send(`
    <html>
      <head>
        <title>/</title>
      </head>
      <body>
        Some refreshing cases here:
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

