import { NextFunction, Request, RequestHandler, Response } from 'express'
import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/cathAsync'

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body

  // call service func to send this data
  const result = await UserServices.createStudentIntoDB(password, studentData)

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  })
})

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body

  const result = await UserServices.createFacultyIntoDB(password, facultyData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  })
})

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body

  const result = await UserServices.createAdminIntoDB(password, adminData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  })
})


export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin
}
