import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app/app.module";
import Consul from "consul"

const consul = new Consul({
  host: 'localhost',
  port: 8500,
});
async function bootstrap(){
  const app = await NestFactory.create(AppModule);
  const port = 3005;
  const serviceId = 'payment-unique-id-1';
  const registrationDetails = {
    name : 'payment-service',
    address: 'host.docker.internal',
    port: port,
    id: serviceId,
    check:{
      name:'payment-service-health',
      http: `http://host.docker.internal:${port}/api/health`,
      interval: '10s',
      timeout: '5s'
    }
  };
  await consul.agent.service.register(registrationDetails);
  process.on('SIGINT', async () => {
    await consul.agent.service.deregister(serviceId);
    process.exit();
  })
  await app.listen(port);
  console.log(`Payment Service is Running on port ${port} and registered in Consul`);
}
bootstrap();
