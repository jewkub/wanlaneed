import * as mongoose from 'mongoose';

// const ObjectId = Schema.Types.ObjectId;
 
const Reminder = mongoose.model('Reminder', new mongoose.Schema({
  title: { type: String },
  body: { type: String },
  cron: { type: String }
}));

export default Reminder;