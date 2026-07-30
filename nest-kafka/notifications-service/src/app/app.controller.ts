import { Controller , Inject , OnModuleInit } from '@nestjs/common';
import { EventPattern, Payload , ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit{

  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly kafkaClient: ClientKafka,

  ){}
  async onModuleInit(){
    await this.kafkaClient.connect();
  }
  @EventPattern('user_created')
  async handleUserCreated(@Payload() data:any) 
  {
    try{
      console.log('Main Event Received!')
      console.log(data);
      throw new Error('Payment Service Failed!')
    }catch(error){
      const errorMessage = error instanceof 
      Error ? error.message : String(error)
      this.kafkaClient.emit
      ('user_created_dlq' , {
        failedData: data,
        error: errorMessage,
        failedAt: new Date()
      })
    }
  
  }
  
     @EventPattern ('user_created_dlq')
    handleDLQ(@Payload() data:any){
      console.log('DLQ Event Received!')
      console.log(data)
    } 
}

