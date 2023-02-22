import type { NextApiRequest, NextApiResponse } from "next";

// fake data
import useBlogger from "../../wino/";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const data = await useBlogger();
  res.json(data);
};
