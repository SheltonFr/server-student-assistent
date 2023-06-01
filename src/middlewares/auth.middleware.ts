import "dotenv/config";
import Jwt, { JwtPayload } from "jsonwebtoken";
import userService from "../services/user.service";
import { Request, Response, NextFunction } from "express";



interface CustomJwtPayload extends JwtPayload {
  id: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.sendStatus(401);
    }

    const authParts = authorization.split(" ");
    if (authParts.length !== 2) return res.sendStatus(401);

    const [schema, token] = authParts;

    if (schema !== "Bearer") return res.sendStatus(401);

    Jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Invalid Token" });
      }

      const decodedId: number = parseInt((decoded as CustomJwtPayload).id);
      const user = await userService.findById(decodedId);
      if (!user) return res.status(401).send({ message: "Invalid Token" });

      req.userId =  user.id.toString();

      next();
    });
  } catch (err) {
    return res.sendStatus(500).send({ message: "An error occurred!" });
  }
};
