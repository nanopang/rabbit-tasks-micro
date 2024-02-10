import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'apps/authentication/src/authentication.const';
import { NOTIFICATION_SERVICE } from 'apps/notification/src/notification.const';
import { TASKS_SERVICE } from 'apps/tasks/src/tasks.const';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://127.0.0.1:5672'],
          queue: 'authentication',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: TASKS_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://127.0.0.1:5672'],
          queue: 'tasks',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: NOTIFICATION_SERVICE,
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
  ],
  controllers: [ApiGatewayController],
})
export class ApiGatewayModule {}
