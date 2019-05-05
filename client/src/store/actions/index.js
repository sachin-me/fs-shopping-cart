import axios from 'axios';
const URL = 'http://localhost:8000/api'

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
    })
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
    })
  },
  
  // Add new Items 
  addNewItem: (data, cb) => dispatch => {
    fetch(`${URL}/addnewitem`, {
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
    })
  },

  // Get products from db
  getProducts: (cb) => dispatch => {
    fetch(`${URL}`)
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
    })
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
    })
  }
} 

export default actions;