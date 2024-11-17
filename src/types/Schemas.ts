import { z } from "zod";

export const SignupSchema = z.object({
    username: z.string().min(3, {message: "Username has to be minimum of 3 letters"}).max(10, {message: "Username has to be maximum of 10 letters"}),
    password: z.string().min(8, {message: "Password has to be minimum of 8 letters"}).max(20, {message: "Password has   to be maximum of 20 letters"})
})