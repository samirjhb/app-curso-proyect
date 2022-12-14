import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MailAppModule } from './mail-app.module';

async function bootstrap() {
  // const app = await NestFactory.create(MailAppModule);
  // await app.listen(3000);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MailAppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379,
      },
    }
  );
  await app.listen();
}
bootstrap();
