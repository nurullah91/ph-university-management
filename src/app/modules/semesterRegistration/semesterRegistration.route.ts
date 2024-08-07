import express from 'express'
import { SemesterRegistrationController } from './semesterRegistration.controller'
import validateRequest from '../../middlewares/validateRequest'
import { SemesterRegistrationValidations } from './semesterRegistration.validation'

const router = express.Router()

router.get('/', SemesterRegistrationController.getAllSemesterRegistration)

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
)

export const SemesterRegistrationRoutes = router
