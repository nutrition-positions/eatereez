import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Restaurants = new Mongo.Collection('Restaurants');

/** Define a schema to specify the structure of each document in the collection. */
const RestaurantsSchema = new SimpleSchema({
  name: String,
  description: String,
  rating: String,
  phoneNumber: {
    type: String,
    required: false,
  },
  address: String,
  owner: String,
  logo: String,
  image: {
    type: String,
    required: false,
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Restaurants.attachSchema(RestaurantsSchema);

/** Make the collection and schema available to other code. */
export { Restaurants, RestaurantsSchema };
