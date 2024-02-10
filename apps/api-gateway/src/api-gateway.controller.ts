import { Controller, Inject, Post, Get, Put, Delete } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  AUTH_SERVICE,
  AUTH_SERVICES,
} from 'apps/authentication/src/authentication.const';
import { TASKS_SERVICE, TASKS_SERVICES } from 'apps/tasks/src/tasks.const';

@Controller()
export class ApiGatewayController {
  constructor(
    @Inject(AUTH_SERVICE) private authClient: ClientProxy,
    @Inject(TASKS_SERVICE) private taskClient: ClientProxy,
  ) {}

  @Post('login')
  async login(username: string, password: string): Promise<any> {
    return this.authClient.send(AUTH_SERVICES.LOGIN, { username, password });
  }

  @Post('register')
  async register(username: string, password: string): Promise<any> {
    return this.authClient.send(AUTH_SERVICES.REGISTER, { username, password });
  }

  @Post('tasks')
  async createTask(task: any): Promise<any> {
    return this.taskClient.send(TASKS_SERVICES.CREATE, task);
  }

  @Get('tasks/:id')
  async getTask(id: string): Promise<any> {
    return this.taskClient.send(TASKS_SERVICES.GET, id);
  }

  @Get('tasks')
  async getTasks(): Promise<any> {
    return this.taskClient.send(TASKS_SERVICES.GET_ALL, {});
  }

  @Put('tasks/:id')
  async updateTask(id: string, task: any): Promise<any> {
    return this.taskClient.send(TASKS_SERVICES.UPDATE, { id, task });
  }

  @Delete('tasks/:id')
  async deleteTask(id: string): Promise<any> {
    return this.taskClient.send(TASKS_SERVICES.DELETE, id);
  }
}
