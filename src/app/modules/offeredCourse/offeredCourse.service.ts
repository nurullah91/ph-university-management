import { OfferedCourse } from './offeredCourse.model'
import { TOfferedCourse } from './offeredCourse.interface'
import QueryBuilder from '../../builder/QueryBuilder'
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model'
import AppError from '../../Error/AppError'
import httpStatus from 'http-status'
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model'
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model'
import { Course } from '../course/course.model'
import { Faculty } from '../faculty/faculty.model'
import { hasTimeConflict } from './offeredCourse.utils'

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload

  // Check if Semester registration is exist
  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration)
  if (!isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester Registration is not found',
    )
  }
  const academicSemester = isSemesterRegistrationExist.academicSemester
  // Check if Academic Faculty is exist
  const isAcademicFacultyExist = await AcademicFaculty.findById(academicFaculty)
  if (!isAcademicFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty is not found')
  }

  // Check if Academic Department is exist
  const isAcademicDepartmentExist =
    await AcademicDepartment.findById(academicDepartment)
  if (!isAcademicDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department is not found')
  }

  // Check if Semester registration is exist
  const isCourseExist = await Course.findById(course)
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course is not found')
  }

  // Check if Faculty is exist
  const isFacultyExist = await Faculty.findById(faculty)
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'faculty is not found')
  }

  // check if the department belong to the faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  })
  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The ${isAcademicDepartmentExist} is not belong to the ${isAcademicFacultyExist} faculty`,
    )
  }

  // check if the same offered course same section in same registered semester exists
  const isSameOfferedCourseExistWithSameSection = await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section,
  })
  if (isSameOfferedCourseExistWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'The offered course is already exist in this section',
    )
  }

  // get the schedule of that faculty
  const assignedSchedule = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime')

  const newSchedule = {
    days,
    startTime,
    endTime,
  }

  if (hasTimeConflict(assignedSchedule, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This Faculty is not available at that time! Choose other time or day',
    )
  }

  const result = await OfferedCourse.create({
    ...payload,
    academicSemester,
  })
  return result
}

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(
    OfferedCourse.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await offeredCourseQuery.modelQuery
  return result
}

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id).populate('academicDepartment')
  return result
}

const updateOfferedCoursesIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload

  const isOfferedCourseExist = await OfferedCourse.findById(id)
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course is not found')
  }

  const isFacultyExist = await Faculty.findById(faculty)
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not found')
  }

  const semesterRegistration = isOfferedCourseExist.semesterRegistration

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration)

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cannot update this offered course as it is ${semesterRegistrationStatus?.status}`,
    )
  }

  // get the schedule of the faculties
  const assignedSchedule = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime')

  const newSchedule = {
    days,
    startTime,
    endTime,
  }
  if (hasTimeConflict(assignedSchedule, newSchedule)) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department is not found')
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  return result
}

// Delete service
const deleteOfferedCoursesFromDB = async (id: string) => {
  const result = await OfferedCourse.findByIdAndUpdate(id, {
    isDeleted: true,
  })

  return result
}

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCoursesIntoDB,
  deleteOfferedCoursesFromDB,
}
