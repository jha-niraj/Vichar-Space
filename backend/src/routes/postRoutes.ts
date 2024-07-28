import { Context, Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createrBlogInput, updateBlogInput } from "@jhaniraj/medium-common-2";

export const postRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

// Creating an middleware to authnticate anytime request came to any of the Post Routes:
postRouter.use("/*", async (c, next) => {
    const jwt = c.req.header("Authorization");

    if (!jwt) {
        c.status(403);
        return c.json({
            msg: "Authorization Required"
        })
    }

    try {
        const user = await verify(jwt, c.env.JWT_SECRET);

        if (!user) {
            c.status(501);
            return c.json({
                msg: "Unauthorized!!!"
            })
        }

        c.set('jwtPayload', user.id);
        await next();
    } catch (err: any) {
        c.status(403);
        return c.json({
            msg: "Unauthorized"
        })
    }
})

// Routes to Upload the Blog and Update the Blog:
postRouter.post("/", async (c) => {
    const userId = c.get("jwtPayload");

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try {
        const parsedValue = createrBlogInput.safeParse(body);
        if (!parsedValue.success) {
            c.status(501);
            return c.json({
                msg: "Please enter the supported data types"
            })
        } else {
            const newPost = await prisma.post.create({
                data: {
                    title: body.title,
                    content: body.content,
                    authorId: Number(userId)
                }
            })
            if (!newPost) {
                c.status(501);
                return c.json({
                    msg: "Failed to create new post!!!"
                })
            } else {
                return c.json({
                    id: newPost.id,
                    msg: "Post created successfully"
                })
            }
        }
    } catch (err: any) {
        console.log("Error occurred while creating Post: " + err);
        c.status(511);
        return c.json({
            msg: "Error while creating post!!!"
        })
    }
})
postRouter.put("blog/:id", async (c) => {
    const userId = c.get("jwtPayload");
    const postId = c.req.param("id");
    const newPostId = Number(postId);

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const { title, content } = await c.req.json();

        const parsedValue = updateBlogInput.safeParse({ title, content, id: newPostId });
        if (!parsedValue.success) {
            c.status(501);
            return c.json({
                msg: "Please enter the supported data types"
            })
        } else {
            const user = await prisma.user.findUnique({
                where: {
                    id: Number(userId)
                }
            })
            if (!user) {
                console.log("No user found");
                c.status(403);
                return c.json({
                    msg: "No user found"
                })
            } else {
                const response = await prisma.post.update({
                    where: {
                        id: Number(postId)
                    },
                    data: {
                        title: title,
                        content: content
                    }
                })
                if (!response) {
                    c.status(501);
                    return c.json({
                        msg: "Failed to update the post"
                    })
                } else {
                    c.status(200);
                    return c.json({
                        msg: "Post updated successfully"
                    })
                }
            }
        }
    } catch (err: any) {
        console.log("Error while updating the Post: " + err);
        c.status(501);
        return c.json({
            msg: "Error while updating the post!!!"
        })
    }
})

// Routes to get all the blogs and the particular blog with id:
postRouter.get("blog/:id", async (c) => {
    const postId = c.req.param("id");
    console.log(postId);
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: Number(postId)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        if (!post) {
            c.status(501);
            return c.json({
                msg: "Failed to fetch the post"
            })
        } else {
            c.status(200);
            return c.json({
                post
            })
        }
    } catch (err: any) {
        console.log("Error while getting the Post: " + err);
        c.status(501);
        return c.json({
            msg: "Error while getting the post!!!"
        })
    }
})

// After completion of the project, we have add pagination here to make the api efficient
postRouter.get("/bulk", async (c) => {
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
            }
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
