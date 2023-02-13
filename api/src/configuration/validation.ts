import {
  IsNumber,
  validateSync,
  IsString,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { plainToInstance } from 'class-transformer';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}
export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsBoolean()
  DB_SYNC: boolean;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsBoolean()
  DB_LOGGING: boolean;

  @IsString()
  DB_DATABASE: string;

  @IsString()
  CLIENT_JWT_SECRET_KEY: string;

  @IsNumber()
  HTTP_TIMEOUT: number;

  @IsNumber()
  HTTP_MAX_REDIRECT: number;

  @IsString()
  SWAGGER_USER: string;

  @IsString()
  SWAGGER_PASSWORD: string;

  @IsString()
  REDIS_HOST: string;

  @IsString()
  REDIS_PORT: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
