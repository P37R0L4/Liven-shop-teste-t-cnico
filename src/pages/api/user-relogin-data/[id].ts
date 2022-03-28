// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserData>
) {
  const { id } = req.query
  const response = await (await fetch('https://fakestoreapi.com/users')).json()
  const obj = response.filter((item: UserData) => item.id.toString() === id);
  res.status(200).json(obj);

}
