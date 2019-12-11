import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Reports = new Mongo.Collection('Reports');

/** Define a schema to specify the structure of each document in the collection. */
const ReportSchema = new SimpleSchema({
  title: String,
  description: String,
  reviewId: String,
  reporter: String,
  createdAt: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Reports.attachSchema(ReportSchema);

/** Make the collection and schema available to other code. */
export { Reports, ReportSchema };
