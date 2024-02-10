import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { Task } from 'apps/tasks/entities/task.entity';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern('notification_assign')
  async sendNotification(@Payload() data: Task) {
    if (data.userTasks.length === 0) return;
    console.log(`notification sent to ${data.userTasks.map((x) => x.userId)}`);
  }
}
