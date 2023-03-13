//import type { NextApiRequest, NextApiResponse } from "next";
import useBlogger from "use-blogger";
// fake data
//import useBlogger from "../../23wino-blogger";

export default async (_req, res) => {
  // console.log(req);

  const variables= [
    { key: "price", type: "number", regex: "price*[:=]*(.*?)[;<]" },
    { key: "discount", type: "number" },
    { key: "quantityAvailable", type: "number" },
    { key: "currentPrice", type: "number" },
    { key: "sizes", type: "array" },
    { key: "colors", type: "array" },
  ];
  //
  const blogUrl= process?.env?.URL_GOOGLE_BLOG;
  const blogId = process?.env?.ID_GOOGLE_BLOG ;

  const wb = new useBlogger({ blogId,blogUrl });
  await wb.exec();
  const data = await wb.setData(wb.data).load(variables);
  console.log(data);
  res.json(data?.data);
  /*
  const data:any = await useBlogger([]);
  console.log("==");
 
  res.json(data);
  */
};
