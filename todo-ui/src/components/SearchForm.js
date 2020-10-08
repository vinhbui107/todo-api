import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <form>
        <div className="form-group">
          <input type="text" className="form-control" id="search" placeholder="Search Todo" autoComplete="off" />
        </div>
      </form>
    );
  }
}

export default Search;
