//#######################FILES
// read & write sync blocking
// const fs = require("fs");
// const text = fs.readFileSync("./starter/txt/input.txt", "utf-8");
// console.log(text);
// const textOut = `This is the new text \n ${text} ${Date()}`;
// fs.writeFileSync("./starter/txt/output.txt", textOut);
// console.log("The file is written");
//#################################################################
// read & write Async
// read & write async non-blocking
// const fs = require("fs");
// fs.readFile("./starter/txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("🙀");
//   console.log(data1);
//      i made an error here i forgot to write the file extention 😒
//   fs.readFile(`./starter/txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./starter/txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile(
//         "./starter/txt/final.txt",
//         `${data2}\n ${data3}`,
//         "utf-8",
//         (err) => {
//           console.log("The file has been written");
//         }
//       );
//     });
//   });
// });
// if we want to get the full year we must pass a date to date constructor
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
// now we want to write this data in the data.json file
// i commented this line bcz this line will make nodemon work without stop even if there is no changes happend && that bcz of the write function
// ###############
// 1. File Changes Triggering Infinite Restarts
// File Watch Loops: If you're using fs.writeFileSync or fs.writeFile within your code, nodemon might be watching these files for changes, which can trigger an infinite restart loop. This is because nodemon detects changes in files and restarts the server every time those files are updated.
// Solution: You can exclude specific directories (like the starter/txt/ folder) from being watched by nodemon.
// ###############
// fs.writeFileSync(
//   "./starter/dev-data/data.json",
//   JSON.stringify(dataObjWithSlugs)
// );
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
