# 🌱 Node Farm

## 📌 Overview

This project is a simple Node.js web server that serves an overview page, product pages, and an API endpoint using the built-in `http` module. It reads data from a JSON file and dynamically generates HTML pages using templates.

## 🚀 Features

- Serves an **overview page** with dynamically generated product cards.
- Provides **individual product pages** based on query parameters.
- Exposes an **API endpoint** to retrieve product data in JSON format.
- Implements **URL slugs** for better user-friendly product URLs.
- Uses **template replacement** for dynamic HTML generation.

## 📂 Project Structure

```
project-folder/
│── starter/
│   ├── dev-data/
│   │   ├── data.json
│   ├── templates/
│   │   ├── template-overview.html
│   │   ├── template-product.html
│   │   ├── template-card.html
│── modules/
│   ├── replaceTemplate.js
│── index.js
│── test.js
```

## 🛠 Installation & Setup

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Steps

1. Clone the repository or download the project files.
2. Install dependencies using:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   node index.js
   ```
4. Open your browser and navigate to:
   - **Overview Page:** `http://127.0.0.1:8000/`
   - **Product Page:** `http://127.0.0.1:8000/product?id=0` (change `id` as needed)
   - **API Endpoint:** `http://127.0.0.1:8000/api`

## 🛠 Technologies Used

- **Node.js** (core modules: `http`, `fs`, `url`)
- **Slugify** (third-party module for generating URL-friendly slugs)
- **Custom Template Engine** (for replacing placeholders in HTML templates)

## ✨ Code Highlights

### Server Setup

The server listens on port `8000` and handles three routes:

- **Overview (****`/`**** or ****`/overview`****)**: Displays product cards.
- **Product (****`/product?id=X`****)**: Displays product details.
- **API (****`/api`****)**: Returns JSON data.

### Template Replacement

A helper function `replaceTemplate()` replaces placeholders in the HTML templates with actual product data.

```js
const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%PRICE%}/g, product.price);
  return output;
};
```

## 📸 Demo Preview
![home_page](https://github.com/user-attachments/assets/3321e15e-d14c-4ca9-876c-35f857687b77)
![detail_page](https://github.com/user-attachments/assets/ccd532f7-ec2d-458d-b5d5-794f286bd5b4)

## 👩‍💻 Author

**Haneen Elbendary** - Software Engineer, Node.js Developer

## © Copyright

© 2025 Haneen Elbendary. All rights reserved.

