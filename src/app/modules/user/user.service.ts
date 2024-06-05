import mongoose from 'mongoose'
import config from '../../config'
import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { AcademicSemester } from '../academicSemester/academicsSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { UserModel } from './user.model'
import { generateStudentId } from './user.utils'
import AppError from '../../Error/AppError'
import httpStatus from 'http-status'

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

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // set generated id
    userData.id = await generateStudentId(admissionSemester)

    // create a new user (Transaction-1)
    const newUser = await UserModel.create([userData], { session }) //it will give data in an array

    // check user is created or not
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    // set id, _id as user
    payload.id = newUser[0].id // embedding Id
    payload.user = newUser[0]._id // reference id

    // Create a new student (transaction-2)
    const newStudent = await Student.create([payload], { session })

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to create a student')
    }

    await session.commitTransaction()
    await session.endSession()
    return newStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()

    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to crate student')
  }
}

export const UserServices = {
  createStudentIntoDB,
}
