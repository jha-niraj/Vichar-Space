import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import bcrypt from "bcryptjs";

// Importing the Zod type Schema for checking the types of the data:
import { signUpZodSchema, signInZodSchema } from '../zod';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>

userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const { name, email, password } = await c.req.json();

    try {
        const parsedValue = signUpZodSchema.safeParse({ name, email, password });
        if (!parsedValue.success) {
            c.status(501);
            return c.json({
                msg: "Please enter the supported data types"
            })
        } else {
            const existingUser = await prisma.user.findUnique({
                where: {
                    email
                }
            });
            if (!existingUser) {
                c.status(503);
                return c.json({
                    msg: "User already exist with this email!!!"
                })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = await prisma.user.create({
                    data: {
                        name,
                        email,
                        password: hashedPassword
                    }
                })
                if (newUser) {
                    const jwt = await sign({ id: newUser.id }, c.env.JWT_SECRET);
                    c.status(200);
                    return c.json({
                        msg: "User SignUp Successfull",
                        jwt_token: jwt
                    })
                } else {
                    c.status(503);
                    return c.json({
                        msg: "Error while SignUp!!!"
                    })
                }
            }
        }
    } catch (err) {
        c.status(403);
        return c.json({
            error: "Error while signing up"
        })
    }
})

userRouter.post("api/v1/user/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const { email, password } = await c.req.json();

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            c.status(403);
            return c.json({ error: "Invalid Credentials" })
        } else {
            const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
            return c.json({
                jwt
            })
        }
    } catch (err: any) {
        c.status(403);
        return c.json({ error: "Error while signin" });
    }
})
