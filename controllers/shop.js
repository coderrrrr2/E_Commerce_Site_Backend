const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = async(req, res, next) => {
let data =  await  Product.fetchAll();
console.log("my first log",data);
    
};

exports.getProduct = async(req, res, next) => {
  try{
    const prodId = req.params.productId;
  const result =  await Product.findById(prodId);
  const rows = result.rows;
  console.log("get product rows", rows);
  res.render('shop/product-detail', {
    product: rows[0],
    pageTitle: rows[0].pageTitle,
    path: '/products'
  });
  }
  catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error'); // Handle error appropriately
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const result = await Product.fetchAll(); 
    const rows = result.rows; 

    
    res.render('shop/index', {
      prods: rows, 
      pageTitle: 'Shop',
      path: '/'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error'); // Handle error appropriately
  }
};


exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

exports.postCart =  async(req, res, next) => {
try{
  const prodId = req.body.productId;
 const  product = await  Product.findById(prodId);
 Cart.addProduct(prodId, product.price);
  res.redirect('/cart');
}catch(err){
  console.error(err);
  res.status(500).send('Internal Server Error'); // Handle error appropriately
}
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
