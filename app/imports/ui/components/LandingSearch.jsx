import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { Restaurants } from '../../api/restaurant/Restaurants';


class LandingSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchName: '',
      toDir: false,
      dir: '',
    };
  }

  updateSearchName(event) {
    this.setState({ searchName: event.target.value });
  }

  getRestaruantList() {
    const list = [];
    if (NavLink === 'undefined') {
      return list;
    }
    this.props.restaurants.forEach((item) => list.push({ key: item.name, text: item.name, value: item.name,
      as: NavLink, to: `/details/${item._id}` }));
    return list;
  }

  onChangeFunc(value, text) {
    console.log(`text.value = ${text.value}`);
    const list = this.props.restaurants;
    for (let i = 0; i < list.length; i++) {
      console.log(`list[i].name = ${list[i].name}`);
      if (text.value === list[i].name) {
        // return <Redirect to= {`/details/${list[i]._id}`} />;
        this.setState = { toDir: true, dir: `/details/${list[i]._id}` };
        return <Redirect to={{ pathname: `/details/${list[i]._id}` /* state: { from: location } */ }}/>;
      }
    }
    return '';
  }

  render() {
    const buttonStyle = { width: '260px' };

    const handleSearchChange = (event) => {
      this.setState({ searchName: event.target.value });
      // console.log(`${event.target.value}`);
    };
    const handleonChange = (value, text) => {
      const dir = this.onChangeFunc(value, text);
      console.log(dir);
      return dir;
    };

    return (
        <div>
          {/* {this.state.toDir ? <Redirect to={{ pathname: this.state.dir }} /> : ''} */}
          {this.state.toDir ? console.log(this.state.dir) : ''}
          <Dropdown
              placeholder='Search...'
              search
              selection
              style={buttonStyle}
              options={this.getRestaruantList()}
              onSearchChange={handleSearchChange}
              onChange={handleonChange}
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
