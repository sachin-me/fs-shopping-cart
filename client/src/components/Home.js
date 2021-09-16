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
      loading: true
    }
  }

  componentDidMount() {
    this.props.dispatch(actions.getProducts(success => {
      if (success) {
        this.setState({
          loading: false
        })
      } else {
        this.setState({
          loading: false
        })
      }
    }).bind(this));
  }
  
  render() {
    const { loading } = this.state;
    return (
      <div className="main-wrapper">
        {
          !loading ? (
            <>
              <div className="search-bar">
                <Search />
                <Category />
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

export default connect(null)(Home)