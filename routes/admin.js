const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const isAuth = require('../middleware/is_auth');

const router = express.Router();

router.get('/products',isAuth, adminController.getProducts);


// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET

// /admin/add-product => POST

router.get('/edit-product',isAuth, adminController.getEditProduct);

router.post('/add-product',isAuth, adminController.postAddProduct);

router.post('/edit-product/:productId',isAuth, adminController.postEditProduct);


router.post('/delete-product',isAuth,adminController.postDeleteProduct);

module.exports = router;
