import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { TeacherModule } from './teacher/teacher.module';
import { Admin } from './admin/entities/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:"mysql",
      host:"localhost",
      port:3306,
      username:"root",
      password:"22",
      database:"crm",
      entities:[Admin],
      synchronize:true
    }),
    AdminModule,
    AuthModule,
    TeacherModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
