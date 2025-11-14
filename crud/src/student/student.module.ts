import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentService, RolesGuard],
})
export class StudentModule {}
