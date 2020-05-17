import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field


// create PostModel class from schema
const PostSchema = new Schema({
  title: String,
  tags: String,
  content: String,
  coverUrl: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

// , {
//   toObject: { virtuals: true },
//   toJSON: { virtuals: true },
// }

// create model class
const PostModel = mongoose.model('Post', PostSchema, 'posts');

export default PostModel;
