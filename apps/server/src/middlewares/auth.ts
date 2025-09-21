import { ErrorStatusCodes } from "@workspace/constants";
import { AuthenticatedRequest } from "@workspace/types";
import { httpError, logger } from "@workspace/utils";
import { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return httpError(
      next,
      new Error("Unauthorized"),
      req,
      ErrorStatusCodes.CLIENT_ERROR.UNAUTHORIZED
    );
  }

  const token = authHeader.split(" ")[1];

  getAuth()
    .verifyIdToken(token as string)
    .then((decodedToken) => {
      (req as AuthenticatedRequest).user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        role: decodedToken.role,
      };
      next();
    })
    .catch((error) => {
      logger.error("Error verifying token", {
        meta: error,
      });
      return httpError(
        next,
        new Error("Invalid token"),
        req,
        ErrorStatusCodes.CLIENT_ERROR.UNAUTHORIZED
      );
    });
}
