import React from 'react';
import {shallow, mount} from 'enzyme';
import Searchbar from '../lib/Searchbar.js';
import { wrap } from 'module';

describe('Searchbar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Searchbar />);
  });
  
  it('should render two buttons and an input[type=search]', () => {
    expect(wrapper.containsAllMatchingElements([
      <button/>, <input type='search' />, <button />
    ]));
  });

  it('should start with an empty style list', () => {
    expect(wrapper.state('displayStyle')).toEqual({});
  });

  it('should be displayed by default', () => {
    expect(wrapper.state('isDisplayed')).toEqual(true);
  });

  it('should store a search value', () => {
    expect(wrapper.state('searchValue')).toEqual('');
  });

  it('should update the states searchValue as input changes', () => {
    const input = wrapper.find('input');

    expect(wrapper.state('searchValue')).toEqual('');
    
    wrapper.instance().updateSearchValue = jest.fn();
    input.simulate('change', {target: {value: 'search term'}});
    
    expect(wrapper.instance().updateSearchValue).toHaveBeenCalledTimes(1);
  });

  it('should be able to update the searchValue in state', () => {
    expect(wrapper.state('searchValue')).toEqual('');
    wrapper.instance().updateSearchValue({target: {value: 'search term'}});
    expect(wrapper.state('searchValue')).toEqual('search term');
  });


  it('should be able to toggle the display of the input and submit buttons', () => {
    const button = wrapper.find('.search-bar__btn');

    expect(wrapper.instance().toggleMenuDisplay).not.toHaveBeenCalled;

    wrapper.instance().toggleMenuDisplay = jest.fn();
    button.simulate('click');

    expect(wrapper.instance().toggleMenuDisplay).toHaveBeenCalledTimes(1);
  });

  it('should update the displayStyle in state', () => {
    expect(wrapper.state('displayStyle')).toEqual({});
    expect(wrapper.state('isDisplayed')).toEqual(true);

    wrapper.instance().toggleMenuDisplay();

    expect(wrapper.state('displayStyle')).toEqual({display: 'none'});
    expect(wrapper.state('isDisplayed')).toEqual(false);

    wrapper.instance().toggleMenuDisplay();

    expect(wrapper.state('displayStyle')).toEqual({ display: 'block' });
    expect(wrapper.state('isDisplayed')).toEqual(true);
  });

  it('should call handleSubmit when submit button is clicked', () => {
    wrapper = mount(<Searchbar handleSearch={jest.fn()} />)
    const searchBtn = wrapper.find('.search-bar__submit');
    
    wrapper.instance().updateSearchValue({ target: { value: 'search term' } });
    
    expect(wrapper.state('searchValue')).toEqual('search term');

    searchBtn.simulate('click');

    expect(wrapper.props().handleSearch).toHaveBeenCalledTimes(1);
    expect(wrapper.state('searchValue')).toEqual('');
  })
});
