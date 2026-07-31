<<<<<<< HEAD
import { Controller , Get , Param , Patch, UseGuards} from "@nestjs/common";
import {AppService} from "./app.service";
import { RateLimitGuard } from "../guards/rate-limit.guard";
=======
import { Controller , Get , Param , Patch} from "@nestjs/common";
import {AppService} from "./app.service";
>>>>>>> 2c2e95a2ef64b97e4382415cd106aadbe4421939
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ){}
  @Get ('product/:id')
  async getProduct(@Param('id') id:string){
    return this.appService.getProduct(Number(id))
  }
  @Patch('product/:id/:price')
  async updateProduct(
    @Param('id') id:string,
    @Param('price') price: string
  ){
    return this.appService.updateProduct(Number(id), Number(price))
  }
<<<<<<< HEAD

  @Get('products')
    @UseGuards(
      RateLimitGuard
    )
  getProducts(){
    return{
      success: true,
      products:[
        'Laptop',
        'Mobile',
        'Tablet'
      ]
    }
  }
=======
>>>>>>> 2c2e95a2ef64b97e4382415cd106aadbe4421939
}