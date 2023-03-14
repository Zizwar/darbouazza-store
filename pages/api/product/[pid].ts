import type { NextApiRequest, NextApiResponse } from "next";

import useBlogger from "use-blogger";
//import useBlogger from "../../../23wino-blogger";
// fake data
//import products from '../../../utils/data/products';
  
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { pid },
  }: any = req;
  //
  const variables: any = [
    { key: "price", type: "number", regex: "price*[:=]*(.*?)[;<]" },
    { key: "discount", type: "number" },
    { key: "quantityAvailable", type: "number" },
    { key: "currentPrice", type: "number" },
    { key: "sizes", type: "array" },
    { key: "colors", type: "array" },
  ];
  //

  const blogUrl = process?.env?.URL_GOOGLE_BLOG;
  const blogId = process?.env?.ID_GOOGLE_BLOG;

  const usb = new useBlogger({ blogUrl, blogId });
  usb.post(pid);
  const data = await usb.load(variables);
  console.info({data})
  res.json(data?.data);
  /*
  const cb = (data: any) => {
    console.info({data})
    res.json(data);
  };
  useBlogger(cb,{postId:pid});
  //const product = products.find(x => x.id === pid);
  //res.status(200).json(product);
  */
};
