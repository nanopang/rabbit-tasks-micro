import { ApiProperty } from '@nestjs/swagger';

export class CredentialsInput {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
