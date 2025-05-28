import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/sign-in.dto';
import { Request, response, Response } from 'express';


@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-in-teacher")
  async signInTeacher(
    @Body() signInDto: signInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInTeacher(signInDto, res);
  }

  @Post("sign-out-teacher")
  async signOutTeacher(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutTeacher(req, res);
  }
  @Get("refresh-token-teacher")
  async getRefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenTeacher(req, res);
  }

  @Post("sign-in-admin")
  async signInAdmin(
    @Body() signInDto: signInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInAdmin(signInDto, res);
  }

  @Post("sign-out-admin")
  async signOutAdmin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutAdmin(req, res);
  }
  @Get("refresh-token-admin")
  async getRefreshAdmin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenAdmin(req, res);
  }
  @Post("sign-in-student")
  async signInStudent(
    @Body() signInDto: signInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInStudent(signInDto, res);
  }

  @Post("sign-out-student")
  async signOutStudent(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutStudent(req, res);
  }
  @Get("refresh-token-student")
  async getRefreshStudent(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenStudent(req, res);
  }
}

