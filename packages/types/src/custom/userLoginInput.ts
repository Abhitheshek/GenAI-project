import { z } from "zod";

export const UserLoginInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type TUserLoginInput = z.infer<typeof UserLoginInput>;
