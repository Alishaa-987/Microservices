import {Module} from "@nestjs/common";
import {CacheModule} from "@nestjs/cache-manager";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {redisStore} from "cache-manager-redis-store";
<<<<<<< HEAD
import { RateLimitGuard } from "../guards/rate-limit.guard";
import { RedisService } from "../redis/redis.service";
=======
>>>>>>> 2c2e95a2ef64b97e4382415cd106aadbe4421939
@Module({
  imports:[
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async()=> ({
        store: await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
          ttl: 60
        })
      })
    })
  ],
  controllers: [AppController],
<<<<<<< HEAD
  providers: [AppService , RedisService , RateLimitGuard]
=======
  providers: [AppService]
>>>>>>> 2c2e95a2ef64b97e4382415cd106aadbe4421939
})
export class AppModule{}