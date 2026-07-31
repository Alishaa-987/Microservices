import {Body , Controller , Get , Post , Inject } from "@nestjs/common";
import {CommandBus , QueryBus} from "@nestjs/cqrs";
import {ClientKafka} from "@nestjs/microservices";
import { CreateProductCommand} from "./commands/create-product.command";
import { GetProductQuery } from "./queries/get-products.queries";


@Controller('products')
export class ProductController{
    constructor(
        private readonly commandBus:
        CommandBus,
        private readonly queryBus: QueryBus,
        @Inject('KAFKA_SERVICE')
        private readonly kafkaClient:
        ClientKafka
    ){}
    @Post()
    async create(@Body() body: any){
        const product = await this.commandBus.execute(new CreateProductCommand(body.name));
        this.kafkaClient.emit(
            'product_created',
            product     
        );
        return {
            message: "Command Executed",
            product
        }
    }
    @Get()
    async getProducts(){
        return this.queryBus.execute(
            new GetProductQuery()
        )
    }

}