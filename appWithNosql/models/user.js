const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    // console.log(this);
    let cartProductIndex, updatedCartItems;
    let newQuantity = 1;
    if (this.cart.items) {
      updatedCartItems = [...this.cart.items];
      cartProductIndex = this.cart.items.findIndex(
        cp => cp.productId.toString() === product._id.toString()
      );
    } else {
      updatedCartItems = [];
    }

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    // let newQuantity = 1;
    // const updatedCartItems = [];
    // const updatedCartItems = [...this.cart.items];

    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map(item => item.productId);
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then(products => {
        return products.map(prod => {
          return {
            ...prod,
            quantity: this.cart.items.find(item => {
              return item.productId.toString() === prod._id.toString();
            }).quantity,
          };
        });
      });
    /*the method below works, but let follow the tutor */
    // return db
    //   .collection("users")
    //   .find()
    //   .toArray()
    //   .then(result => result)
    //   .catch(err => console.log(err));
  }

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then(products => {
        const order = {
          items: products,
          user: {
            _id: new ObjectId(this._id),
            name: this.name,
          },
        };
        return db.collection("orders").insertOne(order);
      })
      .then(result => {
        // clearing the user object instance
        this.cart = { items: [] };
        // clearing the user cart from db
        return db.collection("users").updateOne(
          { _id: new ObjectId(this._id) },
          {
            $set: { cart: { items: [] } },
          }
        );
      });
  }

  getOrders() {
    const db = getDb();
    return db
      .collection("orders")
      .find({ "user._id": new ObjectId(this._id) })
      .toArray()
      .then(prod => {
        return prod;
      })
      .catch(err => console.log(err));
  }

  deleteItemFromCart(productId) {
    const updatedCart = this.cart.items.filter(item => {
      return item.productId.toString() !== productId.toString();
    });

    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCart } } }
      );
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => console.log(err));
  }
}

module.exports = User;
