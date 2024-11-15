import { registerAs } from '@nestjs/config';

const getProcessParam = (
  key: string,
  defaultValue: any | undefined = undefined,
): any | undefined => {
  return process.env[key] || defaultValue;
};

export default registerAs('database', () => {
  return {
    type: getProcessParam('DB_TYPE'),
    host: getProcessParam('DB_HOST'),
    port: getProcessParam('DB_PORT'),
    username: getProcessParam('DB_USER'),
    password: getProcessParam('DB_PASSWORD'),
    database: getProcessParam('DB_NAME'),
  };
});
