import { Request, Response, NextFunction } from "express";
import { asyncErrorHandler, httpError, httpResponse } from "@workspace/utils";
import { ErrorStatusCodes, SuccessStatusCodes } from "@workspace/constants";
import { UserLoginInput, UserRegistrationInput } from "@workspace/types";
import { getAuth } from "firebase-admin/auth";
import { userService } from "../service/userService";
import { AuthenticatedRequest } from "@workspace/types";
import { AppConfig } from "../config";

export default {
  register: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const body = req.body;
      const safeParse = UserRegistrationInput.safeParse(body);

      if (!safeParse.success) {
        return httpError(
          next,
          new Error("Invalid input"),
          req,
          ErrorStatusCodes.CLIENT_ERROR.BAD_REQUEST,
          safeParse.error.flatten()
        );
      }

      const { email, name, role, password, preferredLanguage } = safeParse.data;

      const userRecord = await getAuth().createUser({
        email,
        password,
        displayName: name,
      });

      await getAuth().setCustomUserClaims(userRecord.uid, { role });

      await userService.createOrUpdateUser(userRecord.uid, {
        uid: userRecord.uid,
        email,
        name,
        role,
        preferredLanguage,
      });

      httpResponse(
        req,
        res,
        SuccessStatusCodes.OK,
        "User Created Successfully"
      );
    }
  ),

  login: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const body = req.body;
      const safeParse = UserLoginInput.safeParse(body);

      if (!safeParse.success) {
        return httpError(
          next,
          new Error("Invalid input"),
          req,
          ErrorStatusCodes.CLIENT_ERROR.BAD_REQUEST,
          safeParse.error.flatten()
        );
      }

      const { email, password } = safeParse.data;

      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${AppConfig.get("FIREBASE_API_KEY")}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, returnSecureToken: true }),
        }
      );

      const data = await response.json();

      //@ts-ignore
      if (data.error) {
        return httpError(
          next,
          //@ts-ignore
          new Error(data?.error?.message),
          req,
          ErrorStatusCodes.CLIENT_ERROR.UNAUTHORIZED
        );
      }

      httpResponse(req, res, SuccessStatusCodes.OK, "Login Successful", data);
    }
  ),

  currentUser: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = (req as AuthenticatedRequest).user;
      const userData = await userService.getUserById(user?.uid as string);
      if (!userData) {
        return httpError(
          next,
          new Error("User not found"),
          req,
          ErrorStatusCodes.CLIENT_ERROR.NOT_FOUND
        );
      }
      httpResponse(
        req,
        res,
        SuccessStatusCodes.OK,
        "User Retrieved Successfully",
        userData
      );
    }
  ),
};
