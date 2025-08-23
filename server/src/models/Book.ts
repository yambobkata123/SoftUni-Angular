import mongoose, { Schema, InferSchemaType } from 'mongoose';

const bookSchema = new Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  imageUrl: { type: String, required: true, trim: true },
  likes: { type: [String], default: [] },
  creatorId: { type: String, required: true }
}, { timestamps: true });

export type BookDocument = InferSchemaType<typeof bookSchema> & { _id: mongoose.Types.ObjectId };

export default mongoose.model('Book', bookSchema);

