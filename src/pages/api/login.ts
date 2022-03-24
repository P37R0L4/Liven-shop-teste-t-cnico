// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const { userLogin, userPassword } = req.body;
    const users: userData[] = await (await fetch('https://fakestoreapi.com/users')).json()
    console.log(users);

    const queryResult = users.filter(({ username, password }: userData) =>
      username === userLogin && password === userPassword
    )

    res.status(200).json(queryResult);
  }
}
