import type { NextApiRequest, NextApiResponse } from 'next';
import useBlogger from "../../wino/";
// fake data


export default async(_req: NextApiRequest, res: NextApiResponse) => {
//  console.log(req);
/*
  const cb = (data: any) => {
    res.json(data);
  };
  */
 const data:any = await useBlogger([]);
  console.log("==");
  console.info(data)
  res.json(data);
  
}
