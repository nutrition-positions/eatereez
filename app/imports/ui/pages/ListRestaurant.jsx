import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Header, Loader, Divider, Input, Dropdown } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Restaurant from '../components/Restaurant';
import { Restaurants } from '../../api/restaurant/Restaurants';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListRestaurant extends React.Component {

  constructor() {
    super();
    this.state = {
      searchName: '',
      filterPref: '',
      filterDiet: 'Standard',
    };
  }

  /**
   * Catches event for input
   * @param event
   */
  updateSearchName(event) {
    this.setState({ searchName: event.target.value });
  }

  /**
   * Catches event for dropdown menu preference
   * @param event
   * @param data
   */
  updateFilterPref(event, data) {
    this.setState({ filterPref: data.value });
  }

  /**
   * Currently hardcoded set list of preferences. Needs to be updated such that this list resides elsewhere!
   * @returns {[]}
   */
  getPreferenceList() {
    return ([{
          key: 'no pref',
          text: 'None',
          value: '',
        }, {
          key: 'chinese',
          text: 'Chinese',
          value: 'chinese',
        }, {
          key: 'Sandwich',
          text: 'Sandwich',
          value: 'Sandwich',
        }, {
          key: 'Hawaiian',
          text: 'Hawaiian',
          value: 'Hawaiian',
        }, {
          key: 'Savory',
          text: 'Savory',
          value: 'Savory',
        },
      ]
    );
  }

  /**
   * Catches event for dropdown menu diet
   * @param event
   * @param data
   */
  updateFilterDiet(event, data) {
    this.setState({ filterDiet: data.value });
  }

  /**
   * Returns the restaurant list with all set filters
   * @returns {*[]} Restaurants
   */
  getRestaurantList() {
    let list = [];
    list = this.props.restaurants.filter(
        // filters name
        (items) => items.name.toLowerCase().indexOf(this.state.searchName.toLowerCase()) !== -1 &&
            // filters preference
            items.description.toLowerCase().indexOf(this.state.filterPref.toLowerCase())
            !== -1,
    );
    return list;
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const firstDivSpacer = { paddingTop: '14px' };
    const restaurantList = this.getRestaurantList();
    const handleOnChange = (event, data) => {
      this.updateFilterPref(event, data);
    };
    return (
        <div>
          <Container className='List-spacing'>
            <Header as='h2' textAlign='center'>List Restaurant</Header>
            <Grid>
              <Grid.Row columns={4}>
                <Grid.Column>
                  <Header as='h3' textAlign='left'>Search by name:</Header>
                  <div className='ui input bordered'>
                    <Input
                        type='text'
                        size='big'
                        icon='search'
                        transparent placeholder='Search...'
                        onChange={this.updateSearchName.bind(this)}
                        value={this.state.searchName}
                    />
                  </div>
                </Grid.Column>
                <React.Fragment>
                  <Grid.Column>
                    <Header as='h3' textAlign='left'>Types of food:</Header>
                    <Dropdown
                        search
                        selection
                        options={this.getPreferenceList()}
                        onChange={handleOnChange}
                        placeholder='Select preference'
                    />
                  </Grid.Column>
                </React.Fragment>
                <Grid.Column>
                  <Header as='h3' textAlign='left'>Dietary Preference:</Header>
                  <div className='ui dropdown'>
                    <Dropdown
                        text='Standard'
                        size='big'
                        onChange={this.updateFilterDiet.bind(this)}
                        value={this.state.filterDiet}>
                      <Dropdown.Menu>
                        <Dropdown.Item text='Standard' />
                        <Dropdown.Item text='Vegetarian' />
                        <Dropdown.Item text='Vegan' />
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider style={firstDivSpacer}/>
            <Grid columns={1} top-padding="14px" centered>
              { restaurantList.length === 0 ?
                  (<Header as="h1" textAlign="center">Sorry! No restaurant found</Header>) :
                  (restaurantList.map((restaurant, index) => <Restaurant key={index} restaurant={restaurant}/>))
              }
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
