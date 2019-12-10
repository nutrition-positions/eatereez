import React from 'react';
import { Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Info2 extends React.Component {
  render() {
    return (
        <div className='landing-info2'>
          <Header as='h2'>Don&apos;t see what you&apos;re looking for? Login and add it to our list!<br/></Header>
          <Header as='h2'><Link exact to='/signin'>Click here to login!</Link>
          </Header>
        </div>
    );
  }
}

export default Info2;