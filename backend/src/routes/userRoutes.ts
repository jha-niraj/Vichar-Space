import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import bcrypt from "bcryptjs";

// Importing the Zod type Schema for checking the types of the data from the NPM:
// -> @jhaniraj/medium-common
import { signUpZodSchema, signInZodSchema } from "@jhaniraj/medium-common-2";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

userRouter.post("/signup", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const { name, email, password } = await c.req.json();

        const parsedValue = signUpZodSchema.safeParse({ name, email, password });
        if (!parsedValue.success) {
            c.status(501);
            return c.json({
                error: "Incorrect data types"
            })
        } else {
            const existingUser = await prisma.user.findUnique({
                where: {
                    email
                }
            });
            if(existingUser) {
                c.status(503);
                return c.json({
                    error: "User already exist with this email!!!"
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
                if(newUser) {
                    const jwt = await sign({ id: newUser.id }, c.env.JWT_SECRET);
                    c.status(200);
                    return c.json({
                        msg: "User SignUp Successfull",
                        userId: newUser.id,
                        name: newUser.name,
                        email: newUser.email,
                        token: jwt
                    })
                } else {
                    c.status(503);
                    return c.json({
                        error: "Error while SignUp!!!"
                    })
                }
            }
        }
    } catch (err) {
        c.status(403);
        console.log(err);
        return c.json({
            error: "Error while signing up"
        })
    }
})

userRouter.post("/signin", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const { email, password } = await c.req.json();

    try {
        const parsedValue = signInZodSchema.safeParse({ email, password });
        if (!parsedValue.success) {
            c.status(501);
            return c.json({
                error: "Please enter the correct data types"
            })
        } else {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!user) {
            c.status(403);
            return c.json({ 
                error: "Invalid Credentials" 
            })
        } else {
            const comparePassword = await bcrypt.compare(password, user.password);
            if(!comparePassword) {
                c.status(403);
                return c.json({
                    error: "Incorrect Password!!!"
                })
            } else {
                const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
                return c.json({
                    msg: "Signed in Successfully",
                    userId: user.id,
                    name: user.name,
                    email: user.email,
                    token: jwt
                })
            }
        }
    }
    } catch (err: any) {
        c.status(403);
        return c.json({ 
            error: "Error while signin" 
        });
    }
})
