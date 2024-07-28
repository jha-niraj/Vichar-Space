import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from "hono/jwt";
import bcrypt from "bcryptjs";
import { cors } from "hono/cors";

// Router to clean up the routing:
import { userRouter } from "./routes/userRoutes";
import { postRouter } from "./routes/postRoutes";

// Initialize a new Hono instance:
// Initialize the Prisma with the Accelerate for faster query fetches:
const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

// For checking purpose:
app.get("/", (c) => {
    return c.text("Hello");
})
app.use("/*", cors());

// One thing to notice is that you cannot initialize an prisma outside the route as it need an access to
// the env variables which is not supported in the Cloudflares workers.
// We can only access it using the c variable that we get in every request in the route itself.
// The solution is:
// 1. You can initialize the prisma in each route.
// 2. Or you can create seperate file for initializing the prisma and then call it in the every route which will initialize an prisma.

// Making the routing structure better:
app.route("api/v1/user", userRouter);
app.route("api/v1/post", postRouter);

export default app;
