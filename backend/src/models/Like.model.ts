import { Schema, model} from 'mongoose';

const LikeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    targetType: { type: String, enum: ['Post', 'Comment'], required: true, index: true },
    targetId: { type: Schema.Types.ObjectId, required: true, index: true }, 
  },
  { timestamps: { createdAt: true, updatedAt: false } } 
);

// prevent duplicate likes by same user
LikeSchema.index({ user: 1, targetType: 1, targetId: 1 }, { unique: true });

// query index to fetch users who liked a target, and to check if a given user liked it
LikeSchema.index({ targetType: 1, targetId: 1, createdAt: -1 });

export const LikeModel = model('Like', LikeSchema);
export default LikeModel;