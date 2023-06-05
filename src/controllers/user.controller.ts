import { Request, Response, response } from "express";
import z from "zod";
import userService from "../services/user.service";
import { User } from "@prisma/client";
import { prisma } from "../db/prisma";
import { generateToken } from "../services/auth.service";

const create = async (req: Request, res: Response) => {
  const userSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    username: z.string(),
  });
  try {
    const { username, email, password } = userSchema.parse(req.body);

    if (!username || !email || !password) {
      return res
        .status(400)
        .send({ message: "Submit all fields to registration" });
    }

    const user = await userService.create({ username, email, password });

    // so será executado , depois da resposta de criacao do user
    if (!user) {
      return res.status(400).send({ message: "Error creating user" });
    }
    const token = generateToken(user.id);
    console.log(token)
    res.status(201).send({ token });
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: "Server eror" });
  }
};

const findById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id as string);

  try {
    const user = await prisma.user.findUnique({ where: { id: id } });

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.status(200).send({
      user: {
        email: user.email,
        id: user.id,
        username: user.username,
      } as User,
    });
  } catch (eror) {
    return res.status(500).send({ message: "Server eror" });
  }
};

export default { create, findById };