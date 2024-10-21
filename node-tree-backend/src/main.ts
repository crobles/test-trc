import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configmapSettings } from './shared/settings/configmap.settings';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(configmapSettings.APP_PORT, '0.0.0.0');
}
bootstrap()
  .then(() => {
    console.log(
      `Up and running in ${configmapSettings.NODE_ENV} on port: ${configmapSettings.APP_PORT}`,
    );
  })
  .catch((error) => {
    console.error(
      `Unable to run app on port: ${configmapSettings.APP_PORT}`,
      error,
    );
  });
