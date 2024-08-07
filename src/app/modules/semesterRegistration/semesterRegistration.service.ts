import httpStatus from 'http-status'
import AppError from '../../Error/AppError'
import { AcademicSemester } from '../academicSemester/academicsSemester.model'
import { TSemesterRegistration } from './semesterRegistration.interface'
import { SemesterRegistration } from './semesterRegistration.model'

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester

  // check if the academic semester is exist
  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemester)
  if (!isAcademicSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This academic Semester not found')
  }

  // check if semester is is already registered
  const isSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester,
  })
  if (isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This Semester is already registered',
    )
  }

  const result = await SemesterRegistration.create(payload)
  return result
}

const getAllSemesterRegistrationsFromDB = async () => {
  const result = await SemesterRegistration.find()
  return result
}

const getSingleSemesterRegistrationFromDB = async () => {}
const updateSemesterRegistrationIntoDB = async () => {}

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
}
