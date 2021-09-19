const Category = require("../models/Category");
const Product = require("../models/Product");

module.exports = {
  // getting category list from db
  getCategory: (req, res) => {
    Category.find({}, (err, cLists) => {
      const uniqueArray = uniqArr(cLists);
      if (err) {
        console.log(err);
        return res.json({
          error: "Unable to fetch category list",
        });
      } else {
        return res.json({
          message: "Getting categories",
          cLists,
        });
      }
    });
  },

  // getting selected product a/c to category
  getSelectedItem: (req, res) => {
    const cId = req.params.id;
    const query = cId === "all" ? {} : { category: cId };
    Product.find(query, (err, products) => {
      if (err) {
        console.log(err);
        return res.json({
          error: "Unable to fetch selected item",
        });
      } else {
        return res.json({
          message: "Getting selected item",
          products,
        });
      }
    });
  },

  // Searching products by name or category from db
  searchProductByNameOrCat: (req, res) => {
    const { search } = req.body;
    Category.find({ name: search }, (err, categories) => {
      console.log(categories, err);
      if (categories.length) {
        Product.find(
          {
            $or: [
              { name: search },
              {
                category: categories[0]._id,
              },
            ],
          },
          (err, response) => {
            if (err) {
              console.log(err);
              return res.json({
                error: "No matches found!",
              });
            } else {
              return res.json({
                message: "Product found",
                response,
              });
            }
          }
        );
      } else {
        Product.find({ name: search }, (err, products) => {
          if (err) {
            console.log(err);
            return res.json({
              error: "No matches found!",
            });
          } else {
            return res.json({
              message: "Product found",
              products,
            });
          }
        });
      }
    });
  },
};

// function searchAll(keyword) {
//   var all = db.getCollectionNames();
//   var results = [];
//   all.forEach(function (collectionName) {
//       print(collectionName);
//       if (db[collectionName]) results.push(findany(db[collectionName], keyword));
//   });
//   console.log(results, 'getting results');
//   return results;
// }

function uniqArr(arr) {
  return arr.filter((val, i, a) => a.indexOf(val) === i);
}
