import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import actions from './../store/actions';
import ProductLists from './ProductLists';
import Search from './Search';
import Category from './Category';
// import RLoader from './RLoader';

class Home extends Component {
  state = {
    loading: false
  }
  componentDidMount() {
    this.props.dispatch(actions.getProducts(success => {
      if (success) {
        this.setState({
          loading: true
        })
      }
    }));
  }
  
  render() {
    const { loading } = this.state;
    return (
      <div className="main-wrapper">
        {
          loading ? (
            <>
              <div className="search-bar">
                <Search />
                <Category />
                <Link to="/addnewitem" className="add-item">
                  <p>Add new item</p>
                </Link>
              </div>
              <div>
                <ProductLists />
              </div>
            </>
          ) : 'loading...'
        }
      </div>
    );
  }
}

function loadData(store) {
  return store.dispatch(actions.getProducts(success => {
    if (success) {
      this.setState({
        loading: true
      })
    }
  }));
}

export default {
  component: connect(null)(Home),
  loadData
};