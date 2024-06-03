import config from '../../config'
import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { AcademicSemester } from '../academicSemester/academicsSemester.model'
import { TStudent } from '../student/student.interface'
import { StudentModel } from '../student/student.model'
import { TUser } from './user.interface'
import { UserModel } from './user.model'
import { generateStudentId } from './user.utils'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {}

  // set default password if not provided
  userData.password = password || (config.default_password as string)

  // set role for student
  userData.role = 'student'

  // Find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  )
  // set manually generated id
  userData.id = await generateStudentId(admissionSemester)

  const newUser = await UserModel.create(userData)

  // check data is inserted or not
  if (Object.keys(newUser).length) {
    // set id, _id as user
    payload.id = newUser.id // embading Id
    payload.user = newUser._id // reference id

    // Create a new student
    const newStudent = StudentModel.create(payload)
    return newStudent
  }
}

export const UserServices = {
  createStudentIntoDB,
}
