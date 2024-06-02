import { NextFunction, Request, RequestHandler, Response } from "express"
import { UserServices } from "./user.service"
import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"
import catchAsync from "../../utils/cathAsync"



const createStudent  = catchAsync(async (req, res) => {

  const { password ,student: studentData } = req.body

  // call service func to send this data
  const result = await UserServices.createStudentIntoDB( password, studentData)

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  })

})

 export const UserControllers = {
    createStudent
  }