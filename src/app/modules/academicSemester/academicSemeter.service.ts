import { academicSemesterNameCodeMapper } from './academicSemester.constant'
import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicsSemester.model'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code')
  }

  // Create a new academicSemester
  const result = AcademicSemester.create(payload)
  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
}
