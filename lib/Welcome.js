import React from 'react';
import PropTypes from 'prop-types';
import './stylesheets/Welcome.scss';
import Searchbar from './Searchbar';

const Welcome = ({handleSearch, error, lastSearch}) => {
  return (
  <div className="welcome">
    {
      !error &&
      <section className="welcome__main">
        <h1 className='welcome__heading'>Mike and Jon's
          <span className='welcome__emphasis'> Fantastic</span> Weather App</h1>
        <Searchbar lastSearch={lastSearch}
          handleSearch={handleSearch}
          style={{position: 'static'}}/>
      </section>
    }
    {
      error &&
      <section className="welcome__main">
        <img src="../lib/images/error.svg" alt="Sad Cloud" />
        <h1 className='welcome__heading'>Something went wrong...
          <br/>Please search again for a City and State or Zip Code</h1>
        <Searchbar handleSearch={handleSearch} style={{ position: 'static' }} />
      </section>
    }
  </div>
  );
};

Welcome.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  lastSearch: PropTypes.string
};

export default Welcome;