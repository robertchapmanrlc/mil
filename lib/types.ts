import { z } from "zod";

export const createCourseFormSchema = z.object({
  name: z.string().min(1, "Please add a name"),
});

export type createCourseFormSchemaType = z.infer<typeof createCourseFormSchema>;

export const editCourseDescriptionFormSchema = z.object({
  description: z.string().min(10, "Description must be longer than 10 character")
});

export type editCourseDescriptionFormSchemaType = z.infer<typeof editCourseDescriptionFormSchema>;