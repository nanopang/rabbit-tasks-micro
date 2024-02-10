import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskInput {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  assignedTo: number[];
}
