//#################################################################
//#######################SERVER
// first get the module
// the core modules
const fs = require('fs');
const http = require('http');
const url = require('url');
// 3th party modules
const slugify = require('slugify');
// my module
const replaceTemplate = require('./modules/replaceTemplate');
// second create the server
// read the file sync first
// __dirname : where the current file is located
const data = fs.readFileSync(
  `${__dirname}/starter/dev-data/data.json`,
  'utf-8'
);
const dataObj = JSON.parse(data);
// read the templates first -> will loaded once
const tempOverview = fs.readFileSync(
  `${__dirname}/starter/templates/template-overview.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/starter/templates/template-product.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/starter/templates/template-card.html`,
  'utf-8'
);
// function to replace the place holders in the template html with the data in the js obj
// try slagify now
// console.log(slugify("FRESH AVOCADO", { lower: true }));
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
// console.log(slugs);
const dataObjWithSlugs = dataObj.map((el, i) => {
  el.slug = slugs[i];
  return el;
});
const server = http.createServer((req, res) => {
  // use the url module
  const { query, pathname } = url.parse(req.url, true);
  // create Routes
  // overview
  if (pathname === '/' || pathname === '/overview') {
    // logic of replace templates
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const product = dataObj[query.id];
    const productHtml = replaceTemplate(tempProduct, product);
    res.end(productHtml);
    // api
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'My-own-header': 'HANN00N',
    });
    res.end('<h1>ERROR NOT FOUND!🙀</h1>');
  }
});
// third start the server
server.listen(8000, '127.0.0.1', () => {
  console.log('Server is running on port 8000');
});
