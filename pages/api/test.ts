import type { NextApiRequest, NextApiResponse } from 'next';

// fake data
import useBlogger from '../../wino/';

export default (_req: NextApiRequest, res: NextApiResponse) => {
    useBlogger(res)
  // fake loading time
  setTimeout(() => {
   // res.status(200).json({ok:"ok"});
  }, 800);
}