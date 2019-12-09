import React from 'react';
import { Header } from 'semantic-ui-react';

class Info2 extends React.Component {
  render() {
    return (
        <div className='landing-info'>
          <Header as='h2'>Don&apos;t see what you&apos;re looking for? Login and add it to our list!<br/></Header>
          <Header as='h2'>Click here to login!<br/>
          </Header>
        </div>
    );
  }
}

export default Info2;