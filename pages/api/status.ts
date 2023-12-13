import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '@/utils/mongodb/connect';
import { ResultModel } from '@/utils/mongodb/model';

import { ReturnMessage } from '@/utils/types';

const getStatus = async () => {
  const resultCounts: any = await ResultModel.aggregate([
    {
      $match: {
        $or: [
          { type: 'red', answer: 'yes' },
          { type: 'red', answer: 'no' },
          { type: 'black', answer: 'yes' },
          { type: 'black', answer: 'no' },
        ],
      },
    },
    {
      $group: {
        _id: {
          type: '$type',
          answer: '$answer',
        },
        count: { $sum: 1 },
      },
    },
  ]).exec();

  // console.log(resultCounts[0]);

  const returnString = resultCounts
    .map((item: any) => `${item._id.type} - ${item._id.answer}: ${item.count}`)
    .join('\n');

  return returnString;
};

const getMethodHandler = async (req: NextApiRequest, res: NextApiResponse<ReturnMessage>) => {
  await connectDB();

  // Get current answer count and convert it to state
  const state = await getStatus();

  res.status(200).json({ code: 200, message: state });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ReturnMessage>) {
  if (req.method != 'GET') res.status(405).json({ code: 405, message: 'Method not allow' });

  await getMethodHandler(req, res);
}
