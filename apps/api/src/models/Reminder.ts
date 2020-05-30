import * as mongoose from 'mongoose';

// const ObjectId = Schema.Types.ObjectId;
 
const Reminder = mongoose.model<ReminderDoc>('Reminder', new mongoose.Schema({
  title: { type: String },
  body: { type: String },
  cron: { type: String }
}));

export interface ReminderDoc extends mongoose.Document {
  title: { type: String },
  body: { type: String },
  cron: { type: String }
}

export default Reminder;
