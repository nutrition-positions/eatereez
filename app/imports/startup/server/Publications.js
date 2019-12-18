import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Restaurants } from '../../api/restaurant/Restaurants';
import { Submits } from '../../api/submit/Submits';
import { Reviews } from '../../api/review/Reviews';
import { Reports } from '../../api/report/Report';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Restaurant', function publish() {
  return Restaurants.find();
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

Meteor.publish('Reviews', function publish() {
  return Reviews.find();
});

Meteor.publish('Reports', function publish() {
  return Reports.find();
});
