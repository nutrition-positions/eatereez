import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { Restaurants } from '../../api/restaurant/Restaurants';


class LandingSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchName: '',
    };
  }

  updateSearchName(event) {
    this.setState({ searchName: event.target.value });
  }

  getRestaruantList() {
    const list = [];
    // this.props.restaurants.forEach((item) => list.push({ text: item.name,
    //   as: { NavLink }, to: `/submit-review/${item._id}` }));
    this.props.restaurants.forEach((item) => list.push({ key: item.name, text: item.name }));
    return list;
  }

  render() {
    return (this.props.restaurants !== 'undefined') ? this.renderPage() : '';
  }

  renderPage() {
    const buttonStyle = { width: '260px' };
    return (
        <Dropdown
            className='landing-search-font'
            placeholder='Search...'
            search
            selection
            style={buttonStyle}
            options={this.getRestaruantList()}
        >
          {/* <Dropdown.Menu> */}
          {/* {this.props.restaurants.forEach((item) => <Dropdown.Item text={item.name} */}
          {/*                                                         as={NavLink} */}
          {/*                                                         exact to={`/submit-review/${item._id}`} />)} */}
          {/* </Dropdown.Menu> */}
        </Dropdown>

    );
  }

}

/** Require an array of Stuff documents in the props. */
LandingSearch.propTypes = {
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
})(LandingSearch);
