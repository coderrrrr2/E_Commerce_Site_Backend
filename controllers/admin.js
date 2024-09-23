const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  try{
    const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
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

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
 const product =  Product.findByPk(prodId);

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

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {

try{
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

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.drop(prodId);
  res.redirect('/admin/products');
};
