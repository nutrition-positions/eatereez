import React from 'react';
import { Header } from 'semantic-ui-react';
import { Fade } from 'react-slideshow-image';

class LandingImageCarousel extends React.Component {

  // function getRandomInt(max) {
  //   return Math.floor(Math.random() * Math.floor(max));
  // }

  // getRandom(num) {
  //   const random = [];
  //   const max = this.props.restaurant.length;
  //   for (let i = 0; i < num; i++) {
  //     random.push(this.props.restaurant[Math.floor(Math.random() * Math.floor(max))]);
  //   }
  //   return random;
  // }

  render() {

    // const list = this.getRandom(3);

    const imageList = [
      'images/panda-image.jpg',
      'images/cc.jpg',
      'images/cc2.jpg',
      'images/campus.jpg',
    ];

    const fadeProperties = {
      duration: 10000,
      transitionDuration: 500,
      infinite: true,
      indicators: false,
    };

    const imageStyle = { width: '800px', height: 'auto' };

    return (
        <div className='landing-caroursel'>
          <Header as='h1'>Check out the top three places from out list</Header>
          <Fade {...fadeProperties}>
            <div className="each-fade">
              <div className="image-container">
                <img className='ui rounded centered image'
                     src={imageList[0]} style={imageStyle}
                />
              </div>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img className='ui rounded image' src={imageList[1]} style={imageStyle}/>
              </div>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img className='ui rounded image' src={imageList[2]} style={imageStyle}/>
              </div>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img className='ui rounded image' src={imageList[3]} style={imageStyle}/>
              </div>
            </div>
          </Fade>
        </div>
    );
  }
}

export default LandingImageCarousel;
