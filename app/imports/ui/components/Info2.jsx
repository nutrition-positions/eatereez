import React from 'react';
import { Header, Grid, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Info2 extends React.Component {
  render() {
    return (
        <div className='landing-info2'>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column textAlign='center'>
                <Icon name='building outline' size='huge' inverted/>
              </Grid.Column>
              <Grid.Column>
                <Header as='h2' inverted>
                  Don&apos;t see what you&apos;re looking for? Login and add it to our list!<br/>
                </Header>
                <Header as='h2' inverted><Link color='light blue' to='/signin'>Click here to login!</Link></Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

export default Info2;
