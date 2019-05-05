import React, { Component } from 'react'
import { connect } from 'react-redux';
import Product from './Product'

class ProductLists extends Component {
  render() {
    const { products } = this.props;
    return (
      <div className="product-lists">
        {
          (products.length !== 0) ? products.map((productInfo) => {
            return (
              <Product product={productInfo} key={productInfo._id} />
            )
          }
          ) : 'No Products found :)'
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(ProductLists)
