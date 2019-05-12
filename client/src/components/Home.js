import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import actions from './../store/actions';
import ProductLists from './ProductLists';
import Search from './Search';
import Category from './Category';
// import RLoader from './RLoader';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    this.props.dispatch(actions.getProducts(success => {
      if (success) {
        this.setState({
          loading: true
        })
      }
    }).bind(this));
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


const loadData = (store) => {
  console.log(this, 'checking this');
  console.log('loadData called', this)
  return store.dispatch(actions.getProducts(() => {}).bind(this));
}

export default {
  component: connect(null)(Home),
  loadData: loadData
};