import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Fade } from 'react-slideshow-image';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Restaurants } from '../../api/restaurant/Restaurants';

class LandingImageCarousel extends React.Component {

  getRandom(num) {
    const randomList = [];
    const max = this.props.restaurants.length;
    let i = 0;
    while (i < num) {
      const randomNum = Math.floor(Math.random() * Math.floor(max));
      if (!randomList.includes(this.props.restaurants[randomNum])) {
        randomList.push(this.props.restaurants[randomNum]);
        i++;
      }
    }
    return randomList;
  }

  render() {
    return (this.props.ready) ? this.renderPage() : '';
  }

  renderPage() {

    const list = this.getRandom(3);
    const imageList = [];
    list.forEach((item) => imageList.push(item.logo));

    const fadeProperties = {
      duration: 10000,
      transitionDuration: 500,
      infinite: true,
      indicators: false,
    };

    const imageStyle = { width: 'auto', height: '350' };

    return (
        <div className='landing-caroursel'>
          <Header as='h1' textAlign='center'>Looking for something different? Try one of these places:</Header>
            <Fade {...fadeProperties}>
              <div className="each-fade">
                <div className="image-container">
                  <Link to={`/details/${list[0]._id}`}>
                    <Image className='ui rounded image' src={imageList[0]} alt='img0' style={imageStyle} centered />
                  </Link>
                </div>
              </div>
              <div className="each-fade">
                <div className="image-container">
                  <Link to={`/details/${list[1]._id}`}>
                    <Image className='ui rounded image' src={imageList[1]} alt='img1' style={imageStyle} centered />
                  </Link>
                </div>
              </div>
              <div className="each-fade">
                <div className="image-container">
                  <Link to={`/details/${list[2]._id}`}>
                    <Image className='ui rounded image' src={imageList[2]} alt='img2' style={imageStyle} centered />
                  </Link>
                </div>
              </div>
            </Fade>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
LandingImageCarousel.propTypes = {
  restaurants: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Restaurant');
  return {
    restaurants: Restaurants.find({}).fetch(),
    ready: subscription.ready(),
  };
})(LandingImageCarousel);
