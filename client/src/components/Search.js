import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from './../store/actions';

class Search extends Component {
  state = {
    search: ''
  }
  handleChange = (e) => {
    const eVal = e.target.value;
    const { search } = this.state;
    this.setState({
      search: eVal
    })
  }

  submitSearch = (e) => {
    if (e.key === 'Enter') {
       this.props.dispatch(actions.searchItem(this.state.search))
    }
  }

  render() {
    const { search } = this.state;
    return (
      <div className="search-wrapper">
        <input type="search" value={search} name="search" placeholder="search product here" onChange={this.handleChange} onKeyPress={this.submitSearch}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps)(Search);