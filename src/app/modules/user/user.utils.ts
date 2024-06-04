import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { UserModel } from './user.model'

const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastStudent?.id ? lastStudent.id : undefined
}

export const generateStudentId = async (payload: TAcademicSemester) => {
  //   first time code is 0000
  let currentId = (0).toString()

  const lastStudentId = await findLastStudentId()
  // 2025 01 0001

  const lastStudentSemesterCode = lastStudentId?.substring(4, 6) //01

  const lastStudentYear = lastStudentId?.substring(0, 4) //2025
  const currentStudentSemesterCode = payload.code
  const currentStudentYear = payload.year

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentStudentSemesterCode &&
    lastStudentYear === currentStudentYear
  ) {
    currentId = lastStudentId.substring(6) //0001
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')
  incrementId = `${payload.year}${payload.code}${incrementId}`

  return incrementId
}
