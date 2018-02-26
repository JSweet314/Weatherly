import React from 'React';
import { shallow, mount } from 'enzyme';
import Welcome from '../lib/Welcome.js';
import Searchbar from '../lib/Searchbar.js';

describe('Welcome', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Welcome handleSearch={{}} error={false} />);
  });

  it('should render our good friend Welcome', () => {
    wrapper = mount(<Welcome handleSearch={{}} error={{}} />)
    expect(wrapper).not.toBeNull;
    expect(wrapper.find('h1.welcomeHeading')).toBeDefined;
    expect(wrapper.find('img')).toBeDefined;
  });

  it('should have a handleSearch prop', () => {
    expect(wrapper.props('handleSearch')).toBeDefined;
  });

  it('should mount Searchbar', () => {
    let searchbar = mount(<Searchbar />);
  });

  it('should have an error prop', () => {
    expect(wrapper.props('error')).toBeDefined;
  });

  it('should change the text of the h1 if error is true', () => {
    expect(wrapper.find('h1.welcome__heading').text()).toEqual('Mike and Jon\'s Fantastic Weather App');
  
    wrapper = shallow(<Welcome handleSearch={{}} error={true} />)
    expect(wrapper.find('h1.welcome__heading').text()).toEqual('Something went wrong...Please search again for a City and State or Zip Code'); 
  });
});