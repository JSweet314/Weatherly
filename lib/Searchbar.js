import React, { Component } from 'react';
import './stylesheets/Searchbar.scss';

export default class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: {},
      displayed: true,
      searchValue: ''
    };
  }

  handleOnClick() {
    this.setState({
      style: {
        display: this.state.displayed ? 'none' : 'block'
      },
      displayed: !this.state.displayed
    });
  }

  render() {
    return (
      <nav className="search-bar">
        <button className="search-bar__btn"
          aria-label="view side menu"
          onClick={() => this.handleOnClick()}>
        </button>
        <input type="search"
          className="search-bar__search"
          placeholder="Enter City/State or Zip Code"
          aria-label="search bar"
          onChange={(event) => this.setState({
            searchValue: event.target.value
          })}
          style={this.state.style}
        />
        <button
          style={this.state.style}
          onClick={() => this.props.handleSearch(this.state.searchValue)}
        >Search</button>
      </nav>
    );
  }
}