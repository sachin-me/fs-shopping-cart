import React, { Component } from 'react';
import { connect } from "react-redux";
import actions from './../store/actions';

class NewItem extends Component {
  state = {
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    image: '',
    message: ''
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value.toLowerCase()
    })
  }

  handleImage = (e) => {
    const { value, files } = e.target;
    const fileVal = files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.setState({
        image: reader.result
      })
    });
    reader.readAsDataURL(fileVal);
  }

  handleSubmit = (e) => {
    const { name, description, price, quantity, category, image } = this.state;
    const data = { name, description, price, quantity, category, image };
    e.preventDefault();
    this.props.dispatch(actions.addNewItem(data, (success => {
      const { message } = this.props;
      if (success) {
        this.setState({
          message: message
        })
        this.props.history.push('/');
      } else {
        this.setState({
          message: message
        })
      }
    })));
  }

  render() {
    const { message } = this.state;
    return (
      <div className="form-wrapper">
        <h2>Add Product</h2>
        <form onSubmit={this.handleSubmit} className="form">
          <input type="text" name="name" placeholder="product name" onChange={this.handleChange} />
          <input type="text" name="description" placeholder="product description" onChange={this.handleChange} />
          <input type="text" name="price" placeholder="product price" onChange={this.handleChange} />
          <input type="text" name="quantity" placeholder="product quantity" onChange={this.handleChange} />
          <input type="text" name="category" placeholder="product category" onChange={this.handleChange} />
          <input type="file" name="image" placeholder="product image url" onChange={this.handleImage} />
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
        <div className="message-info">
          <p>{message}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    message: state.message
  }
}

export default connect(mapStateToProps)(NewItem);