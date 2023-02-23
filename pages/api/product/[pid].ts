import type { NextApiRequest, NextApiResponse } from 'next';
import useBlogger from "../../../wino/";
// fake data
//import products from '../../../utils/data/products';

export default async(req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { pid },
  } = req
  const usb = new useBlogger({}); 
  const data = await usb.get({postId:pid});
   res.json(data);
  /*
  const cb = (data: any) => {
    console.info({data})
    res.json(data);
  };
  useBlogger(cb,{postId:pid});
  //const product = products.find(x => x.id === pid);
  //res.status(200).json(product);
  */
}
