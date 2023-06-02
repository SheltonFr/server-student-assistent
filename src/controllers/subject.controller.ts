import { Request, Response } from "express";
import z, { ZodError } from "zod";
import subjectService from "../services/subject.service";

const create = async (req: Request, res: Response) => {
  const userId = parseInt(req.userId as string);
  console.log("Create User Route called...");

  const subjectSchema = z.object({
    name: z.string().nonempty(),
    teacher: z.string().nonempty(),
    grade: z.number().nonnegative(),
  });

  try {
    const { name, grade, teacher } = subjectSchema.parse(req.body);
    const subject = await subjectService.create(
      { name, grade, teacher },
      userId
    );

    if (!subject) {
      return res.status(400).send({ message: "An error occurred!" });
    }

    return res.status(201).send(subject);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send(error.message);
    }

    return res.sendStatus(500);
  }
};

const findByUserId = async (req: Request, res: Response) => {
  const userId = parseInt(req.userId as string);
  

  try {
    const subjects = await subjectService.findByUserId(userId);

    return res.status(200).send( subjects );
  } catch (error) {
    return res.sendStatus(500);
  }
};

export { create, findByUserId };
