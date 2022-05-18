import { z } from 'zod';

const UserSchema = z.object({
  name: z.string({
    required_error: 'seatsQty is required',
    invalid_type_error: 'seatsQty must be a number',
  }),
  email: z.string({
    required_error: 'email is required',
    invalid_type_error: 'email must be a string',
  }).email({ message: 'email must be valid'}),
  password: z.string({
    required_error: 'email is required',
    invalid_type_error: 'email must be a string',
  }).min(5, { message: "password must be 6 or more characteres long"} ),
});

export type User = z.infer<typeof UserSchema>;

export { UserSchema };