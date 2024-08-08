import { Request, Response } from 'express'
import catchAsync from '../../utils/cathAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { OfferedCourseServices } from './offeredCourse.service'

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = OfferedCourseServices.createOfferedCourseIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course is successfully',
    data: result,
  })
})
const getAllOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = OfferedCourseServices.getAllOfferedCoursesFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Offered course is retrieved successfully',
    data: result,
  })
})
const getSingleOfferedCourse = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = OfferedCourseServices.getSingleOfferedCourseFromDB(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course is retrieved successfully',
      data: result,
    })
  },
)
const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = OfferedCourseServices.updateOfferedCoursesIntoDB(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course is updated successfully',
    data: result,
  })
})
const deleteOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = OfferedCourseServices.deleteOfferedCoursesFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course is Deleted successfully',
    data: result,
  })
})

export const OfferedCourseController = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
}
