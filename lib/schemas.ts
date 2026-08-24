import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name is too long"),
  email: z.email("Enter a valid email address"),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject is too long"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message is too long"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Enter a valid email address"),
  phone: z
    .string()
    .regex(/^\+?[\d\s-]{7,15}$/, "Enter a valid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  zip: z.string().regex(/^\d{4,10}$/, "Enter a valid ZIP code"),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export const cardSchema = z.object({
  cardNumber: z
    .string()
    .regex(/^\d{13,19}$/, "Enter a valid card number")
    .transform((v) => v.replace(/\s/g, "")),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),
  cvc: z.string().regex(/^\d{3,4}$/, "Enter a valid CVC"),
});

export type CardFormValues = z.infer<typeof cardSchema>;

export const newsletterSchema = z.object({
  email: z.email("Enter a valid email address"),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Za-z]/, "Password must contain a letter")
  .regex(/\d/, "Password must contain a number");

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Enter a valid email address"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignupFormValues = z.infer<typeof signupSchema>;

export const forgotPasswordSchema = z.object({
  email: z.email("Enter a valid email address"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
