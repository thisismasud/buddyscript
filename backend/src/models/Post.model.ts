import { Schema, model } from 'mongoose';
const PostSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    text: { type: String, default: '', trim: true },
    imageUrl: { type: String, default: null },
    isPrivate: { type: Boolean, default: false, index: true },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// to query newest-first
PostSchema.index({ createdAt: -1 });

export const PostModel = model('Post', PostSchema);
export default PostModel;