import httpStatus from "http-status";
import catchAsync from "../../utils/cathAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";


const createAcademicFaculty = catchAsync( async (req, res) =>{
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty is created successfully',
        data: result
    });
});

const getAllAcademicFaculties = catchAsync( async (req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFacultiesFromB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Academic Faculty is retrieved successfully',
        data: result
    });
});

const getSingleAcademicFaculty = catchAsync( async (req, res) =>{
    const {facultyId} = req.params;
    const result = AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty is retrieved successfully',
        data: result
    });
})

const updateAcademicFaculty = catchAsync( async (req, res) =>{
    const {facultyId} = req.params;
    const result = AcademicFacultyServices.updateAcademicFacultyIntoDB(facultyId, req.body,);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty is updated successfully',
        data: result
    });
})

export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}