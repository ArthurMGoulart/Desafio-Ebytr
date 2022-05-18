import { z } from 'zod';

const IdSchema = z.object({
  id: z.string({
    required_error: 'id is required',
    invalid_type_error: 'id must be a string', 
  }).min(24, { message: 'Id must have 24 hexadecimal characters' }),
});

export default IdSchema;
