import { z } from "zod";

const email = z.string().trim().toLowerCase().email("Enter a valid email address").max(254);

export const signInSchema = z.object({
  email,
  password: z.string().min(1, "Enter your password").max(128),
  next: z.string().max(300).optional(),
});

export const signUpSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email,
  password: z
    .string()
    .min(8, "Use at least 8 characters")
    .max(128)
    .regex(/[A-Za-z]/, "Include at least one letter")
    .regex(/\d/, "Include at least one number"),
  terms: z.boolean().refine((v) => v === true, "You need to accept the terms to continue"),
  next: z.string().max(300).optional(),
});

export const forgotPasswordSchema = z.object({ email });

export const profileSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email,
  phone: z.string().trim().regex(/^(\+?[\d\s().-]{7,20})?$/, "Enter a valid phone number").optional(),
});