import { z } from 'zod';

const StatusEnum = z.enum(["pendente", "em andamento", "pronto"]);

const TaskSchema = z.object({
  user_id: z.number({
    required_error: 'user_id is required',
    invalid_type_error: 'user_id must be a number',
  }),
  description: z.string({
    required_error: 'description is required',
    invalid_type_error: 'description must be a string',
  }),
  status: StatusEnum
});

export type Car = z.infer<typeof TaskSchema>;

export { TaskSchema };
