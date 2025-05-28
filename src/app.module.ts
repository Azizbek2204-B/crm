import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from './admin/admin.module';
import { TeacherModule } from './teacher/teacher.module';
import { AuthModule } from './auth/auth.module';
import { Admin } from "./admin/entities/admin.entity";
import { Teacher } from "./teacher/entities/teacher.entity";
import { StudentsModule } from './students/students.module';
import { CourseModule } from './course/course.module';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GroupModule } from './group/group.module';
import { Course } from "./course/entities/course.entity";
import { Group } from "./group/entities/group.entity";
import { ScheduleModule } from './schedule/schedule.module';
import { AttendanceModule } from './attendance/attendance.module';
import { StudentGroupsModule } from './student-groups/student-groups.module';
import { TeacherGroupsModule } from './teacher-groups/teacher-groups.module';
import { HomeworkModule } from './homework/homework.module';
import { HomeworkSubmissionsModule } from './homework-submissions/homework-submissions.module';
import { GradesModule } from './grades/grades.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      sortSchema: true,
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.HOST,
      port: Number(process.env.DB_PORT!),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),

    AdminModule,
    TeacherModule,
    AuthModule,
    StudentsModule,
    CourseModule,
    GroupModule,
    ScheduleModule,
    AttendanceModule,
    StudentGroupsModule,
    TeacherGroupsModule,
    HomeworkModule,
    HomeworkSubmissionsModule,
    GradesModule,
    MediaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
