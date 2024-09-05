import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { Project, ProjectSchema } from "./types";
import { z } from "zod";  

const app = new Hono();

const projects: Project[] = [];

app.use("/*", cors());

app.use("/statics/*", serveStatic({ root: "./" }));

app.get("/json", async (c) => {
  return c.json(projects);
});

app.post("/add", async (c) => {
  try {
    const newProject = await c.req.json();
    console.log("Received project data:", newProject);

    
    const id = projects.length > 0 ? Number(projects[projects.length - 1].id) + 1 : 1;

    
    const projectWithId = { id, ...newProject };

    
    const project = ProjectSchema.parse(projectWithId);

    
    projects.push(project);

    
    return c.json<Project[]>(projects, { status: 201 });
  } catch (error) {
    console.error("Error in /add route:", error);

    if (error instanceof z.ZodError) {
      return c.json({ error: "Validation failed", details: error.errors }, { status: 400 });
    }

    return c.json({ error: "Internal Server Error" }, { status: 500 });
  }
});

const port = 4001;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});