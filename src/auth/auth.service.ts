import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/auth.dto";
import * as bcrypt from "bcrypt";
import ms = require("ms");
import { TeacherService } from "../teacher/teacher.service";
import { AdminService } from "../admin/admin.service";
import { Request, Response } from "express";
import { StudentService } from "../student/student.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
    private readonly teacherService: TeacherService,
    private readonly studentService: StudentService,
  ) {}

  async generateTokens(user: any) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_creator: user.is_creator,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { access_token, refresh_token };
  }

  async loginAdmin(loginDto: LoginDto, res: Response) {
    const admin = await this.adminService.findByEmail(loginDto.email);
    if (!admin) {
      throw new UnauthorizedException("Parol yoki email xato");
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      admin.hashed_password
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Parol yoki email xato");
    }
    const tokens = await this.generateTokens(admin);
    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: ms(process.env.REFRESH_TOKEN_TIME),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    admin.hashed_refresh_token = hashed_refresh_token;
    await this.adminService.updateRefreshToken(admin.id, hashed_refresh_token);
    return {
      message: "Xush kelibsiz",
      adminId: admin.id,
      access_token: tokens.access_token,
    };
  }

  async logoutAdmin(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      throw new BadRequestException("Refresh token topilmadi");
    }

    let adminId: number;
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      adminId = payload.id;
    } catch (error) {
      throw new UnauthorizedException("Token noto‘g‘ri yoki muddati tugagan");
    }

    const admin = await this.adminService.findOne(adminId);
    if (!admin) {
      throw new UnauthorizedException("Foydalanuvchi topilmadi");
    }
    const hashed_refresh_token = "";
    await this.adminService.updateRefreshToken(admin.id, hashed_refresh_token);
    res.clearCookie("refresh_token");
    return { message: "Logout success" };
  }

  async refreshTokenAdmin(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new BadRequestException("Refresh token topilmadi");
    }
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException("Token noto‘g‘ri yoki muddati tugagan");
    }

    const admin = await this.adminService.findOne(payload.id);

    if (!admin || !admin.hashed_refresh_token) {
      throw new UnauthorizedException(
        "Foydalanuvchi topilmadi yoki token yo‘q"
      );
    }

    const isMatch = await bcrypt.compare(
      refresh_token,
      admin.hashed_refresh_token
    );
    if (!isMatch) {
      throw new UnauthorizedException("Token mos emas");
    }

    const tokens = await this.generateTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    await this.adminService.updateRefreshToken(admin.id, hashed_refresh_token);

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return {
      message: "Token yangilandi",
      accessToken: tokens.access_token,
    };
  }

  async loginTeacher(loginDto: LoginDto, res: Response) {
    const teacher = await this.teacherService.findByEmail(loginDto.email);
    if (!teacher) {
      throw new UnauthorizedException("Parol yoki email xato");
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      teacher.hashed_password
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Parol yoki email xato");
    }
    const tokens = await this.generateTokens(teacher);
    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: ms(process.env.REFRESH_TOKEN_TIME),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    teacher.hashed_refresh_token = hashed_refresh_token;
    await this.teacherService.updateRefreshToken(teacher.id, hashed_refresh_token);
    return {
      message: "Xush kelibsiz",
      teacherId: teacher.id,
      access_token: tokens.access_token,
    };
  }

  async logoutTeacher(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      throw new BadRequestException("Refresh token topilmadi");
    }

    let teacherId: number;
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      teacherId = payload.id;
    } catch (error) {
      throw new UnauthorizedException("Token noto‘g‘ri yoki muddati tugagan");
    }

    const teacher = await this.teacherService.findOne(teacherId);
    if (!teacher) {
      throw new UnauthorizedException("Foydalanuvchi topilmadi");
    }
    const hashed_refresh_token = "";
    await this.teacherService.updateRefreshToken(teacher.id, hashed_refresh_token);
    res.clearCookie("refresh_token");
    return { message: "Logout success" };
  }

  async refreshTokenTeacher(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new BadRequestException("Refresh token topilmadi");
    }
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException("Token noto‘g‘ri yoki muddati tugagan");
    }

    const teacher = await this.teacherService.findOne(payload.id);

    if (!teacher || !teacher.hashed_refresh_token) {
      throw new UnauthorizedException(
        "Foydalanuvchi topilmadi yoki token yo‘q"
      );
    }

    const isMatch = await bcrypt.compare(
      refresh_token,
      teacher.hashed_refresh_token
    );
    if (!isMatch) {
      throw new UnauthorizedException("Token mos emas");
    }

    const tokens = await this.generateTokens(teacher);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    await this.teacherService.updateRefreshToken(teacher.id, hashed_refresh_token);

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return {
      message: "Token yangilandi",
      accessToken: tokens.access_token,
    };
  }

  async loginStudent(loginDto: LoginDto, res: Response) {
    const student = await this.studentService.findByEmail(loginDto.email);
    if (!student) {
      throw new UnauthorizedException("Parol yoki email xato");
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      student.hashed_password
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Parol yoki email xato");
    }
    const tokens = await this.generateTokens(student);
    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: ms(process.env.REFRESH_TOKEN_TIME),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    student.hashed_refresh_token = hashed_refresh_token;
    await this.studentService.updateRefreshToken(student.id, hashed_refresh_token);
    return {
      message: "Xush kelibsiz",
      studentId: student.id,
      access_token: tokens.access_token,
    };
  }

  async logoutStudent(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      throw new BadRequestException("Refresh token topilmadi");
    }

    let studentId: number;
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      studentId = payload.id;
    } catch (error) {
      throw new UnauthorizedException("Token noto‘g‘ri yoki muddati tugagan");
    }

    const student = await this.studentService.findOne(studentId);
    if (!student) {
      throw new UnauthorizedException("Foydalanuvchi topilmadi");
    }
    const hashed_refresh_token = "";
    await this.studentService.updateRefreshToken(student.id, hashed_refresh_token);
    res.clearCookie("refresh_token");
    return { message: "Logout success" };
  }

  async refreshTokenStudent(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new BadRequestException("Refresh token topilmadi");
    }
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException("Token noto‘g‘ri yoki muddati tugagan");
    }

    const student = await this.studentService.findOne(payload.id);

    if (!student || !student.hashed_refresh_token) {
      throw new UnauthorizedException(
        "Foydalanuvchi topilmadi yoki token yo‘q"
      );
    }

    const isMatch = await bcrypt.compare(
      refresh_token,
      student.hashed_refresh_token
    );
    if (!isMatch) {
      throw new UnauthorizedException("Token mos emas");
    }

    const tokens = await this.generateTokens(student);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    await this.studentService.updateRefreshToken(student.id, hashed_refresh_token);

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return {
      message: "Token yangilandi",
      accessToken: tokens.access_token,
    };
  }
}
