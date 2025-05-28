import { Body, Controller, Get, Post, Request, UseGuards, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DisableActivityLogger } from '@src/activity-logger/helpers/disable-logger.decorator';
import { Resources } from '@src/activity-logger/types/resource.types';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import { FormattedCreatedUserDto } from '@src/users/dto/user/create-user.dto';
import { Request as ExpressRequest } from 'express';
import { CreateUserRequestDto } from '../dtos/create-user-request.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { SwaggerAuthCreateUserRequest, SwaggerAuthSignIn } from '../helpers/auth-set-decorators.helper';
import { UserRequestNotFoundException } from '../helpers/auth.exception';
import { LoggedUser, LoggedUserWithToken } from '../types/logged-user.type';
import { AuthService } from './../services/auth.service';

@ApiTags(Resources.AUTH)
@SwaggerFailureResponse()
@Controller({ path: 'auth', version: ['1'] })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Sign in to the application.
   * @param email User's email
   * @param password User's password
   * @returns User information with access token
   */
  @Post('sign-in')
  @Version('1')
  @SwaggerAuthSignIn()
  @DisableActivityLogger()
  async signIn(@Body('email') email: string, @Body('password') password: string): Promise<LoggedUserWithToken> {
    return await this.authService.singIn(email, password);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: ExpressRequest): LoggedUser {
    const user = req.user;
    if (!user) throw new UserRequestNotFoundException();
    return user;
  }

  /**
   * Create a new user request with company and plan.
   * @param createUserRequestDto The registration request data
   * @returns The created user without sensitive information
   */
  @Post('register')
  @Version('1')
  @SwaggerAuthCreateUserRequest()
  async createUserRequest(@Body() createUserRequestDto: CreateUserRequestDto): Promise<FormattedCreatedUserDto> {
    return await this.authService.createUserRequest(createUserRequestDto);
  }
}
