import React, { Component } from 'react'

export default class Product extends Component {
  render() {
    const { product } = this.props;
    const { data } = product.image;
    const iData = new Buffer(data);
    const cvrtData = iData.toString();
    return (
      <>
        {
          (Object.keys(product).length) ? (
            <div className="product-card">
              <img src={cvrtData} />
              <p className="product-name">Name: {product.name}</p>
              <p className="product-des">Description: {product.description}</p>
              <p className="product-price">Price: {product.price}</p>
              <p className="product-qty">Quantity: {product.quantity}</p>
              <div className="button-wrapper">
                <button>Add To Cart</button>
              </div>
            </div>
          ) : 'Loading...'
        }
      </>
    )
  }
}
