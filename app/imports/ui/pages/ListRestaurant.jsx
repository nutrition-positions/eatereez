import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Header, Loader, Divider, Input } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Restaurant from '../components/Restaurant';
import { Restaurants } from '../../api/restaurant/Restaurants';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListRestaurant extends React.Component {

  constructor() {
    super();
    this.state = {
      search: '',
    };
  }

  updateSearch(event) {
    // console.log(event.target.value);
    this.setState({ search: event.target.value });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const firstDivSpacer = { paddingTop: '14px' };
    const searched = this.props.restaurants.filter(
        (items) => items.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1,
    );
    return (
        <div>
          <Container className="List-spacing">
            <Header as="h2" textAlign="center">List Restaurant</Header>
            <Header as="h3" textAlign="left">Search by name:</Header>
            <div className="ui input">
              <Input
                  type='text'
                  size='big'
                  icon='search'
                  transparent placeholder='Search...'
                  onChange={this.updateSearch.bind(this)}
                  value={this.state.search}
                  boardered
              />
            </div>
            <Divider style={firstDivSpacer}/>
            <Grid columns={1} top-padding="14px" centered>
              {/* c = (a < b) ? a : b; */}
              { _.isEmpty(searched) ?
                  (<Header as="h1" textAlign="center">Sorry! No restaurant found</Header>) :
                  (searched.map((restaurant, index) => <Restaurant key={index} restaurant={restaurant}/>))}
            </Grid>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListRestaurant.propTypes = {
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
})(ListRestaurant);
