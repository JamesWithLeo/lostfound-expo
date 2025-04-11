import { z } from "zod";
import { CATEGORIES } from "./Categories";

export const postSearchSchema = z.object({
  itemName: z
    .string()
    .min(2, "Item name must be at least 2 characters long")
    .max(256),
  color: z.string().min(2).max(256).optional(),
  brandModel: z.string().min(2).max(256).optional(),
  location: z
    .string()
    .min(2)
    .max(256)
    .regex(/^[a-zA-Z0-9\s,.-]*$/, "Invalid location format"),
  timeDate: z.coerce
    .date()
    .max(new Date(), { message: "Date and time must not be in the future" }),
  category: z.enum(["unknown", ...CATEGORIES]),
  caption: z
    .string()
    .min(5, "Caption must be at least 5 characters long")
    .max(256),
  desc: z.string().optional(),
});
