import React from 'react';
import { Header, Image, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Restaurant extends React.Component {
  render() {
    const resStyle = { paddingTop: '60px' };
    return (
        // <Card centered>
        //    <img src='https://haysfreepress.com/wp-content/uploads/2017/01/panda-express.jpg' />
        //   {/* <img src='../../../public/images/panda-image.jpg'/> */}
        //   <Card.Content>
        //     <Card.Header as={NavLink} activeClassName="active" exact to="/restaurant" key='restaurant'>
        //       {this.props.restaurant.name}</Card.Header>
        //     <Card.Meta>{this.props.restaurant.quantity}</Card.Meta>
        //     <Card.Description>
        //       {this.props.restaurant.condition}
        //     </Card.Description>
        //   </Card.Content>
        //   <Card.Content extra>
        //     <a>
        //       Reviews
        //     </a>
        //   </Card.Content>
        // </Card>
        <Grid>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image size='huge' src={this.props.restaurant.image} />
            </Grid.Column>
            <Grid.Column width={5}>
              <Header as='h1'>{this.props.restaurant.name}</Header>
              <Header as='h3'>{this.props.restaurant.description}</Header>
              <Header as='h3'>{this.props.restaurant.rating} / 5 stars</Header>
              <Header as='h3'>Phone number: {this.props.restaurant.phoneNumber}</Header>
              <Header as='h3'>Address: {this.props.restaurant.address}</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Require a document to be passed to this component. */
Restaurant.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Restaurant);
