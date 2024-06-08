import { Schema, model } from 'mongoose'
import {
  Guardian,
  LocalGuardian,
  TStudent,
  UserName,
} from './student.interface'
import { boolean } from 'zod'

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
  dateOfBirth: {
    type: Date,
    required: false,
  },
  email: { type: String, required: true , unique: true},
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
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
  },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
},
{
  toJSON: {
    virtuals: true,
  },
},
);

// virtual
studentSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// Query Middleware
studentSchema.pre('find', function (next) {
  this.find({isDeleted: {$ne: true}});
  next();
})

export const Student = model<TStudent>('Student', studentSchema)
