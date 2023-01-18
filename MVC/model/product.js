const path = require("path");
const fs = require("fs");

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  /*method for adding new product */
  save() {
    // products.push({title:this.title});
    const pathToData = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );

    fs.readFile(pathToData, (err, fileContent) => {
      // create new products
      let products = [];
      // check if the product exist and read the file
      if (!err) {
        products = JSON.parse(fileContent);
      }
      // if the product doesn't exist, then create new one.
      products.push(this);
      // save it back into the file.
      fs.writeFile(pathToData, JSON.stringify(products), err => {
        console.log(err);
      });
      // the fileContent is gonna be returned as buffer
      console.log(fileContent);
    });
  }
  /*the static word makes the fetchAll method 
  accessible from the constructor and not from
  instance */
  static fetchAll(callback) {
    const pathToData = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );
    fs.readFile(pathToData, (err, fileContent) => {
      if (err) {
        return callback([]);
      }
      callback(JSON.parse(fileContent));
    });
    // return products;
  }
};
