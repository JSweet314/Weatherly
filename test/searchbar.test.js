import React from 'react';
import {shallow, mount} from 'enzyme';
import Searchbar from '../lib/Searchbar.js';
import Trie from '@jsweet314//Prefix-Trie/lib/Trie';
import { cities } from '../public/Data';

describe('Searchbar - shallow render', () => {
  let wrapper;

  beforeEach(() => {
    localStorage.clear();
    wrapper = shallow(<Searchbar handleSearch={jest.fn()}/>);
  });
  
  it('should render our good friend, Searchbar', () => {
    expect(wrapper.find('input.search-bar__search').length).toEqual(1);
    expect(wrapper.find('datalist#autocomplete').length).toEqual(1);
    expect(wrapper.find('button.search-bar__submit').length).toEqual(1);
  });

  it('should store a search value', () => {
    expect(wrapper.state('searchValue')).toEqual('');
  });

  it('should be able to update its searchValue', () => {
    expect(wrapper.state('searchValue')).toEqual('');
    wrapper.instance().updateSearchValue({target: {value: 'Denver, CO'}});
    expect(wrapper.state('searchValue')).toEqual('Denver, CO');
  });

  it('should update the states searchValue as input changes', () => {
    const input = wrapper.find('input');

    expect(wrapper.state('searchValue')).toEqual('');
    
    wrapper.instance().updateSearchValue = jest.fn();
    input.simulate('change', {target: {value: 'Denver, CO'}});
    
    expect(wrapper.instance().updateSearchValue).toHaveBeenCalledTimes(1);
  });

  it('should store a prefix-trie for autocompletion of searches', () => {
    expect(wrapper.state('autocomplete')).toBeInstanceOf(Trie);
  });
});

describe('Searchbar - mounted rendering', () => {
  let wrapper;

  beforeEach(()=> {
    localStorage.clear();
    wrapper = mount(<Searchbar handleSearch={jest.fn()} />)
  });

  it('should call handleSearch and clear the input field when submit button is clicked', () => {
    console.log(wrapper.debug())
    const searchBtn = wrapper.find('.search-bar__submit');
    
    wrapper.instance().updateSearchValue({ target: { value: 'Denver, CO' } });
    
    expect(wrapper.state('searchValue')).toEqual('Denver, CO');
    
    searchBtn.simulate('click');
    
    expect(wrapper.props().handleSearch).toHaveBeenCalledTimes(1);
    expect(wrapper.state('searchValue')).toEqual('');
  });
  
  it('should allow the user to press enter to submit a search', () => {
    const input = wrapper.find('input');
    
    wrapper.instance().updateSearchValue({ target: { value: 'Denver, CO' } });

    expect(wrapper.state('searchValue')).toEqual('Denver, CO');

    input.simulate('keyDown', {keyCode: 13});

    expect(wrapper.props().handleSearch).toHaveBeenCalledTimes(1);
    expect(wrapper.state('searchValue')).toEqual('');
  });

  it('should populate its autocomplete with a thousand cities', () => {
    expect(wrapper.state('autocomplete').populate).toHaveBeenCalled;
    expect(wrapper.state('autocomplete').count).toEqual(1000);
  });

  it('should store an array of search suggestions', () => {
    expect(wrapper.state('searchSuggestions')).toEqual([]);
  });

  it('should update search suggestions as a user types', () => {
    const input = wrapper.find('input');

    expect(wrapper.state('searchSuggestions')).toEqual([]);

    input.simulate('change', { target: { value: 'Denv' } });

    expect(wrapper.state('searchSuggestions')).toEqual(['Denver, CO']);
  });

  it('should call autocompletes select method when a search is submitted', () => {
    const submitBtn = wrapper.find('.search-bar__submit');
    
    wrapper.instance().updateSearchValue({ target: { value: 'D' } });
    expect(wrapper.state('searchSuggestions')[0]).toEqual('Delano, CA');

    wrapper.instance().updateSearchValue({ target: { value: 'Denver, CO' } });
    submitBtn.simulate('click');

    expect(wrapper.state('autocomplete').select).toHaveBeenCalled;

    wrapper.instance().updateSearchValue({ target: { value: 'D' } });
    expect(wrapper.state('searchSuggestions')[0]).toEqual('Denver, CO');
  });

  it('should store its autocomplete trie in localStorage', () => {
    const submitBtn = wrapper.find('.search-bar__submit');

    wrapper.instance().updateSearchValue({ target: { value: 'Denver, CO' } });
    submitBtn.simulate('click');

    expect(localStorage.getItem('weatherlyTrie')).toBeDefined;
  });

  it('should retrieve its autocomplete trie from localStorage if available', () => {
    const trie = new Trie();

    trie.populate(cities.data);

    expect(trie.suggest('D')[0]).toEqual('Delano, CA')

    trie.select('Denver, CO');

    expect(trie.suggest('D')[0]).toEqual('Denver, CO')

    localStorage.setItem('weatherlyTrie', JSON.stringify(trie));

    wrapper = mount(<Searchbar handleSearch={jest.fn()} />);
    wrapper.instance().updateSearchValue({ target: { value: 'D' } });

    expect(wrapper.configureAutocomplete).toHaveBeenCalled;
    expect(wrapper.state('searchSuggestions')[0]).toEqual('Denver, CO');
  });
});