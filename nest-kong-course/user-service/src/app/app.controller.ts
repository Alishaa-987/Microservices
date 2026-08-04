import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class AppController {

  @Get()
  getUsers(){
    return {
      success: true,
      message: "User fetched successfully!",
      servedByPort: process.env.PORT || 3000
    }
  }
}
