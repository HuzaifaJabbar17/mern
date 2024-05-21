const { z } = require("zod");

// creating an object schema
const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 characters" })
    .max(255, { message: "Name must not be more than 255 character" }),
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .email({ message: "invalid email address" })
    .min(8, { message: "email must be at least of 8 characters" })
    .max(255, { message: "email must not be more than 255 character" }),
  phone: z
    .string({ required_error: "Phone no is required" })
    .trim()
    .min(10, { message: "Phone number must be atleast of 10 digits" })
    .max(20, { message: "Phone no must not be more than 20 character" }),
  password: z
    .string({ required_error: "password is required" })
    .trim()
    .min(7, { message: "Password must be at least of 7 characters" })
    .max(1024, { message: "Password must not be more than 1024 character" }),
});

module.exports = signupSchema;