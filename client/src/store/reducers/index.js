import actions from './../actions';

const initState = {
  products: [],
  // categories: ["Relevance", "Top Sellers", "Price Low to High", "Price High to Low", "Product Name A-Z", "Product Name Z-A", "Most Reviewed", "Highest Rated", "Most Viewed", "Newest Arrival"] ,
  categories: [],
  message: ''
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
      const { response } = action.searchedItem;
      return {
        ...state,
        products: response
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
    
    default: return state;
  }
}

export default rootReducer;