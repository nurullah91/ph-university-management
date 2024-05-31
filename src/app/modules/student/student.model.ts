import { Schema, model } from 'mongoose'
import {
  Guardian,
  LocalGuardian,
  TStudent,
  UserName,
} from './student.interface'

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
})

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
})

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
})

const studentSchema = new Schema<TStudent>({
  id: {
    type: String,
    required: [true, 'ID is required'],
    unique: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  name: userNameSchema,
  gender: { type: String, enum: ['female', 'male'] },
  dateOfBirth: { type: 'String' },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },

  guardian: guardianSchema,

  localGuardian: localGuardianSchema,

  profileImg: { type: String },
  isDeleted: Boolean,
})

export const StudentModel = model<TStudent>('Student', studentSchema)
