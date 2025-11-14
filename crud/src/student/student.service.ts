import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class StudentService {
    constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const new_s = await this.studentsRepository.create(createStudentDto);
    return this.studentsRepository.save(new_s)
  }

  async findAll() {
    return await this.studentsRepository.find()
  }

  async findOne(id: number) {
    return await this.studentsRepository.findOneBy({id})
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    return await this.studentsRepository.update(id,updateStudentDto)
  }

  async remove(id: number) {
    return await this.studentsRepository.delete(id);
  }
}
