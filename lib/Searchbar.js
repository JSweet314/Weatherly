import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Trie from '@jsweet314/Prefix-Trie/lib/Trie';
import {cities} from '../public/Data';
import './stylesheets/Searchbar.scss';

export default class Searchbar extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      displayStyle: {},
      isDisplayed: true,
      searchValue: '',
      autocomplete: new Trie(),
      searchSuggestions: []
    };
  }
  
  componentDidMount() {
    let trie = localStorage.getItem('weatherlyTrie');

    if (trie) {
      this.state.autocomplete.populate(trie);
    } else {
      this.state.autocomplete.populate(cities.data);
    }
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
    let searchValue = event.target.value.charAt(0).toUpperCase() + 
    event.target.value.slice(1);

    this.setState({
      searchValue: event.target.value,
      searchSuggestions: this.state.autocomplete.suggest(searchValue)
    });
  }
  
  render() {
    return (
      <nav className="search-bar">
        <button className="search-bar__btn"
          aria-label="view side menu"
          onClick={() => this.toggleMenuDisplay()}>
        </button>
        <input type="search"
          list="autocomplete"
          className="search-bar__search"
          placeholder="Enter City, State or Zip Code"
          aria-label="search bar"
          value={this.state.searchValue}
          onChange={event => {
            this.updateSearchValue(event);
          }}
          style={this.state.displayStyle}
        />
        <datalist id="autocomplete">
          {
            this.state.searchSuggestions.map((suggestion, index) => {
              if (index < 5) {
                return <option key={index} value={suggestion} />;
              }
            })
          }
        </datalist>
        <button
          className='search-bar__submit'
          style={this.state.displayStyle}
          onClick={() => {
            this.props.handleSearch(this.state.searchValue);
            this.setState({searchValue: ''});
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