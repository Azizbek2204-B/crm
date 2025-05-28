import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { TeacherModule } from '../teacher/teacher.module';
import { StudentsModule } from '../students/students.module';

@Module({
  imports:[JwtModule.register({
    global:true
  }),AdminModule,TeacherModule,StudentsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
