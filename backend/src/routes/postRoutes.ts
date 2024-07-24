import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const postRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>

// Creating an middleware to authnticate anytime request came to any of the Post Routes:
postRouter.use("/*", async (c, next) => {
    await next();
})

// Routes to Upload the Blog and Update the Blog:
interface createPostProps {
    title: string,
    content: string,
    userId: number
}
postRouter.post("/blog", async (c) => {
    const userId = c.get("userId");

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try {
        const newPost = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })
        if(!newPost) {
            c.status(501);
            return c.json({
                msg: "Failed to create new post!!!"
            })
        } else {
            return c.json({
                id: newPost.id
            })
        }
    } catch(err: any) {
        console.log("Error occurred while creating Post: " + err);
        c.status(511);
        return c.json({
            msg: "Error while creating post!!!"
        })
    }
})
postRouter.put("/blog/:id", async (c) => {

})

// Routes to get all the blogs and the particular blog with id:
postRouter.get("/blog/:id", async (c) => {

})
postRouter.get("/blog/bulk", async (c) => {

})
