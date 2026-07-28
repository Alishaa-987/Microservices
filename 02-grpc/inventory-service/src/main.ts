/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule , {
    transport: Transport.GRPC,
    options:{
      package: 'inventory',
      protoPath: join(process.cwd(), 'libs/proto/inventory.proto'),
      url: 'localhost:50051'
    }
  });
  
  await app.listen();
  console.log('Inventory gRPC Service is running!');
}

bootstrap();
