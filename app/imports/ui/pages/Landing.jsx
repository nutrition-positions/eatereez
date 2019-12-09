import React from 'react';
import { Header, Image, Input, Grid, Button, Icon } from 'semantic-ui-react';
import { Fade } from 'react-slideshow-image';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  updateSearchName(event) {
    this.setState({ searchName: event.target.value });
  }

  render() {
    return (
        <div>
          <Greet/>
          {/*<div className="ui divider"/>*/}
          <Info1/>
          {/*<div className="ui divider"/>*/}
          <ImageCarousel/>
          {/*<div className="ui divider"/>*/}
          <Info2/>
        </div>
    );
  }
}

class Greet extends React.Component {
  render() {
    const buttonStyle = { width: '260px', height: '51px' };
    return (
        <div className='eatereez-landing-background'>
          <Image
              className='eatereez-landing-logo'
              size='huge' src='images/eatereez-logo-text.png' centered/>
          <div className='landing-padding-top'>
            <Grid stackable centered container columns={1}>
              <Grid.Column textAlign='center'>
                <Header as='h1' className='landing-text-color' textAlign='center'
                >Look for a place to eat here!<br/>You can go to list, or start by searching.</Header>
                <Grid centered columns={2}>
                  <Grid.Column>
                    <Button as={NavLink} activeClassName="" exact to="/food"
                            style={buttonStyle}
                            className='ui button' size='huge' floated='right'>Go to Restaurants List</Button>
                  </Grid.Column>
                  <Grid.Column>
                    <div className='ui input bordered'>
                      <Input
                          type='text'
                          size='big'
                          icon='search'
                          placeholder='Search...'
                          style={buttonStyle}
                          // onChange={Landing.updateSearchName.bind(this)}
                          // value={Landing.state.searchName}
                      />
                    </div>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid>
          </div>
        </div>
    );
  }
}

class Info1 extends React.Component {
  render() {
    return (
        <div className='landing-info1'>
          <Header size='huge' textAlign='center'>
            We find the places to eat here at University of Hawaii at Manoa!
          </Header>
          <Grid className='landing-info1-title'>
            <Grid.Row columns={3} divided='vertically'>
              <Grid.Column textAlign='center'>
                <Icon size='huge' name='blue map'/>
                <Header as='h2' textAlign='center' className='landing-info1-title'>
                  Find what you want to eat and discovery new places!
                </Header>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Icon size='huge' name='orange food'/>
                <Header as='h2' textAlign='center'>
                  Hungry for something particular? We have search options that will help find what you need!
                </Header>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Icon size='huge' name='green leaf'/>
                <Header as='h2' textAlign='center'>
                  Vegetarian or vegan? No problem!
                  We will find the restaurants for your diet.
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

class ImageCarousel extends React.Component {
  render() {
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
                     as={NavLink} activeClassName="" exact to={`/details/${this.props}`}
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

class Info2 extends React.Component {
  render() {
    return (
        <div className='landing-info'>
          <Header as='h2'>Don&apos;t see what you&apos;re looking for? Login and add it to our list!</Header>
        </div>
    );
  }
}

Landing.state = {
  searchName: '',
};

Info1.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

export default Landing;
