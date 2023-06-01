import subjectRequestBody from "../models/SubjectBody";
import { prisma } from "../db/prisma";

const create = async (body: subjectRequestBody, userId: number) =>
  prisma.subject.create({
    data: {
      name: body.name,
      teacher: body.teacher,
      grade: body.grade,
      userId: userId,
    },
  });

const findByUserId = async (userId: number) =>
  prisma.subject.findMany({ where: { userId: userId } });

export default { create, findByUserId };
