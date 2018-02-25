import React from 'React';
import './stylesheets/Welcome.scss';
import Searchbar from './Searchbar';

const Welcome = ({handleSearch}) => {
  return (
  <div className="welcome">
    <section className="welcome__main">
      <h1 className='welcome__heading'>Mike and Jon's Fantastic Fucking Weather App</h1>
      <Searchbar handleSearch={handleSearch} style={{position: 'static'}}/>
    </section>
  </div>
  );
};

export default Welcome;