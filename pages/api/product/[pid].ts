import type { NextApiRequest, NextApiResponse } from 'next';
import useBlogger from "../../../wino/core.js";
// fake data
//import products from '../../../utils/data/products';

export default async(req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { pid },
  }:any = req
  const variables: any = {
    price: "number",
    discount: "number",
    quantityAvailable: "number",
    currentPrice: "number",
    sizes: "array",
    colors: "array",
  };
  //

  //
  const usb = new useBlogger();
  usb.post(pid)
  const data = await usb.load(variables);
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
