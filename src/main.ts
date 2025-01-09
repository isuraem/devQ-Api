import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  app.enableCors();
  await app.listen(8000);
  console.log('Nest application successfully started on port 8000 with routes prefixed by /api');
}
bootstrap();