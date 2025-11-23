import { Schema, model, } from 'mongoose';

const CommentSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true, index: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    text: { type: String, required: true, trim: true },
    parent: { type: Schema.Types.ObjectId, ref: 'Comment', default: null, index: true }, 
    likesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Common queries: top-level comments for a post newest-first
CommentSchema.index({ post: 1, parent: 1, createdAt: -1 });

export const CommentModel = model('Comment', CommentSchema);
export default CommentModel;