import { Request, Response } from 'express'
import catchAsync from '../../utils/cathAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { OfferedCourseServices } from './offeredCourse.service'

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course is created successfully',
    data: result,
  })
})
const getAllOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.getAllOfferedCoursesFromDB(
    req.query,
  )

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
    const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id)

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
  const result = await OfferedCourseServices.updateOfferedCoursesIntoDB(
    id,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course is updated successfully',
    data: result,
  })
})
const deleteOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await OfferedCourseServices.deleteOfferedCoursesFromDB(id)

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
