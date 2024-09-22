

const db = require('../util/database');

const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.query(
      `INSERT INTO products (title, price, imageurl, description) VALUES ($1, $2, $3, $4)`,
      [this.title, this.price, this.imageUrl, this.description]
      
    );
  }

  static deleteById(id) {
    return db.query(`DELETE FROM products WHERE id = $1`, [id]);
  }

  static fetchAll() {
  
    return db.query('SELECT * FROM products');
  }

  static findById(id) {

    return db.query(`SELECT * FROM products WHERE products.id = $1`,[id]);
  }
};
