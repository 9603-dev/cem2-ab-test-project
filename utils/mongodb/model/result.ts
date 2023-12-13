import mongoose, { Schema } from 'mongoose';
import { Result } from '@/utils/types';

interface ResultDoc extends mongoose.Document, Result {}

interface resultModelInterface extends mongoose.Model<any> {
  build(attr: Result): ResultDoc;
}

const resultSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'result',
    timestamps: { createdAt: false, updatedAt: false },
  }
);

export default mongoose.models.ResultModel ||
  mongoose.model<ResultDoc, resultModelInterface>('ResultModel', resultSchema);
