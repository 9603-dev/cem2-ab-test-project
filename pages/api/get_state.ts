import type { NextApiRequest, NextApiResponse } from "next";

import connectDB from "@/utils/mongodb/connect";
import { ResultModel } from "@/utils/mongodb/model";

import { ReturnMessage } from "@/utils/types";

const getState = async () => {
  const resultCount: any = await ResultModel.aggregate([{ $count: "count" }], {
    maxTimeMS: 60000,
    allowDiskUse: true,
  }).exec();

  // console.log(resultCount);

  return resultCount[0] ? resultCount[0].count % 2 : 0;
};

const getMethodHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ReturnMessage>
) => {
  await connectDB();

  // Get current answer count and convert it to state
  const state = await getState();

  res.status(200).json({ code: 200, message: String(state) });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReturnMessage>
) {
  if (req.method != "GET")
    res.status(405).json({ code: 405, message: "Method not allow" });

  await getMethodHandler(req, res);
}
