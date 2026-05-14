import { z } from "zod";

import { EMAIL_REGEX, ID_REGEX } from "@/constants/regex";

export const signupSchema = z
  .object({
    id: z
      .string()
      .min(1, "아이디를 입력해주세요.")
      .regex(ID_REGEX, "아이디는 영문, 숫자 6~20자로 입력해주세요."),
    email: z
      .string()
      .min(1, "이메일을 입력해주세요.")
      .regex(EMAIL_REGEX, "올바른 이메일 형식을 입력해주세요."),
    password: z.string().min(8, "비밀번호는 8자 이상 입력해주세요."),
    passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요."),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
