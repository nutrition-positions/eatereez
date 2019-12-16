import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Header, Loader, Divider, Input, Dropdown, Pagination } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Restaurant from '../components/Restaurant';
import { Restaurants } from '../../api/restaurant/Restaurants';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListRestaurantMap extends React.Component {

  constructor() {
    super();
    this.state = {
      searchName: '',
      filterPref: '',
      filterDiet: 'none',
      filterLoc: 'Paradise Palms',
      page: '1',
    };
  }

  componentDidMount() {
    if (this.props.location !== undefined &&
        this.props.location.state !== undefined &&
        this.props.location.filterDiet !== undefined) {
      this.setState({ searchName: this.props.location.state });
      this.setState({ filterDiet: this.props.location.filterDiet });
    }
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
   * Catches event for dropdown menu preference
   * @param event
   * @param data
   */
  updateLocationPref(event, data) {
    this.setState({ filterLoc: data.value });
  }

  /**
   * Currently hardcoded set list of preferences. Needs to be updated such that this list resides elsewhere!
   * @returns {[]}
   */
  getPreferenceList() {
    return ([{
          key: 'none',
          text: 'No Preference',
          value: 'none',
        }, {
          key: 'chinese',
          text: 'Chinese',
          value: 'Chinese',
        }, {
          key: 'Sandwich',
          text: 'Sandwich',
          value: 'sandwich',
        }, {
          key: 'Hawaiian',
          text: 'Hawaiian',
          value: 'Hawaiian',
        }, {
          key: 'Savory',
          text: 'Savory',
          value: 'savory',
        },
      ]
    );
  }

  getDietList() {
    return ([{
          key: 'none',
          text: 'No Restriction',
          value: 'none',
        }, {
          key: 'vegetarian',
          text: 'Vegetarian',
          value: 'vegetarian',
        }, {
          key: 'vegan',
          text: 'Vegan',
          value: 'vegan',
        },
        ]
    );
  }

  getLocationList() {
    const list = [];
    let tempList = [];
    this.props.restaurants.forEach((item) => tempList.push(item.location));
    tempList = [...new Set(tempList)];
    list.push({
      key: 'none',
      text: 'Any Location',
      value: 'none',
    });
    tempList.forEach((location) => list.push({
      key: location,
      text: location,
      value: location,
    }));
    return list;
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
    // filters name.
    list = this.props.restaurants.filter(
        (items) => items.name.toLowerCase().indexOf(this.state.searchName.toLowerCase()) !== -1,
    );

    // filters preference.=
    if (this.state.filterPref !== 'none') {
      list = list.filter(
          (items) => items.description.indexOf(this.state.filterPref) !== -1,
      );
    }

    // filters diet. Vegans are vegetarians but vegetarians are not vegan.
    if (this.state.filterDiet === 'vegan') {
      list = list.filter(
          (items) => items.diet.indexOf(this.state.filterDiet) !== -1,
      );
    } else if (this.state.filterDiet === 'vegetarian') {
      list = list.filter(
          (items) => items.diet.indexOf('none') === -1,
      );
    }
    //
    // // filters preference.
    if (this.state.filterLoc !== 'none') {
      list = list.filter(
          (items) => items.location.indexOf(this.state.filterLoc) !== -1,
      );
    }

    return list;
  }

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage });
  };

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const firstDivSpacer = { paddingTop: '14px' };
    let restaurantList = this.getRestaurantList();
    const sizer = { height: 'auto', width: '100%' };

    const listingsPerPage = 4;
    const totalPages = restaurantList.length / listingsPerPage;
    const page = this.state.page;
    restaurantList = restaurantList.slice(
        (page - 1) * listingsPerPage,
        (page - 1) * listingsPerPage + listingsPerPage,
    );

    return (
        <div>
          <Container className='List-spacing'>
            <Header as='h2' textAlign='center'>Manoa Eatery Search</Header>
            <Grid>
              <Grid.Row columns={4}>
                <Grid.Column>
                  <Header as='h3' textAlign='left'>Search by name:</Header>
                  <Container>
                  <div className='ui fluid icon input'>
                    <Input
                        type='text'
                        icon='search'
                        placeholder='Search...'
                        onChange={this.updateSearchName.bind(this)}
                        value={this.state.searchName}
                    />
                  </div>
                  </Container>
                </Grid.Column>
                  <Grid.Column>
                    <Header as='h3' textAlign='left'>Types of food:</Header>
                    <Dropdown
                        search
                        selection
                        options={this.getPreferenceList()}
                        onChange={this.updateFilterPref.bind(this)}
                        placeholder='Select preference'
                    />
                  </Grid.Column>
                <Grid.Column>
                  <Header as='h3' textAlign='left'>Dietary Preference:</Header>
                  <div className='ui dropdown'>
                    <Dropdown
                        style={sizer}
                        size='large'
                        value={this.state.filterDiet}
                        options={this.getDietList()}
                        onChange={this.updateFilterDiet.bind(this)}
                    >
                    </Dropdown>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <Header as='h3' textAlign='left'>Location:</Header>
                  <div className='ui dropdown'>
                    <Dropdown
                        style={sizer}
                        size='large'
                        value={this.state.filterLoc}
                        options={this.getLocationList()}
                        onChange={this.updateLocationPref.bind(this)}
                    >
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
            <ul className="pagination justify-content-center">
              <Pagination
                  totalPages={totalPages}
                  activePage={page}
                  onPageChange={this.setPageNum}
                  pointing
                  secondary
              />
            </ul>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListRestaurantMap.propTypes = {
  restaurants: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  location: PropTypes.object,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Restaurant');
  return {
    restaurants: Restaurants.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListRestaurantMap);
