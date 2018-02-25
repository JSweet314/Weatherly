import React from 'React';
import PropTypes from 'prop-types';
import './stylesheets/Welcome.scss';
import Searchbar from './Searchbar';

const Welcome = ({handleSearch}) => {
  return (
  <div className="welcome">
    <section className="welcome__main">
      <h1 className='welcome__heading'>Mike and Jon's 
        <span className='welcome__emphasis'>Fantastic</span> Weather App</h1>
      <Searchbar handleSearch={handleSearch} style={{position: 'static'}}/>
    </section>
  </div>
  );
};

Welcome.propTypes = {
  handleSearch: PropTypes.func.isRequired
};

export default Welcome;