import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';


class LandingSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchName: '',
      show: 'disabled',
    };
  }

  operation() {
    this.setState({ show: 'active' });
  }

  updateSearch(event) {
    this.setState({ searchName: event.target.value });
  }

  handleClick(e) {
    if (e.key === 'Enter') {
      this.props.history.push({ pathname: '/food', state: this.state.searchName, filterDiet: 'none' });
    }
  }

  handleButton() {
    this.props.history.push({ pathname: '/food', state: this.state.searchName, filterDiet: 'none' });
  }

  render() {
    const buttonStyle = { width: '260px', height: '54px' };
    return (
        <div>
          <Input
              type='text'
              style={buttonStyle}
              size='huge'
              value={this.state.search}
              onChange={this.updateSearch.bind(this)}
              placeholder='Search...'
              onKeyPress={this.handleClick.bind(this)}
              action={{ icon: 'search', onClick: () => this.handleButton() }}
          />
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
LandingSearch.propTypes = {
  history: PropTypes.object.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withRouter(LandingSearch);
