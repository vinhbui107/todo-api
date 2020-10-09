import React, { Component } from "react";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.setState = {
      searchKey: "",
      searchResult: []
    };
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="search"
            value={this.props.searchKey}
            onChange={(event)=>this.props.handleSearch(event.target.value)}
            placeholder="Search Todo"
            autoComplete="off"
          />
        </div>
      </form>
    );
  }
}

export default SearchForm;
