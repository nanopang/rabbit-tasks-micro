import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { GuardModule } from '@app/guard';

@Module({
  imports: [GuardModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
