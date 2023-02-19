import type { NextApiRequest, NextApiResponse } from 'next';
import useBlogger from "../../wino/";
// fake data


export default (_req: NextApiRequest, res: NextApiResponse) => {
 // console.log(req);

  const cb = (data: any) => {
    res.json(data);
     //console.log('video=',data)
  };
  useBlogger(cb);

   /*
  const data:any = await useBlogger([]);
  console.log("==");
 
  res.json(data);
  */
}
