import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"] as string;
    if (!authHeader) {
      console.log("No auth header");
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, "chaima-secret");
      req["userId"] = decoded["userId"];
      console.log("decoded", decoded);
      const user = await this.userService.findOne(decoded["userId"]);
      if (!user) throw new NotFoundException("User was not found");
      console.log("user", user);
      req["user"] = user;
      next();
    } catch (e) {
      console.log("Invalid token");
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
}
