const URL = '/api'

const actions = {

  // Getting Item List according to categories
  getSelectedItem: (cId) => dispatch => {
    fetch(`${URL}/categoryitem/${cId}`)
    .then(res => res.json())
    .then(selectedItem => {
      dispatch({
        type: 'GET_SELECTED_ITEM',
        selectedItem
      })
    }).catch(error => console.log(error))
  },

  // Getting Items according to search value
  searchItem: (val) => dispatch => {
    fetch(`${URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'search': val})
    })
    .then(res => res.json())
    .then(searchedItem => {
      dispatch({
        type: 'GET_SEARCHED_ITEM',
        searchedItem
      })
    }).catch(error => console.log(error))
  },
  
  // Add new Items 
  addNewItem: (data, cb) => dispatch => {
    fetch(`${URL}/create-item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(products => {
      if (products.error) {
        dispatch({
          type: 'ADD_ITEM_ERROR',
          error: products.error
        })
        cb(false);
      } else {
        dispatch({
          type: 'ADD_ITEM_SUCCESS',
          message: products.message
        })
        cb(true);
      }
    }).catch(error => console.log(error))
  },

  // Get products from db
  getProducts: (cb) => dispatch => {
    fetch(`${URL}/products`)
    .then(res => res.json())
    .then(products => {
      if (products.error) {
        cb(false);
      } else {  
        dispatch({
          type: 'GET_PRODUCTS_LIST',
          products
        })
        cb(true);
      }
    }).catch(error => console.log(error))
  },

  getCategoryList: () => dispatch => {
    fetch(`${URL}/categorylist`)
    .then(res => res.json())
    .then(cLists => {
      if (cLists.message) {  
        dispatch({
          type: 'GET_CATEGORY_LIST',
          cLists
        })
      }
    }).catch(error => console.log(error))
  },

  // adding items to cart
  addToCart: (productId) => dispatch => {
    console.log(productId, 'checking product id');
    fetch(`${URL}/addtocart/${productId}`)
    .then(res => res.json())
    .then(products => {
      if (products.message) {
        dispatch({
          type: 'ADD_TO_CART',
          products
        })
      }
    }).catch(error => console.log(error))
  }
} 

export default actions;