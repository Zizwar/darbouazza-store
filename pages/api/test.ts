import type { NextApiRequest, NextApiResponse } from "next";

// fake data
import UseBlogger from "../../23wino-blogger/esmindex";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
 const usb = new UseBlogger({}); 
 const data = await usb.get({});
  res.json(data);
};
