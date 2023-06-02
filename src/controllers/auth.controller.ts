import bcrypt from "bcrypt";
import { Request, Response } from "express";
import z from "zod";
import { findByEmail, generateToken } from "../services/auth.service";

const login = async (req: Request, res: Response) => {
  const requestSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  try {
    const { email, password } = requestSchema.parse(req.body);
    const user = await findByEmail(email);

    if (!user) {
      return res
        .status(400)
        .send({ message: "Email or password do not match" });
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password);

    if (!isPasswordValid || !user) {
      return res
        .status(400)
        .send({ message: "Email or password do not match" });
    }

    const token = generateToken(user?.id);
    console.log(token)
    res.status(200).send({ token });
  } catch (error) {
    res.sendStatus(500);
  }
};

export { login };
