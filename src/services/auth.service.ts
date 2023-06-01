import Jwt from "jsonwebtoken";
import { prisma } from "../db/prisma";

const findByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email: email } });

const generateToken = (id: number) =>
  Jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 });

export { generateToken, findByEmail };
