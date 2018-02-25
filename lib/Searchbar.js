import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Trie from '@jsweet314/Prefix-Trie/lib/Trie';
import {cities} from '../public/Data';
import './stylesheets/Searchbar.scss';

export default class Searchbar extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchValue: '',
      autocomplete: new Trie(),
      searchSuggestions: []
    };
  }
  
  componentDidMount() {
    this.configureAutocomplete();
  }

  updateSearchValue(event) {
    let searchValue = event.target.value.charAt(0).toUpperCase() + 
    event.target.value.slice(1);

    this.setState({
      searchValue: event.target.value,
      searchSuggestions: this.state.autocomplete.suggest(searchValue)
    });
  }

  setTrieInLocalStorage() {
    const storageTrie = JSON.stringify(this.state.autocomplete);

    localStorage.setItem('weatherlyTrie', storageTrie);
  }

  configureAutocomplete() {
    const storageTrie = localStorage.getItem('weatherlyTrie');
   
    if (storageTrie) {
      const parsedTrie = JSON.parse(storageTrie);
      const newTrie = this.state.autocomplete;

      newTrie.root = parsedTrie.root;
      this.setState({
        autocomplete: newTrie
      });
    } else {
      this.state.autocomplete.populate(cities.data);
    }
  }

  submitSearch(event) {
    const submitBtnClicked = event.target.className === 'search-bar__submit';

    if (event.keyCode === 13 || submitBtnClicked) {
      this.state.autocomplete.insert(this.state.searchValue);
      this.state.autocomplete.select(this.state.searchValue);
      this.props.handleSearch(this.state.searchValue);
      this.setTrieInLocalStorage();
      this.setState({ searchValue: '' });
    }
  }
  
  render() {
    return (
      <nav style={this.props.style} className="search-bar">
        <input 
          aria-label="search bar"
          className="search-bar__search"
          list="autocomplete"
          onChange={event => this.updateSearchValue(event)}
          onKeyDown={event => this.submitSearch(event)}
          placeholder="Enter City, State or Zip Code"
          type="search"
          value={this.state.searchValue}
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
          onClick={(event) => this.submitSearch(event)}
        >
          SEARCH
        </button>
      </nav>
    );
  }
}

Searchbar.propTypes = {
  handleSearch: PropTypes.func.isRequired
};