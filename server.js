const express = require('express')
const path = require('path')
const app = express()

app.set('views', path.resolve(__dirname, 'dist'))
app.use(express.static(path.resolve(__dirname, 'dist'))) // 加载静态资源

app.engine('.html', require('ejs').__express)
app.set('view engine', 'html')

app.use(function (req, res, next) {
  if (req.path !== '/') {
    res.render('index.html')
  } else next()
})

app.get('/', (req, res) => {
  res.render('index.html')
})

// app.get('*', (req,res) => {
//   res.status(404).send({error:'error'})
// })

app.listen(9091, () => console.log('listen-1 成功！'))

// const http = require("http");
// const esbuild = require("esbuild");

// const serve = async (servedir, listen) => {
//   // Start esbuild's local web server. Random port will be chosen by esbuild.
//   const { host, port } = await esbuild.serve({ servedir }, {});

//   // Create a second (proxy) server that will forward requests to esbuild.
//   const proxy = http.createServer((req, res) => {
//     // forwardRequest forwards an http request through to esbuid.
//     const forwardRequest = (path) => {
//       const options = {
//         hostname: host,
//         port,
//         path,
//         method: req.method,
//         headers: req.headers,
//       };
//       console.log(options)
//       const proxyReq = http.request(options, (proxyRes) => {
//         if (proxyRes.statusCode === 404) {
//           // If esbuild 404s the request, assume it's a route needing to
//           // be handled by the JS bundle, so forward a second attempt to `/`.
//           return forwardRequest("/");
//         }

//         // Otherwise esbuild handled it like a champ, so proxy the response back.
//         res.writeHead(proxyRes.statusCode, proxyRes.headers);
//         proxyRes.pipe(res, { end: true });
//       });

//       req.pipe(proxyReq, { end: true });
//     };

//     // When we're called pass the request right through to esbuild.
//     forwardRequest(req.url);
//   });

//   // Start our proxy server at the specified `listen` port.
//   proxy.listen(listen);
// };

// // Serves all content from ./dist on :1234.
// // If esbuild 404s the request, the request is attempted again
// // from `/` assuming that it's an SPA route needing to be handled by the root bundle.
// serve("dist", 9091).then(()=>console.log('listen 成功'));
