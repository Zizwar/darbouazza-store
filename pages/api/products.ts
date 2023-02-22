import type { NextApiRequest, NextApiResponse } from 'next';
import useBlogger from "../../wino/";
// fake data


export default async (_req: NextApiRequest, res: NextApiResponse) => {
 // console.log(req);
 const data = await useBlogger();
  res.json(data);

   /*
  const data:any = await useBlogger([]);
  console.log("==");
 
  res.json(data);
  */
}
