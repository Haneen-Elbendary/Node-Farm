const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = template.replace(/{%IMAGE%}/g, product.image);
  output = template.replace(/{%FROM%}/g, product.from);
  output = template.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = template.replace(/{%QUANTITY%}/g, product.quantity);
  output = template.replace(/{%PRICE%}/g, product.price);
  output = template.replace(/{%DESCRIPTION%}/g, product.description);
  output = template.replace(/{%ID%}/g, product.id);
  if (!product.organic)
    output = template.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};
  