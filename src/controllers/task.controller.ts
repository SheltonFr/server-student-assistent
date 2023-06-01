import { Request, Response } from "express";
import z, { ZodError } from "zod";
import taskService from "../services/task.service";

const create = async (req: Request, res: Response) => {
  const TaskSchema = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    deadline: z.string().datetime(),
    subject: z.number().nonnegative(),
  });

  const userId = parseInt(req.userId as string);

  try {
    const { title, deadline, description, subject } = TaskSchema.parse(
      req.body
    );
    const task = await taskService.create(
      { title, deadline, description, subject },
      userId
    );

    if (!task) {
      return res
        .status(400)
        .send({ message: "An error occurred while creating Task!" });
    }

    return res.status(201).send({ task });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send({ error: error.message });
    }

    return res.sendStatus(500);
  }
};

const findByUserId = async (req: Request, res: Response) => {
  const userId = parseInt(req.userId as string);

  try {
    const tasks = await taskService.findByUserId(userId);
    return res.status(200).send({ tasks });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const findById = async (req: Request, res: Response) => {
  const userId = parseInt(req.userId as string);
  const taskId = parseInt(req.params.id);

  try {
    const task = await taskService.findOne(taskId);

    if (!task) {
      return res.status(404).send({ message: "Task not found!" });
    }

    return res.send({ task });
  } catch (error) {
    return res.sendStatus(500);
  }
};
export default { create, findByUserId, findById };
