import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const enrollSchema = z.object({
  id: z.string(),
  userId: z.object({
    UserInformation: z.array(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
      })
    ),
    username: z.string(),
    email: z.string(),
    phoneNumber: z.string().optional(),
  }),
  examId: z.object({
    nameEn: z.string().optional(),
    nameAr: z.string().optional(),
  }),
  status: z.enum(["active", "inactive", "invited", "suspended"]),
  role: z.enum(["superadmin", "admin", "user", "manager"]),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  lastLogin: z.coerce.date().optional(),
  isActivate: z.boolean().optional(),
});

export type enroll = z.infer<typeof enrollSchema>;
