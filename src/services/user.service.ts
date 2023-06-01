import { prisma } from "../db/prisma";
import bcrypt from "bcrypt";
import userRequestBody from "../models/UserBody";

const create = async (body: userRequestBody) => {
  const hasdPassword = await bcrypt.hash(body.password, 10);
  return prisma.user.create({
    data: {
      email: body.email,
      password: hasdPassword,
      username: body.username,
    },
  });
};

const findAll = () => prisma.user.findMany();

const findById = (id: number) => prisma.user.findUnique({ where: { id: id } });

export default { create, findAll, findById };
