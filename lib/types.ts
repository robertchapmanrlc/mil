import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Please add a name"),
});

export type formSchemaType = z.infer<typeof formSchema>;
