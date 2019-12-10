import React from 'react';
import { Card, Button, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Submits } from '../../api/submit/Submits';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RestaurantAdmin extends React.Component {

  handleClick = () => Submits.remove(this.props.submit._id);

  render() {
    return (
        <Card centered>
          <Card.Content>
            <Image
                size='medium'
                src={this.props.submit.logo}/>
            <Card.Header>
              {this.props.submit.submissionName}</Card.Header>
            <Card.Meta>{this.props.submit.submittedBy}</Card.Meta>
            <Card.Description>
              Location: {this.props.submit.location} <br />
              Hours: {this.props.submit.hours} <br />
              Menu: {this.props.submit.menu} <br />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {this.props.submit.submittedAt}
          </Card.Content>
          <Card.Content>
            <Button animated>
              <Button.Content visible>
              <Icon name='trash alternate' />
            </Button.Content>
              <Button.Content hidden onClick={this.handleClick}>Delete</Button.Content>
            </Button>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
RestaurantAdmin.propTypes = {
  submit: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(RestaurantAdmin);
