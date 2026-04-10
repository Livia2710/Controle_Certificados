import { z } from 'zod';

export const BodyLoginDTO = z
    .object({
        email: z.string(),
        password: z.string()
    })