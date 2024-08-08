import express from 'express'
import { SemesterRegistrationController } from './semesterRegistration.controller'
import validateRequest from '../../middlewares/validateRequest'
import { SemesterRegistrationValidations } from './semesterRegistration.validation'

const router = express.Router()

router.get('/', SemesterRegistrationController.getAllSemesterRegistration)

router.get('/:id', SemesterRegistrationController.getSingleSemesterRegistration)

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
)

router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
)

export const SemesterRegistrationRoutes = router
