import type { NextApiRequest, NextApiResponse } from "next";

// fake data
import useBlogger from "../../wino/";

export default (_req: NextApiRequest, res: NextApiResponse) => {
  // fake loading time
  const cb = (data: any) => {
    res.json(data);
  };
  useBlogger(cb);
};
