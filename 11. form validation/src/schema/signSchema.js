import { z } from 'zod';

const signInSchema = z
  .object({
    userid: z.string().email({ message: '이메일 형식에 맞게 입력해주세요.' }),
    password: z.string().regex(/^[A-Za-z0-9]{6,12}$/, { message: '영문 또는 숫자를 6~12자 입력하세요.' }),
  })
  .required();

const signUpSchema = signInSchema
  .extend({
    name: z.string().min(1, { message: '이름을 입력하세요.' }),
    passwordConfirm: z.string(),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: '패스워드가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

const schema = {
  signin: signInSchema,
  signup: signUpSchema,
};

export default schema;
