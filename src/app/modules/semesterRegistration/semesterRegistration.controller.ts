import { Request, Response } from 'express'
import catchAsync from '../../utils/cathAsync'
import { SemesterRegistrationServices } from './semesterRegistration.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
        req.body,
      )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration is created successfully',
      data: result,
    })
  },
)

const getAllSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationServices.getAllSemesterRegistrationsFromDB()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration is created successfully',
      data: result,
    })
  },
)

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
}
