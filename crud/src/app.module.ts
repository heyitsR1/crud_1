import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/User.entity';
import { Student } from './student/entities/student.entity';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot ({
      isGlobal:true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ()=> ({
        type: (process.env.DATABASE_TYPE as 'postgres') || 'postgres',
        host: process.env.DATABASE_HOST ,
        port: parseInt(process.env.DATABASE_PORT || '5432', 10),
        username: process.env.DATABASE_USERNAME,
        password: String(process.env.DATABASE_PASSWORD),
        database: process.env.DATABASE_NAME,
        entities: [User,Student],
        synchronize: true,  
      })
    }),
    StudentModule,AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }