import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { RoomsService } from './rooms/rooms.service';
import { RoomsModule } from './rooms/rooms.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongooseAutopopulate from 'mongoose-autopopulate'
import { JwtModule } from '@nestjs/jwt';
import { ChatsModule } from './chats/chats.module';
import { InterestsController } from './interests/interests.controller';
import { InterestsService } from './interests/interests.service';
import { InterestsModule } from './interests/interests.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env'
    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],//为了后面的configService导入模块,注入到DI容器，全局已导入可以不加
      useFactory:async(configService :ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        if(!uri){
          throw new Error('MONGO_URI is not defined in environment variables');
        }
        return {
          uri,
          connectionFactory:(connection)=>{
            connection.plugin(mongooseAutopopulate);
            return connection;
          }
        }
      },
      inject:[ConfigService],//声明依赖，从DI容器中指定要使用的服务
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      // useFactory:async(configService: ConfigService)=>{
      //   return {
      //     secret: configService.get<string>('JWT_SECRET') || 'default-secret',
      //     signOptions: {
      //       expiresIn: configService.get<string>('JWT_EXPIRATION') || '24h',
      //     } as any,
      //   }

      // },
      useFactory:async(configService: ConfigService)=> ({
          secret: configService.get<string>('JWT_SECRET') || 'default-secret',
          signOptions: {
            expiresIn: configService.get<number>('JWT_EXPIRATION') || '24h',
          },
        }),//两种写法
      inject:[ConfigService]
    }),
    AuthModule, RoomsModule, UsersModule, ChatsModule, InterestsModule],
  controllers: [AuthController, UsersController, InterestsController],
  providers: [RoomsService, InterestsService],
})
export class AppModule {}
