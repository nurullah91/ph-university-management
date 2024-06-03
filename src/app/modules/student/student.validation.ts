import { z } from 'zod'

// UserName schema
const userNameValidationSchema = z.object({
  firstName: z.string().nonempty({ message: 'First name is required' }),
  middleName: z.string().optional(),
  lastName: z.string().nonempty({ message: 'Last name is required' }),
})

// Guardian schema
const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty({ message: 'Father name is required' }),
  fatherOccupation: z
    .string()
    .nonempty({ message: 'Father occupation is required' }),
  fatherContactNo: z
    .string()
    .nonempty({ message: 'Father contact number is required' }),
  motherName: z.string().nonempty({ message: 'Mother name is required' }),
  motherOccupation: z
    .string()
    .nonempty({ message: 'Mother occupation is required' }),
  motherContactNo: z
    .string()
    .nonempty({ message: 'Mother contact number is required' }),
})

// LocalGuardian schema
const localGuardianValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Local guardian name is required' }),
  occupation: z
    .string()
    .nonempty({ message: 'Local guardian occupation is required' }),
  contactNo: z
    .string()
    .nonempty({ message: 'Local guardian contact number is required' }),
})

// TStudent schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      user: z.string().nonempty({ message: 'User reference is required' }),

      name: userNameValidationSchema,
      gender: z.enum(['female', 'male']).optional(),
      dateOfBirth: z.date().optional(),
      email: z.string().email({ message: 'Invalid email address' }),
      contactNo: z.string().nonempty({ message: 'Contact number is required' }),
      emergencyContactNo: z
        .string()
        .nonempty({ message: 'Emergency contact number is required' }),
      bloodGroup: z
        .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
        .optional(),
      presentAddress: z
        .string()
        .nonempty({ message: 'Present address is required' }),
      permanentAddress: z
        .string()
        .nonempty({ message: 'Permanent address is required' }),

      guardian: guardianValidationSchema,

      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
})

export const studentValidations = {
  createStudentValidationSchema,
}
