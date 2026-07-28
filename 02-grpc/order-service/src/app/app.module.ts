import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { join } from 'path';
import {  ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INVENTORY_PACKAGE',
        transport: Transport.GRPC,
        options:{
          package: 'inventory',
          protoPath: join(__dirname, '../proto/inventory.proto'),
          url: 'localhost:50051'
        },
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
