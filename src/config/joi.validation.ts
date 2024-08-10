
import * as Joi from 'joi';

export const JoiValidactionSchema = Joi.object({

    MONGODB: Joi.required(),
    PUERTO: Joi.number().default(3005),
    LIMITEDEFECTO: Joi.number().default(4),
})