import { prisma } from "../db/prisma";
import TaskRquestBody from "../models/TaskBody";

const create = async (body: TaskRquestBody, userId: number) => {
  return prisma.task.create({
    data: {
      deadline: new Date(Date.parse(body.deadline)),
      description: body.description,
      title: body.title,
      user: {
        connect: { id: userId },
      },
      subject: {
        connect: { id: body.subject },
      },
    },
  });
};

const findOne = async (id: number) =>
  prisma.task.findUnique({ where: { id: id} });

const findByUserId = async (userId: number) =>
  prisma.task.findMany({ where: { userId: userId }, orderBy: {deadline: "asc"} });

export default { create, findByUserId, findOne };
