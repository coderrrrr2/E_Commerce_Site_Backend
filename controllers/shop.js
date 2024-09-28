const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = async(req, res, next) => {
try{
  let data =  await  Product.findAll();

res.render('shop/product-list', {
  prods: data,
  pageTitle: 'All Products',
  path: '/products'
});
}catch(err){
  console.error(err);
  res.status(500).send('Internal Server Error'); // Handle error appropriately
}

    
};

exports.getProduct = async(req, res, next) => {

  try{
    const prodId = req.params.productId;
  const result =  await Product.findByPk(prodId);

  res.render('shop/product-detail', {
    product: result,
    pageTitle: result.pageTitle,
    path: '/products'
  });
  }
  catch (err) {
    console.error(err);
    res.status(500).send(err.toString()); // Handle error appropriately
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const result = await Product.findAll(); 
    res.render('shop/index', {
      prods: result, 
      pageTitle: 'Shop',
      path: '/'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error'); // Handle error appropriately
  }
};


exports.getCart = (req, res, next) => {
   req.user.getCart()
.then(cart => {
return cart.getProducts();
}).then(cartProducts => {
  res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: cartProducts
        });
  })
.catch(err=>{
  console.error(err);
}); 
 // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(
  //         prod => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts
  //     });
  //   });
  // });
};

exports.postCart =  (req, res, next) => {
try{
  const prodId = req.body.productId;
  var fetchedCart ;
  let newQuantity = 1;

req.user.getCart().then(cart => {
  fetchedCart = cart;
   
 return cart.getProducts({where: {id: prodId}});
}).then(products => {
let product;
newQuantity = 1;

if(products.length > 0){
  product = products[0];
}
if(product){
  ///
}
return Product.findByPk(prodId);
}).then(product => {
 
  fetchedCart.addProduct(product, {through: {quantity: newQuantity}});
  res.redirect('/cart');

});
}catch(err){
  console.error(err);
  res.status(500).send('Internal Server Error'); // Handle error appropriately
}
};

exports.postCartDeleteProduct = async(req, res, next) => {
try{
  const prodId = req.body.productId;

  res.redirect('/cart');
}catch(err){
  console.error(err);
  res.status(500).send('Internal Server Error'); // Handle error appropriately
}
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
