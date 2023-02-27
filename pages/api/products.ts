import type { NextApiRequest, NextApiResponse } from "next";
import useBlogger from "../../wino/";
// fake data

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  // console.log(req);

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

  const data = await usb.load(variables);
  res.json(data);
  /*
  const data:any = await useBlogger([]);
  console.log("==");
 
  res.json(data);
  */
};
