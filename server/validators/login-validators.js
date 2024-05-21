const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .email({ message: "invalid email address" })
    .min(3, { message: "email must be atleast of 8 characters" })
    .max(255, { message: "email must not be more than 255 characters" }),
  password: z
    .string({ required_error: "password is required" })
    .trim()
    .min(7, { message: "Password must be at least of 7 characters" })
    .max(1024, { message: "Password must not be more than 1024 character" }),
});

module.exports = loginSchema;
