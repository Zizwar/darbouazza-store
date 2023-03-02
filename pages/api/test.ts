import type { NextApiRequest, NextApiResponse } from "next";

// fake data
import UseBlogger from "../../wino-blogger";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
 const usb = new UseBlogger({}); 
 const data = await usb.get({});
  res.json(data);
};
