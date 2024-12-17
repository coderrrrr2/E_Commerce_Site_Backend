const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/products', adminController.getProducts);


// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET

// /admin/add-product => POST

router.get('/edit-product', adminController.getEditProduct);

router.post('/add-product', adminController.postAddProduct);

router.post('/edit-product/:productId', adminController.postEditProduct);


router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
