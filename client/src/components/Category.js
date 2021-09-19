import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "./../store/actions";

class Category extends Component {
  state = {
    value: "",
  };
  componentDidMount() {
    this.props.dispatch(actions.getCategoryList());
  }

  handleChange = (e) => {
    let key = e.target.value;
    key = key === "select" ? "all" : key;
    this.setState({
      value: key
    });
    this.props.dispatch(actions.getSelectedItem(key));
  };

  render() {
    const { categories } = this.props;
    return (
      <div className="category-wrapper">
        <select value={this.state.value} onChange={this.handleChange}>
          <option>select</option>
          {categories.length === 0 || categories === "undefined"
            ? "Loading..."
            : categories.map((categoryItem, i) => {
                return (
                  <option key={categoryItem._id} value={categoryItem._id}>
                    {categoryItem.name}
                  </option>
                );
              })}
        </select>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(Category);
