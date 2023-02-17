import type { NextApiRequest, NextApiResponse } from 'next';
import useBlogger from "../../wino/";
// fake data


export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req);

  const cb = (data: any) => {
    res.json(data);
  };
  useBlogger(cb);
}
