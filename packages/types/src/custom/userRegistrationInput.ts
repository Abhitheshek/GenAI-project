import { z } from "zod";

export const UserRegistrationInput = z.object({
  role: z.enum(["artisan", "buyer"]),
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8),
  preferredLanguage: z.enum([
    "hi",
    "en",
    "bn",
    "te",
    "mr",
    "ta",
    "ur",
    "gu",
    "kn",
    "ml",
    "or",
    "pa",
    "as",
    "ks",
    "kok",
    "mai",
    "ne",
    "sd",
    "si",
    "sa",
    "bo",
    "doi",
    "mni",
  ]),
});

export type TUserRegistrationInput = z.infer<typeof UserRegistrationInput>;
