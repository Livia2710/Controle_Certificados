import { z } from 'zod';

export const BodySendEmailsDTO = z
    .object({
        project_name: z.string(),
        qtd_hours: z.number(),
        students: z.array(z.number()).nonempty("A lista de estudantes não pode estar vazia")
    })