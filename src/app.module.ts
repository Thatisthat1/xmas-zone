import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      connectionFactory: (connection) => {
        if (connection.readyState === 1) {
          console.log('DB connected');
        }
        connection.on('disconnected', () => {
          console.log('DB disconnected');
        });
        connection.on('error', (error) => {
          console.log('DB connection failed! for error: ', error);
        });
        return connection;
      },
    }),
    UsersModule,
    FeedbacksModule,
    SubscriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
