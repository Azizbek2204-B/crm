import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { TeacherModule } from './teacher/teacher.module';
import { Admin } from './admin/entities/admin.entity';
import { StudentModule } from './student/student.module';
import { CoursesModule } from './courses/courses.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GroupsModule } from './groups/groups.module';
import { TeacherGroupsModule } from './teacher_groups/teacher_groups.module';
import { StudentGroupsModule } from './student_groups/student_groups.module';
import { AttendancesModule } from './attendances/attendances.module';
import { SchedulesModule } from './schedules/schedules.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    GraphQLModule.forRoot({
      driver:ApolloDriver,
      autoSchemaFile:'schema.gql',
      sortSchema: true,
      playground: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<"postgres">("DB_CONNECTION"),
        host: config.get<string>("DB_HOST"),
        port: config.get<number>("DB_PORT"),
        username: config.get<string>("DB_USERNAME"),
        password: config.get<string>("DB_PASSWORD"),
        database: config.get<string>("DB_NAME"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    AdminModule,
    AuthModule,
    TeacherModule,
    StudentModule,
    CoursesModule,
    GroupsModule,
    TeacherGroupsModule,
    StudentGroupsModule,
    AttendancesModule,
    SchedulesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
