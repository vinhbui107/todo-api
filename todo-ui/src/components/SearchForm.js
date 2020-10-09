import React, { Component } from "react";

class SearchForm extends Component {
  constructor(props) {
    super(props);
  }

  // handleSearch = (searchKey) => {
  //   let searchResult = this.props.todos;
  //   let newArray = [];
  //   if(searchKey.length <= 0) {
  //       newArray = searchResult;
  //   } else {
  //       searchKey.toLowerCase();
  //       for(let todo of searchResult) {
  //           if(todo.body.includes(searchKey)) {
  //               newArray.push(todo);
  //           }
  //       }
  //   }
  //   this.setState({
  //       searchResult : newArray,
  //       searchKey: searchKey
  //   });
  // }

  render() {
    return (
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="search"
            // value={this.props.searchKey}
            // onChange={this.handleSearch(this.props.searchKey)}
            placeholder="Search Todo"
            autoComplete="off"
          />
        </div>
      </form>
    );
  }
}

export default SearchForm;
