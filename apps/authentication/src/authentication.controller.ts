import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AUTH_SERVICES } from './authentication.const';
import { CredentialsInput } from './authentication.input';
import { AuthenticationService } from './authentication.service';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @MessagePattern(AUTH_SERVICES.REGISTER)
  register(@Body() input: CredentialsInput) {
    return this.authenticationService.register(input);
  }

  @MessagePattern(AUTH_SERVICES.LOGIN)
  login(@Body() input: CredentialsInput) {
    return this.authenticationService.login(input);
  }
}
