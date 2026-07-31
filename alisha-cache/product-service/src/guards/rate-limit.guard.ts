import {BadRequestException, CanActivate , ExecutionContext , Injectable } from "@nestjs/common";
import {RedisService} from "../redis/redis.service";

@Injectable()
export class RateLimitGuard implements 
CanActivate{
    constructor(
        private readonly redisService:
        RedisService
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const ip = request.ip || 'unknown';
    const key = `reate_limit:${ip}`

    const currentRequest = await this
    .redisService.client.incr(key);
    if(currentRequest === 1){
        await this.redisService.client.expire(
            key,
            60
        )
    }
    if(currentRequest > 5){
        throw new BadRequestException(
            'Too many request! Try again later...'
        )
    }
 return true;
}
}