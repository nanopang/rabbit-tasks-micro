import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskInput } from './tasks.input';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @Inject('NOTIFICATION_SERVICE') private client: ClientProxy,
  ) {}

  async createTask(input: CreateTaskInput, userId: number) {
    const task = this.taskRepo.create({ ...input, createdBy: userId });
    this.taskRepo.merge(task, {
      userTasks: input.assignedTo.map((x) => ({ userId: x })),
    });
    await this.taskRepo.save(task);
    this.client.emit('notification_assign', task);
    return task;
  }

  async getTasks(userId: number) {
    return await this.taskRepo.find({
      where: [
        {
          createdBy: userId,
        },
        {
          userTasks: {
            userId,
          },
        },
      ],
    });
  }
}
