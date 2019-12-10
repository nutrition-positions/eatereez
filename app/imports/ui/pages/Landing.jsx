import React from 'react';
import Greet from '../components/Greet';
import Info1 from '../components/Info1';
import ImageCarousel from '../components/LandingImageCoursel';
import Info2 from '../components/Info2';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  updateSearchName(event) {
    this.setState({ searchName: event.target.value });
  }

  render() {
    return (
        <div>
          <Greet/>
          <Info1/>
          <div className="ui divider"/>
          <ImageCarousel/>
          <div className="ui divider"/>
          <Info2/>
        </div>
    );
  }
}

export default Landing;
