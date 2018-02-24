import React from 'React';
import './stylesheets/Welcome.scss';
import Searchbar from './Searchbar'

const Welcome = () => {
  return (
    <section className="welcome">
      <h1 className='welcome__heading'>Mike and Jon's Fantastic Fucking Weather App</h1>
    </section>
  );
};

export default Welcome;