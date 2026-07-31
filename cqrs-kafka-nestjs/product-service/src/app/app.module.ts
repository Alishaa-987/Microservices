import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProductHandler } from './commands/create-product.handler';
import { GetProductsHandler } from './queries/get-products.handler';
import { ProductConsumer } from './product.consumer';
import { ProductController } from './product.controller';

@Module({
  imports: [CqrsModule , ClientsModule.register([
    {
    name: 'KAFKA_SERVICE',
    transport: Transport.KAFKA,
    options:{
      client: {
        clientId: 'cqrs-client',
        brokers: ['localhost:9092']
      },
      consumer:{
        groupId: 'cqrs-group'
      }
    }}
  ])],
  controllers: [ProductController , ProductConsumer],
  providers: [CreateProductHandler , GetProductsHandler],
})
export class AppModule {}
