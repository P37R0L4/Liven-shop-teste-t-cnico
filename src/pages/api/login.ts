// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const userLogin = [
  {
    email: "John@gmail.com",
    username: "johnd",
    password: "m38rmF$",
    name: {
      firstname: "John",
      lastname: "Doe",
    },
    address: {
      city: "kilcoole",
      street: "7835 new road",
      number: 3,
      zipcode: "12926-3874",
      geolocation: {
        lat: "-37.3159",
        long: "81.1496",
      },
    },
    phone: "1-570-236-7033",
  },
  {
    email: "deen@gmail.com",
    username: "deend",
    password: "m38rmF$",
    name: {
      firstname: "deen",
      lastname: "Dan",
    },
    address: {
      city: "kilcoole",
      street: "7835 new road",
      number: 3,
      zipcode: "12926-3874",
      geolocation: {
        lat: "-37.3159",
        long: "81.1496",
      },
    },
    phone: "1-570-236-7033",
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    res.status(200).json({ username, password });
  }
}
