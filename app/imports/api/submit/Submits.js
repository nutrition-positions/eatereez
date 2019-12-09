import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Submits = new Mongo.Collection('Submits');

/** Define a schema to specify the structure of each document in the collection. */
const SubmitSchema = new SimpleSchema({
  submissionName: String,
  address: String,
  phoneNumber: String,
  hours: String,
  menu: String,
  description: String,
  website: String,
  logo: String,
  submittedBy: String,
  submittedAt: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Submits.attachSchema(SubmitSchema);

/** Make the collection and schema available to other code. */
export { Submits, SubmitSchema };
