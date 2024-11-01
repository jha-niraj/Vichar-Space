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

// Sending an random 5 blog post without doing any authentication to show on the HomePage:
// app.get("/randomposts", async(c) => {
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env.DATABASE_URL,
//     }).$extends(withAccelerate());

//     try {
//         const posts = await prisma.post.findMany(); // Fetch all posts
//         const shuffledPosts = posts.sort(() => 0.5 - Math.random()); // Shuffle the posts
//         const randomPosts = shuffledPosts.slice(0, 5); // Select 5 random posts
//         return randomPosts;
//     } catch (err: any) {
//         console.log("Error while sending an random 5 posts");
//     }
// })

app.get("api/v1/posts/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.post.findMany({
            select: {
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            },
        });
        if (!posts) {
            console.log("Failed to fetch all the blogs");
            c.status(501);
            return c.json({
                msg: "Failed to fetch all blogs"
            })
        } else {
            c.status(200);
            return c.json({
                posts
            })
        }
    } catch (err: any) {
        console.log("Failed to get the blogs: " + err);
        c.status(501);
        c.json({
            msg: "Failed to get all the blogs"
        })
    }
})

export default app;
