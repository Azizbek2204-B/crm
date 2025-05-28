import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { TeacherService } from '../teacher/teacher.service';
import { signInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt'
import { Teacher } from '../teacher/entities/teacher.entity';
import { Request, Response } from 'express';
import { Admin } from '../admin/entities/admin.entity';
import { Student } from '../students/entities/student.entity';
import { StudentsService } from '../students/students.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly teacherService: TeacherService,
    private readonly studentService: StudentsService
  ) {}

  //=====================================ALL AUTHENTIFICATION FOR TEACHER=======================================
  async generateTokensforTeacher(teacher: Teacher) {
    const payload = {
      id: teacher.id,
      email: teacher.email,
      is_active: teacher.is_active,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { accessToken, refreshToken };
  }
  async signInTeacher(signInDto: signInDto, res: Response) {
    const teacher = await this.teacherService.findByEmail(signInDto.email);
    if (!teacher) {
      throw new BadRequestException("There is not user with the given email!");
    }
    const isValid = await bcrypt.compare(signInDto.password, teacher.password);
    if (!isValid) {
      throw new BadRequestException("Email yoki Password Noto'g'ri");
    }
    const { accessToken, refreshToken } =
      await this.generateTokensforTeacher(teacher);
    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    teacher.refresh_token = hashed_refresh_token;
    await this.teacherService.save(teacher);
    return { message: `Welcome ${teacher.firstName}!`, accessToken };
  }

  async signOutTeacher(req: Request, res: Response) {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) {
      throw new BadRequestException("Refresh Token not available!");
    }
    const teacher = await this.teacherService.findByToken(refreshToken);
    if (!teacher) {
      throw new BadRequestException("Token Not Found");
    }
    teacher.refresh_token = "";
    res.clearCookie("refreshToken");
    await this.teacherService.save(teacher);
    return {
      message: `Dear ${teacher.firstName} You logged out successfully!`,
    };
  }

  async refreshTokenTeacher(req: Request, res: Response) {
    const refresh_token = req.cookies["refreshToken"];
    if (!refresh_token) {
      throw new BadRequestException("Refresh Token not available!");
    }
    const payload = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    const teacher = await this.teacherService.findOne(payload.id);
    if (!teacher || !teacher.refresh_token) {
      throw new BadRequestException(
        "Teacher Not Found or have not log in yet!"
      );
    }
    const isValid = await bcrypt.compare(refresh_token, teacher.refresh_token);
    if (!isValid) throw new UnauthorizedException("Refresh Token noto'g'ri");
    const { accessToken, refreshToken } =
      await this.generateTokensforTeacher(teacher);
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    teacher.refresh_token = hashed_refresh_token;
    await this.teacherService.save(teacher);

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return { RefreshToken: refreshToken };
  }

  //=====================================ALL AUTHENTIFICATION FOR ADMIN=======================================

  async generateTokensforAdmin(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
      is_creator: admin.is_creator,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { accessToken, refreshToken };
  }
  async signInAdmin(signInDto: signInDto, res: Response) {
    const admin = await this.adminService.findByEmail(signInDto.email);
    if (!admin) {
      throw new BadRequestException("There is not admin with the given email!");
    }
    const isValid = await bcrypt.compare(signInDto.password, admin.password);
    if (!isValid) {
      throw new BadRequestException("Email yoki Password Noto'g'ri");
    }
    const { accessToken, refreshToken } =
      await this.generateTokensforAdmin(admin);
    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    admin.refresh_token = hashed_refresh_token;
    await this.adminService.save(admin);
    return { message: `Welcome ${admin.firstName}!`, accessToken };
  }

  async signOutAdmin(req: Request, res: Response) {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) {
      throw new BadRequestException("Refresh Token not available!");
    }
    const admin = await this.adminService.findByToken(refreshToken);
    if (!admin) {
      throw new BadRequestException("Token Not Found");
    }
    admin.refresh_token = "";
    res.clearCookie("refreshToken");
    await this.adminService.save(admin);
    return {
      message: `Dear ${admin.firstName} You logged out successfully!`,
    };
  }

  async refreshTokenAdmin(req: Request, res: Response) {
    const refresh_token = req.cookies["refreshToken"];
    console.log(refresh_token);
    if (!refresh_token) {
      throw new BadRequestException("Refresh Token not available!");
    }
    const payload = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    const admin = await this.adminService.findOne(payload.id);
    if (!admin || !admin.refresh_token) {
      throw new BadRequestException("Admin Not Found or have not log in yet!");
    }
    const isValid = await bcrypt.compare(refresh_token, admin.refresh_token);
    if (!isValid) throw new UnauthorizedException("Refresh Token noto'g'ri");
    const { accessToken, refreshToken } =
      await this.generateTokensforAdmin(admin);
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    admin.refresh_token = hashed_refresh_token;
    await this.adminService.save(admin);

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return { RefreshToken: refreshToken };
  }

  //=====================================ALL AUTHENTIFICATION FOR STUDENT=======================================
  async generateTokensforStudent(student:Student) {
    const payload = {
      id: student.id,
      email: student.email,
      is_active: student.is_active,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { accessToken, refreshToken };
  }
  async signInStudent(signInDto: signInDto, res: Response) {
    const student= await this.studentService.findByEmail(signInDto.email);
    if (!student) {
      throw new BadRequestException("There is not student with the given email!");
    }
    const isValid = await bcrypt.compare(signInDto.password, student.password);
    if (!isValid) {
      throw new BadRequestException("Email yoki Password Noto'g'ri");
    }
    const { accessToken, refreshToken } =
      await this.generateTokensforStudent(student);
    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    student.refresh_token = hashed_refresh_token;
    await this.studentService.save(student);
    return { message: `Welcome ${student.firstName}!`, accessToken };
  }

  async signOutStudent(req: Request, res: Response) {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) {
      throw new BadRequestException("Refresh Token not available!");
    }
    const student = await this.studentService.findByToken(refreshToken);
    if (!student) {
      throw new BadRequestException("Token Not Found");
    }
    student.refresh_token = "";
    res.clearCookie("refreshToken");
    await this.studentService.save(student);
    return {
      message: `Dear ${student.firstName} You logged out successfully!`,
    };
  }

  async refreshTokenStudent(req: Request, res: Response) {
    const refresh_token = req.cookies["refreshToken"];
    if (!refresh_token) {
      throw new BadRequestException("Refresh Token not available!");
    }
    const payload = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    const student = await this.studentService.findOne(payload.id);
    if (!student || !student.refresh_token) {
      throw new BadRequestException("Admin Not Found or have not log in yet!");
    }
    const isValid = await bcrypt.compare(refresh_token, student.refresh_token);
    if (!isValid) throw new UnauthorizedException("Refresh Token noto'g'ri");
    const { accessToken, refreshToken } =
      await this.generateTokensforStudent(student);
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    student.refresh_token = hashed_refresh_token;
    await this.studentService.save(student);

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return { RefreshToken: refreshToken };
  }
}
