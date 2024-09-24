const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};


exports.postAddProduct = async(req, res, next) => {
  try{
    const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  await req.user.createProduct
   ({

    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  });
 res.redirect('/');
  }
    catch(err){
      console.error(err);
      res.status(500).send('Internal Server Error'); // Handle error appropriately
    }
};


exports.getEditProduct = async(req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
 const product = await  Product.findByPk(prodId);

 if (!product) {
  return res.redirect('/');
}
res.render('admin/edit-product', {
  pageTitle: 'Edit Product',
  path: '/admin/edit-product',
  editing: editMode,
  product: product
});
};



exports.postEditProduct = async(req, res, next) => {
try{
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
 const product =await  Product.findByPk(prodId);
  product.title = updatedTitle;
  product.price = updatedPrice;
  product.imageUrl = updatedImageUrl;
  product.description = updatedDesc;
  product.save();
  res.redirect('/admin/products');
}catch(err){
  console.error(err);
  res.status(500).send('Internal Server Error');
}
};



exports.getProducts = async(req, res, next) => {
try{
  const products = await  Product.findAll();
  res.render('admin/products', {
    prods: products,
    pageTitle: 'Admin Products',
    path: '/admin/products'
  });
}catch(err){
  console.error(err);
  res.status(500).send('Internal Server Error');
}
};

exports.postDeleteProduct = async(req, res, next) => {
  const prodId = req.body.productId;
  await Product.destroy({where: {id: prodId}});
  res.redirect('/admin/products');
};
