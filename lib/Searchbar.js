import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './stylesheets/Searchbar.scss';

export default class Searchbar extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      displayStyle: {},
      isDisplayed: true,
      searchValue: ''
    };
  }
  
  toggleMenuDisplay() {
    this.setState({
      displayStyle: {
        display: this.state.isDisplayed ? 'none' : 'block'
      },
      isDisplayed: !this.state.isDisplayed
    });
  }

  updateSearchValue(event) {
    this.setState({
      searchValue: event.target.value
    })
  }
  
  render() {
    return (
      <nav className="search-bar">
        <button className="search-bar__btn"
          aria-label="view side menu"
          onClick={() => this.toggleMenuDisplay()}>
        </button>
        <input type="search"
          className="search-bar__search"
          placeholder="Enter City, State or Zip Code"
          aria-label="search bar"
          value={this.state.searchValue}
          onChange={event => this.updateSearchValue(event)}
          style={this.state.displayStyle}
        />
        <button
          className='search-bar__submit'
          style={this.state.displayStyle}
          onClick={() => {
            this.props.handleSearch(this.state.searchValue);
            this.setState({
              searchValue: ''
            });
          }}
        >
          Search
        </button>
      </nav>
    );
  }
}

Searchbar.propTypes = {
  handleSearch: PropTypes.func.isRequired
};