const fs = require('fs');
const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports = {
  // adding new items in db
  addProduct: (req, res) => {
    const { image, price, name, description, quantity, category } = req.body;
    let iType = image.split(':')[1].split(';')[0];
    Category.find({ name: name }, (err, data) => {
      if (err) {
        return res.json({
          error: 'Could not fetch category'
        })
      }
      else {
          const newCategory = new Category({
            name: category
          })
          newCategory.save((err, pCategory) => {
            const newProduct = new Product({
              image: {
                data: image,
                imageType: iType
              },
              price,
              name, 
              description, 
              quantity, 
              category:  pCategory._id
            })
            newProduct.save((err, products) => {
            if (err) {
              return res.json({
                error: 'Something went wrong!'
              }
            )}  
            return res.json({
              message: 'Successfully new item added :)'
            })
          });
        })
      }
    })
    // const newProduct = new Product({
    //     image: {
    //       data: image,
    //       imageType: iType
    //     },
    //     price,
    //     name, 
    //     description, 
    //     quantity, 
    //     category: {
    //       name: category
    //     }
    //   })
    //   newProduct.save((err, products) => {
    //   if (err) {
    //     return res.json({
    //       error: 'Could not save products'
    //     }
    //   )}  
    //   return res.json({
    //     message: 'Product saved successfully'
    //   })
    // });
  },

  // getting items from db
  getProduct: (req, res) => {
    Product.find({}, (err, products) => {
      if (err) {
        console.log(err);
        // return res.json({
        //   error: 'Could not get data from db'
        // })
      } 
      // else {
      //   console.log(products, 'getting products');
      //   return res.json({
      //     'message': 'category populated, successfully',
      //     products
      //   })
      // }
    })
    .populate('category')
    .exec((err, products) => {
      if (err) {
        console.log(err);
        return res.json({
          'error': 'Could not populate category'
        })
      } else {
        return res.json({
          'message': 'category populated, successfully',
          products
        })
      }
    })
  },

  // getting category list 
  getCategoryList: (req, res) => {
    Product.find({}, (err, items) => {
      if (err) {
        console.log(err);
        return res.json({
          'error': 'No category item found'
        })
      } else {
        return res.json({
          'message': 'Getting category list',
          items
        })
      }
    })
  },

  // Searching products by name or category from db
  searchProductByNameOrCat: (req, res) => {
    const { search } = req.body;
    Product.find({ $or: [ { name: search }, { category: { name: search } } ] }, (err, products) => {
      if (err) {
        console.log(err);
        return res.json({
          'error': 'No items found'
        })
      } else {
        return res.json({
          'message': 'getting items from db',
          products
        })
      }
    })
  },

  // adding cart items
  addToCart: (req, res) => {
    const { id } = req.params;
    console.log(id, 'checking product id');
    Product.find({ _id: id }, (err, products) => {
      if (err) {
        console.log(err);
        return res.json({
          'error': 'No Item found'
        })
      } else {
        console.log(products, 'adding items to cart');
        return res.json({
          'message': 'added to cart',
          products
        })
      }
    })
  }
}
