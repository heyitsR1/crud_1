import {IsString, IsNumber} from 'class-validator'
export class CreateStudentDto {
    @IsString()
    name: string;
    
    @IsNumber()
    grade: number;
    
    @IsString()
    contact: string;

    @IsString()
    course: string; 

    @IsString()
    email: string; 

}
