import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { GuardModule } from '@app/guard';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Task } from '../entities/task.entity';
import { UserTask } from '../entities/user-task.entity';

@Module({
  imports: [
    GuardModule,
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://127.0.0.1:5672'],
          queue: 'notification',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get<any>('DB_DRIVER'),
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('TASK_DB_NAME'),
          entities: [Task, UserTask],
        };
      },
    }),
    TypeOrmModule.forFeature([Task, UserTask]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
