import { z } from "zod";

export const createCourseFormSchema = z.object({
  name: z.string().min(1, "Please add a name"),
});

export type createCourseFormSchemaType = z.infer<typeof createCourseFormSchema>;

export const editCourseDescriptionFormSchema = z.object({
  description: z.string().min(10, "Description must be longer than 10 character")
});

export type editCourseDescriptionFormSchemaType = z.infer<typeof editCourseDescriptionFormSchema>;

export const editCourseImageFormSchema = z.object({
  imageUrl: z
    .string()
    .min(1, "Image is required"),
});

export type editCourseImageFormSchemaType = z.infer<typeof editCourseImageFormSchema>;

export const editCourseGenreFormSchema = z.object({
  genreId: z.string().min(1),
});

export type editCourseGenreFormSchemaType = z.infer<
  typeof editCourseGenreFormSchema
>;