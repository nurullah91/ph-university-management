import express from 'express'
import { AcademicSemesterControllers } from './academicSemester.controller'
import validateRequest from '../../middlewares/validateRequest'
import { academicSemesterValidation } from './academicSemester.validation'

const router = express.Router()

router.post('/create-academic-semester', validateRequest(academicSemesterValidation.createAcademicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester);


router.get('/', AcademicSemesterControllers.getAllAcademicSemester);

router.get('/:semesterId', AcademicSemesterControllers.getSingleAcademicSemester);

router.patch('/:semesterId', validateRequest(academicSemesterValidation.updateAcademicSemesterValidationSchema), AcademicSemesterControllers.updateAcademicSemester);

// router.get('/:studentId', StudentControllers.getSingleStudent)

export const AcademicSemesterRotes = router
