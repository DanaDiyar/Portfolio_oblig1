import { z } from "zod";


export const ProjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  // /image: z
  //  .instanceof(File)
  //  .refine(file => file.type.startsWith('image/'), {
  //    message: "Filtypen må være et bilde (f.eks. JPEG, PNG).",
  //  })
  //  .refine(file => file.size <= 5 1024 * 1024, {
  //    message: "Bildet må være mindre enn 5MB.",
  //  }),*/
  startDate: z.string(),
  endDate: z.string(),
});


export const ProjectCreateSchema = ProjectSchema.omit({ id: true });


export const ProjectsArraySchema = z.array(ProjectSchema);


export type Project = z.infer<typeof ProjectSchema>;


export type CreateProjects = z.infer<typeof ProjectCreateSchema>;