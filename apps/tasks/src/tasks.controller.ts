import { AppGuard } from '@app/guard';
import { CurrentUser } from '@app/guard/guard.decorator';
import { UserPayload } from '@app/guard/user.payload';
import { Body, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TASKS_SERVICES } from './tasks.const';
import { CreateTaskInput } from './tasks.input';
import { TasksService } from './tasks.service';

@UseGuards(AppGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern(TASKS_SERVICES.CREATE)
  createTask(@Body() input: CreateTaskInput, @CurrentUser() user: UserPayload) {
    return this.tasksService.createTask(input, user.userId);
  }

  @MessagePattern(TASKS_SERVICES.GET_ALL)
  getTasks(@CurrentUser() user: UserPayload) {
    return this.tasksService.getTasks(user.userId);
  }
}
