// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const { userLogin, userPassword } = req.body;
    const users: UserData[] = await (await fetch('https://fakestoreapi.com/users')).json()

    const queryResult = users.filter(({ username, password }: UserData) =>
      username === userLogin && password === userPassword
    )

    res.status(200).json(queryResult);
  }
}
