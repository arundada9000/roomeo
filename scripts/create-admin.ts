import { auth } from "../src/lib/auth";
import prisma from "../src/lib/prisma";

async function createAdmin() {
  console.log("Creating admin account...");
  
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: "arunneupane0000@gmail.com" }
    });

    if (existingUser) {
      console.log("User already exists. Updating role to ADMIN...");
      await prisma.user.update({
        where: { id: existingUser.id },
        data: { role: "ADMIN" }
      });
      console.log("Updated existing user to ADMIN.");
      
      // If we need to update password, Better Auth has an API for that, 
      // but let's assume if it exists, the user knows their password.
    } else {
      // Create new user using Better Auth server API
      // Since we don't have a request object, we'll use a mocked one or directly use the database
      // Actually better-auth requires headers for server actions. 
      // It's safer to just create the user directly in Prisma, but we need to hash the password.
      // better-auth uses bcrypt by default, but let's just use the signUpEmail endpoint by simulating a fetch request.
      
      const res = await fetch("http://localhost:3000/api/auth/sign-up/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Origin": "http://localhost:3000",
          "Host": "localhost:3000"
        },
        body: JSON.stringify({
          email: "arunneupane0000@gmail.com",
          password: "88888888",
          name: "Admin Arun"
        })
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to create user: ${error}`);
      }

      const data = await res.json();
      
      if (data.user) {
        await prisma.user.update({
          where: { id: data.user.id },
          data: { role: "ADMIN" }
        });
        console.log("Admin account created successfully!");
      }
    }
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
