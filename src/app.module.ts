import { GoalModule } from './goal/goal.module';
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from '@config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';

//MODULES
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

// MIDDLEWARES
import { auth } from './middlewares/auth.middleware';

@Module({
  imports: [
        GoalModule, 
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer      
      .apply(auth)
      .exclude(
        { path: '/health-check', method: RequestMethod.ALL },
        { path: '/user', method: RequestMethod.POST },
        { path: '/signin', method: RequestMethod.POST },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
 }
