import { Hono } from 'hono';
import { Prisma, PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Initialize a new Hono instance:
const app = new Hono();

// Initialize the Prisma with the Accelerate for faster query fetches:
const prisma = new PrismaClient().$extends(withAccelerate());


// Routes for the User Authentication:
app.post("api/v1/user/signup", async(c) => {
	
})
app.post("api/v1/user/signin", async(c) => {

})

// Routes to Upload the Blog and Update the Blog:
app.post("api/v1/blog", async(c) => {

})
app.put("api/v1/blog/:id", async(c) => {

})

// Routes to get all the blogs and the particular blog with id:
app.get("api/v1/blog/:id", async(c) => {

})
app.get("api/v1/blog/bulk", async(c) => {

})

export default app;
