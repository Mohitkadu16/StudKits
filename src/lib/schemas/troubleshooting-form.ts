import * as z from "zod";

export const troubleshootingFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  mobile: z.string().regex(/^[0-9]{10}$/, {
    message: "Please enter a valid 10-digit mobile number.",
  }),
  institution: z.string().min(2, {
    message: "School/College name must be at least 2 characters.",
  }),
  projectCategory: z.string({
    required_error: "Please select a project category.",
  }),
  projectSource: z.string({
    required_error: "Please select where you got the project from.",
  }),
  components: z.string().min(10, {
    message: "Please list the main components used in your project.",
  }),
  problemDescription: z.string().min(20, {
    message: "Please provide a detailed description of the problem.",
  }),
  errorMessages: z.string().optional(),
  expectedBehavior: z.string().min(10, {
    message: "Please describe what you expect the project to do.",
  }),
  troubleshootingSteps: z.string().optional(),
});