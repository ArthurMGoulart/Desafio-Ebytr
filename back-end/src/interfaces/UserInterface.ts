import { z } from 'zod';

const UserSchema = z.object({
  name: z.string({
    required_error: 'name is required',
    invalid_type_error: 'name must be a number',
  }),
  email: z.string({
    required_error: 'email is required',
    invalid_type_error: 'email must be a string',
  }).email({ message: 'email must be valid'}),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a string',
  }).min(5, { message: "password must be 6 or more characteres long"} ),
});

const UserLoginSchema = z.object({
  email: z.string({
    required_error: 'email is required',
    invalid_type_error: 'email must be a string',
  }).email({ message: 'email must be valid'}),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a string',
  }).min(5, { message: "password must be 6 or more characteres long"} ),
});

export type User = z.infer<typeof UserSchema>;

export type UserLogin = z.infer<typeof UserLoginSchema>;

export type UserLogged = {
  id: string,
  name: string,
  email: string,
  token: string,
}

export { UserSchema, UserLoginSchema };
