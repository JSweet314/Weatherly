import React from 'react';
import {shallow, mount} from 'enzyme';
import Searchbar from '../lib/Searchbar.js';
import Trie from '@jsweet314//Prefix-Trie/lib/Trie';
import { cities } from '../public/Data';

describe('Searchbar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Searchbar handleSearch={jest.fn()}/>);
    localStorage.clear();
  });
  
  it('should render our good friend, Searchbar', () => {
    expect(wrapper.find('search-bar__btn')).toBeDefined;
    expect(wrapper.find('input')).toBeDefined;
    expect(wrapper.find('datalist')).toBeDefined;
    expect(wrapper.find('search-bar__submit')).toBeDefined;
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
  
  it('should call handleSearch and clear the input field when submit button is clicked', () => {
    wrapper = mount(<Searchbar handleSearch={jest.fn()} />);
    const searchBtn = wrapper.find('.search-bar__submit');
    
    wrapper.instance().updateSearchValue({ target: { value: 'Denver, CO' } });
    
    expect(wrapper.state('searchValue')).toEqual('Denver, CO');
    
    searchBtn.simulate('click');
    
    expect(wrapper.props().handleSearch).toHaveBeenCalledTimes(1);
    expect(wrapper.state('searchValue')).toEqual('');
  });
  
  it('should allow the user to press enter to submit a search', () => {
    wrapper = mount(<Searchbar handleSearch={jest.fn()} />);
    const input = wrapper.find('input');
    
    wrapper.instance().updateSearchValue({ target: { value: 'Denver, CO' } });

    expect(wrapper.state('searchValue')).toEqual('Denver, CO');

    input.simulate('keyDown', {keyCode: 13});

    expect(wrapper.props().handleSearch).toHaveBeenCalledTimes(1);
    expect(wrapper.state('searchValue')).toEqual('');
  });

  it('should store a prefix-trie for autocompletion of searches', () => {
    expect(wrapper.state('autocomplete')).toBeInstanceOf(Trie);
  });

  it('should populate its autocomplete with a thousand cities', () => {
    wrapper = mount(<Searchbar handleSearch={jest.fn()} />);
    
    expect(wrapper.state('autocomplete').populate).toHaveBeenCalled;
    expect(wrapper.state('autocomplete').count).toEqual(1000);
  });

  it('should store an array of search suggestions', () => {
    wrapper = mount(<Searchbar handleSearch={jest.fn()} />);

    expect(wrapper.state('searchSuggestions')).toEqual([]);
  });

  it('should update search suggestions as a user types', () => {
    wrapper = mount(<Searchbar handleSearch={jest.fn()} />);
    const input = wrapper.find('input');

    expect(wrapper.state('searchSuggestions')).toEqual([]);

    input.simulate('change', { target: { value: 'Denv' } });

    expect(wrapper.state('searchSuggestions')).toEqual(['Denver, CO']);
  });

  it('should call autocompletes select method when a search is submitted', () => {
    wrapper = mount(<Searchbar handleSearch={jest.fn()} />);
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
    wrapper = mount(<Searchbar handleSearch={jest.fn()} />);
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