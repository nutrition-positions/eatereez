import React from 'react';
import { Header, Image, Grid, Divider, Icon, Label, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';


/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Restaurant extends React.Component {
  render() {
    return (
        <div>
          <Segment raised>
          <Grid>
              <Grid.Column container width={2} centered>
                <Grid.Row>
                  <Divider hidden />
                  <Image fluid left src={this.props.restaurant.logo} />
                </Grid.Row>
              </Grid.Column>
            <Grid.Column width={7}>
              <Grid.Row>
                <Header as='h1' centered><Link color='black' to={`/details/${this.props.restaurant._id}`}>
                  {this.props.restaurant.name}</Link>
                  <Label as='h4' color='blue'>
                    Rating
                    <Label.Detail>{this.props.restaurant.rating} / 5</Label.Detail>
                    <Icon name='star' color='yellow' />
                  </Label>
                </Header>
              </Grid.Row>
              <Grid.Row>

              </Grid.Row>
              <Divider hidden />
              <Grid.Row>
              <Header as='h4' textAlign='left'>{this.props.restaurant.description}</Header>
              </Grid.Row>
            </Grid.Column>
              <Grid.Column width={3} >
                <Divider hidden />
                <Grid.Row>
                  <Header as='h4' textAlign='left'>Phone number: </Header>
                </Grid.Row>
                <Grid.Row>
                  <Header as='h4' textAlign='left'>{this.props.restaurant.phoneNumber}</Header>
                </Grid.Row>
                <Divider hidden />
                <Grid.Row>
                  <Header as='h4' textAlign='left'>Hours: </Header>
                </Grid.Row>
                <Grid.Row>
                  <Header as='h4' textAlign='left'>{this.props.restaurant.hours}</Header>
                </Grid.Row>
              </Grid.Column>
            <Grid.Column width={4}>
              <Divider hidden />
              <Grid.Row>
                <Header as='h4' textAlign='left'>Address: </Header>
              </Grid.Row>
              <Grid.Row>
                <Header as='h4' textAlign='left'>{this.props.restaurant.address}</Header>
              </Grid.Row>
              <Divider hidden />
              <Grid.Row>
                <Header as='h4' textAlign='left'>Website URL: </Header>
              </Grid.Row>
              <Grid.Row>
                <Header as='h4' textAlign='left'><Link color='black' to={this.props.restaurant.website}>
                  {this.props.restaurant.website}</Link></Header>
              </Grid.Row>
            </Grid.Column>
          </Grid>
          </Segment>
          <Divider hidden />
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
Restaurant.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Restaurant);
