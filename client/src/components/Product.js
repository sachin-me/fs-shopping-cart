import React, { Component } from "react";
import { connect } from "react-redux";
import { Buffer } from "buffer";
import actions from "../store/actions";

class Product extends Component {
  handleAddToCart = (productId) => {
    this.props.dispatch(actions.addToCart(productId));
  };

  render() {
    const { product } = this.props;
    const { data } = product.image;
    const iData = Buffer.from(data);
    const cvrtData = iData.toString();
    return (
      <>
        {Object.keys(product).length ? (
          <div className="product-card">
            <img src={cvrtData} />
            <p className="product-name">Name: {product.name}</p>
            <p className="product-des">Description: {product.description}</p>
            <p className="product-price">Price: {product.price}</p>
            <p className="product-qty">Quantity: {product.quantity}</p>
            <div className="button-wrapper">
              <button onClick={() => this.handleAddToCart(product._id)}>
                Add To Cart
              </button>
            </div>
          </div>
        ) : (
          "Loading..."
        )}
      </>
    );
  }
}

export default connect(null)(Product);
