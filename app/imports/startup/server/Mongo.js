import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Restaurants } from '../../api/restaurant/Restaurants';
import { Submits } from '../../api/submit/Submits';
import { Reviews } from '../../api/review/Reviews';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.insert(data);
}


/** Initialize the collection if empty. */
if (Stuffs.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

function addRestaurant(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Restaurants.insert(data);
}

/** Initialize the collection if empty. */
if (Restaurants.find().count() === 0) {
  if (Meteor.settings.defaultRestaurants) {
    console.log('Creating default data.');
    Meteor.settings.defaultRestaurants.map(data => addRestaurant(data));
  }
}

function addSubmits(data) {
  console.log(`  Adding: ${data.submissionName} (${data.submittedBy})`);
  Submits.insert(data);
}

/** Initialize the collection if empty. */
if (Submits.find().count() === 0) {
  if (Meteor.settings.defaultSubmits) {
    console.log('Creating default submissions.');
    Meteor.settings.defaultSubmits.map(data => addSubmits(data));
  }
}

function addReviews(data) {
  console.log(`  Adding: ${data.title} (${data.owner})`);
  Reviews.insert(data);
}

/** Initialize the collection if empty. */
if (Reviews.find().count() === 0) {
  if (Meteor.settings.defaultReviews) {
    console.log('Creating default reviews.');
    Meteor.settings.defaultReviews.map(data => addReviews(data));
  }
}
