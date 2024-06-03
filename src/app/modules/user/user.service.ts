import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

  
const createStudentIntoDB = async ( password: string, studentData: TStudent) =>{

    const userData: Partial<TUser> = {};

    // set default password if not provided
    userData.password =  password || config.default_password as string;
  
    // set role for student 
    userData.role = 'student';

// year semesterCode 4digit number
const generateId = (payload: TAcademicSemester) => {
    
}





    // set manually generated id
    // userData.id = generateId(payload);
    userData.id = '2025100001';
    const newUser = await UserModel.create(userData);

    // check data is inserted or not
    if( Object.keys(newUser).length){
        // set id, _id as user 
        studentData.id = newUser.id; // embading Id
        studentData.user = newUser._id; // reference id

        // Create a new student
        const newStudent = StudentModel.create(studentData);
        return newStudent;
    }

};

export const UserServices = {
    createStudentIntoDB
}