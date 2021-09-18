const express = require('express');
const router = express.Router()
const product = require('../controller/product.controller');
const category = require('../controller/category.controller');

router.post('/create-item', product.addProduct);

router.get('/products', product.getProduct);

router.get('/categorylist', category.getCategory);

// router.get('/categorylist', product.getCategoryList);


router.get('/categoryitem/:id', category.getSelectedItem);

// router.post('/search', product.searchProductByNameOrCat);

router.post('/search', category.searchProductByNameOrCat);

router.get('/addtocart/:id', product.addToCart)

module.exports =router;