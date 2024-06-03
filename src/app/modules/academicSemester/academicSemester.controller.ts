import { NextFunction, Request, RequestHandler, Response } from 'express'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/cathAsync'
import { AcademicSemesterServices } from './academicSemeter.service'

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  )
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  })
})

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB()
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Academic semester retrieved successfully',
    data: result,
  })
})


const getSingleAcademicSemester = catchAsync( async (req, res) =>{
  const {semesterId} = req.params;
  const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved successfully',
    data: result,
  })
})

const updateAcademicSemester = catchAsync( async(req, res) =>{
  const {semesterId} = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(semesterId, req.body);
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is updated successfully',
    data: result,
  })
})
export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester

}
