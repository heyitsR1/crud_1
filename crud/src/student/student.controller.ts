import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('students')
@UseGuards(AuthGuard, RolesGuard) 
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @Roles(Role.User)
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  @Roles(Role.User)
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
