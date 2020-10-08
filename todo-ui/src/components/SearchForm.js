import React, { Component } from "react";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.setState = {
      filter: "",
    };
  }

  onSearchChange = (e) => {
    this.setState({
      filter: e.target.value,
    });
    if (this.state.filter !== null) {
      this.props.handleClickParent(this.state.filter);
    }
  };

  render() {
    return (
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="search"
            value={this.state.filter}
            onChange={this.onSearchChange}
            placeholder="Search Todo"
            autoComplete="off"
          />
        </div>
      </form>
    );
  }
}

export default SearchForm;
