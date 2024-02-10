import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserTask } from './user-task.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => UserTask, (userTask) => userTask.task, {
    cascade: true,
    eager: true,
  })
  userTasks: UserTask[];

  @Column()
  createdBy: number;
}
