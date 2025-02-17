const joi = require('joi');

const envVarSchema = joi
    .object({
        DB_URI: joi.string().required(),
        PORT: joi.number().positive().default(3000), 
        ORIGIN: joi.string().required(),
        OPENAI_API:joi.string().required(),
        SERVER_URL: joi.string().required(),
        JWT_SECRET: joi.string().required()

    })
    .unknown();

module.exports = envVarSchema;