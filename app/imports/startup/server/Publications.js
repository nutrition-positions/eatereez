import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Restaurants } from '../../api/restaurant/Restaurants';
import { Submits } from '../../api/submit/Submits';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Stuff', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('StuffAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.find();
  }
  return this.ready();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Restaurant', function publish() {
  return Restaurants.find();
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('RestaurantAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Restaurants.find();
  }
  return this.ready();
});

Meteor.publish('Submits', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Submits.find({ submittedBy: username });
  }
  return this.ready();
});

Meteor.publish('SubmitsAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Submits.find();
  }
  return this.ready();
});
