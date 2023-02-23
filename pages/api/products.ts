import type { NextApiRequest, NextApiResponse } from 'next';
import useBlogger from "../../wino/";
// fake data


export default async (_req: NextApiRequest, res: NextApiResponse) => {
 // console.log(req);
 const usb = new useBlogger({}); 
 const data = await usb.get({});
 res.json(data);
   /*
  const data:any = await useBlogger([]);
  console.log("==");
 
  res.json(data);
  */
}
