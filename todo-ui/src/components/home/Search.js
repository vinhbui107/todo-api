import { divide } from "lodash";
import React, { Component } from "react";

class Search extends React.Component {
  state = { term: "" };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.term === "") return;
    this.props.onFormSubmit(this.state.term);
    this.setState({ term: "" });
  };
  render() {
    return (
      <form>
        <div className="form-group">
          <input type="text" className="form-control" id="search" placeholder="Search Todo" />
          <button type="submit" className="btn btn-dark">
            Search
          </button>
        </div>
      </form>
    );
  }
}

export default Search;
