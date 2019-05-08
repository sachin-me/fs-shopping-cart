// import actions from './../actions';

const initState = {
  products: [],
  categories: [],
  message: '',
  carts: []
}

function rootReducer(state = initState, action) {
  switch(action.type) {

    case "GET_PRODUCTS_LIST" : {
      return {
        ...state,
        products : action.products.products
      }
    }

    case 'GET_CATEGORY_LIST' : {
      const { cLists } = action.cLists;
      return {
        ...state,
        categories: cLists
      }
    }

    case 'GET_SELECTED_ITEM' : {
      return {
        ...state,
        products: action.selectedItem.products
      }
    }

    case 'GET_SEARCHED_ITEM' : {
      const { response, products } = action.searchedItem;
      return {
        ...state,
        products: products || response
      }
    }

    case 'ADD_ITEM_ERROR' : {
      return {
        ...state,
        message: action.error
      }
    }

    case 'ADD_ITEM_SUCCESS' : {
      return {
        ...state,
        message: action.message
      }
    }

    case 'ADD_TO_CART' : {
      const { products } = action.products;
      console.log(products, 'getting added items');
      return {
        ...state,
        carts: products
      }
    }
    
    default: return state;
  }
}

export default rootReducer
// module.exports = rootReducer;