import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '@/utils/mongodb/connect';
import { ResultModel } from '@/utils/mongodb/model';

import { Result, ReturnMessage } from '@/utils/types';

const submitResult = async (type: string, answer: string) => {
  const resultData: Result = {
    type: type,
    answer: answer,
  };

  const newResult = new ResultModel(resultData);

  await newResult.save().then((result: Result) => console.log('Saved new result: ' + result));
};

const postMethodHandler = async (req: NextApiRequest, res: NextApiResponse<ReturnMessage>) => {
  if (!req.body.type || !req.body.answer)
    res.status(400).json({ code: 400, message: 'Malformed request syntax' });

  await connectDB();

  // Update result in db
  await submitResult(req.body.type, req.body.answer);

  res.status(200).json({ code: 200, message: 'Success' });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ReturnMessage>) {
  if (req.method != 'POST') res.status(405).json({ code: 405, message: 'Method not allow' });

  await postMethodHandler(req, res);
}
