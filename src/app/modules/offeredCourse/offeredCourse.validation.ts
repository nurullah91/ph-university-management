import { z } from 'zod'
import { Days } from './offeredCourse.constant'

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/
    return regex.test(time)
  },
  {
    message:
      'Invalid time formate! expected time format "HH:MM" in 24Hours formate',
  },
)

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      section: z.number(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        // startTime: 10:30 => 2002-01-01T10:30
        // endTime: 12:30 => 2002-01-01T12:30

        const start = new Date(`2002-01-01T${body.startTime}:00`)
        const end = new Date(`2002-01-01T${body.endTime}:00`)

        return end > start
      },
      {
        message: 'Start time should be before endTime',
      },
    ),
})

const updateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const startTime = new Date(`2002-01-01T${body.startTime}:00`)
        const endTime = new Date(`2002-01-01T${body.endTime}:00`)

        return startTime > endTime
      },
      {
        message: 'Start time must be before End Time',
      },
    ),
})

export const OfferedCourseValidation = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
}
