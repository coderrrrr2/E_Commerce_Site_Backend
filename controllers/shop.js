const { where } = require('sequelize');
const Product = require('../models/product');

exports.getProducts = async (req, res, next) => {
  try {
    let data = await Product.findAll();

    res.render('shop/product-list', {
      prods: data,
      pageTitle: 'All Products',
      path: '/products'
      ,
      isAuthenticated: req.session.isLoggedIn
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error'); // Handle error appropriately
  }


};

exports.getProduct = async (req, res, next) => {

  try {
    const prodId = req.params.productId;
    const result = await Product.findByPk(prodId);

    res.render('shop/product-detail', {
      product: result,
      pageTitle: result.pageTitle,
      path: '/products',
      isAuthenticated: req.session.isLoggedIn

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
      ,
      isAuthenticated: req.session.isLoggedIn
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
        ,
        isAuthenticated: req.session.isLoggedIn
      });

    })
    .catch(err => {
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

// exports.getCart = (req, res, next) => {
//   const userId = req.user.id;

//   User.findByPk(userId)
//     .then(user => {
//       return user.getCart();
//     })
//     .then(cart => {
//       return cart.getProducts();
//     })
//     .then(products => {
//       res.render('shop/cart', {
//         path: '/cart',
//         pageTitle: 'Your Cart',
//         products: products,
//       });
//     })
//     .catch(err => console.error(err));
// };


exports.postCart = (req, res, next) => {
  try {
    const prodId = req.body.productId;
    var fetchedCart;
    let newQuantity = 1;


    req.user.getCart().then(cart => {
      fetchedCart = cart;

      return cart.getProducts({ where: { id: prodId } });
    }).then(products => {
      var product;

      if (products.length > 0) {
        product = products[0];
      }


      if (product) {

        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;

      }
      return Product.findByPk(prodId);
    }).then(product => {
      return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });

    }).then(() => {
      res.redirect('/cart');
    }
    );

  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error'); // Handle error appropriately
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    req.user.getCart().then(cart => {
      return cart.getProducts({ where: { id: prodId } });
    }).then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    }).then(result => {
      res.redirect('/cart');
    });


  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error'); // Handle error appropriately
  }
};



exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
    ,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.getOrders = (req, res, next) => {
  try {
    req.user.getOrders({ include: ['products'] }).then(orders => {
      return res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
        ,
        isAuthenticated: req.session.isLoggedIn


      });
    });

  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error'); // Handle error appropriately
  }
};

exports.postOrder = (req, res, next) => {
  console.log("entered this controller");
  try {
    let fetchedCart;
    const prodId = req.body.productId;

    req.user.getCart(


    ).then((cart) => {
      fetchedCart = cart;
      console.log(cart.getProducts(), "cart products");
      return cart.getProducts();
    }).
      then(products => {
        console.log("products array", products);
        return req.user.createOrder().then(order => {
          return order.addProducts(products.map(product => {
            product.orderItem = { quantity: product.cartItem.quantity };
            return product;
          }));
        });


      }).then(result => {
        fetchedCart.setProducts(null);
      }).
      then(result => {
        console.log('Order Created and redirected');
        res.redirect('/orders');
      });

  }
  catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error'); // Handle error appropriately
  }
}
