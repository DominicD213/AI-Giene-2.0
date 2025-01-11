const dotenv = require('dotenv');

dotenv.config();

console.log('Loaded environment variables:', process.env);

const envVarSchema = require('../validation/env.validation.cjs');
const { value: envVars, error } = envVarSchema.validate(process.env);

if (error) {
  console.log(error);
}

module.exports = {
  envPort: envVars.PORT,
  dbURI: envVars.DB_URI,
  origin: envVars.ORIGIN,
  openAIApiKey: envVars.OPENAI_API
};
