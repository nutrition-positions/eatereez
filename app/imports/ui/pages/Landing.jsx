import React from 'react';
import { Header, Image, Input, Grid, Button, Icon } from 'semantic-ui-react';
import { Fade } from 'react-slideshow-image';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  updateSearchName(event) {
    this.setState({ searchName: event.target.value });
  }

  render() {
    return (
        <div>
          <Greet/>
          <div className="ui divider"></div>
          <Info1/>
          <div className="ui divider"></div>
          <ImageCarousel/>
        </div>
    );
  }
}

class Greet extends React.Component {
  render() {
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
                    <Button className='ui button' size='huge' floated='right'>Go to Restaurants List</Button>
                  </Grid.Column>
                  <Grid.Column>
                    <div className='ui input bordered'>
                      <Input
                          type='text'
                          size='big'
                          icon='search'
                          placeholder='Search...'
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
    const style = { float: 'right' };
    return (
        <div className='landing-padding-top'>
          <Grid divided='vertically'>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Icon className='info circle' size='massive' style={style}/>
              </Grid.Column>
              <Grid.Column>
                <p>This is some information</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

class igC extends React.Component {
  image = '';

  constructor(image) {
    super();
    this.image = image;
  }

  render() {
    return (
        <div className="each-fade">
          <div className="image-container">
            <img src={this.image}/>
          </div>
        </div>
    );
  }
}


class ImageCarousel extends React.Component {

  render() {
    const imageList = [
        'images/eateerez-cover-image.png',
        'images/holoholo-grill-logo.png',
        'images/L&L-logo.jpg',
    ];

    const fadeProperties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
    };

    const gridStyle = { height: '500px' };

    return (
        <div className='landing-caroursel'>
          <Grid container verticalAlign='middle' style={gridStyle}>
            <Grid.Row columns="two">
              <Grid.Column width={10}>
                <div className="slide-container">
                  <Fade {...fadeProperties}>
                    {/* {imageList.forEach(element => <igC(element)/>)} */}
                    <div className="each-fade">
                      <div className="image-container">
                        <img src={imageList[0]}/>
                      </div>
                    </div>
                    <div className="each-fade">
                      <div className="image-container">
                        <img src={imageList[1]}/>
                      </div>
                    </div>
                    <div className="each-fade">
                      <div className="image-container">
                        <img src={imageList[2]}/>
                      </div>
                    </div>
                  </Fade>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}


Landing.state = {
  searchName: '',
};

export default Landing;
