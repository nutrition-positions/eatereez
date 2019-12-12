import React from 'react';
import { _ } from 'lodash';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Search, Image } from 'semantic-ui-react';
import { Restaurants } from '../../api/restaurant/Restaurants';


class LandingSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchName: '',
      isLoading: false,
      results: [],
      value: '',
    };
  }

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  render() {
    const { isLoading, value, results } = this.state;
    return (
        <div>
          {/* {this.state.toDir ? <Redirect to={{ pathname: this.state.dir }} /> : ''} */}
          <Search
              className='landing-button-style'
              category
              // loading={isLoading}
              onResultSelect={this.handleResultSelect}
              // onSearchChange={_.debounce(this.handleSearchChange, 500, {
              //   leading: true,
              // })}
              // results={results}
              // value={value}
          />
        </div>
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
