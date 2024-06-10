import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { StudentRoutes } from "../modules/student/student.route";
import { AcademicSemesterRotes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRouters } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRouters } from "../modules/academicDepartment/academicDepartment.route";
import { FacultyRoutes } from "../modules/faculty/faculty.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { CourseRoutes } from "../modules/course/course.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/students',
        route: StudentRoutes
    },
    {
        path: '/faculties',
        route: FacultyRoutes
    },
    {
        path: '/admins',
        route: AdminRoutes
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRotes
    },
    {
        path: '/academic-faculties',
        route: AcademicFacultyRouters
    },   
    {
        path: '/academic-departments',
        route: AcademicDepartmentRouters
    },
    {
        path: '/courses',
        route: CourseRoutes
    },
    
]


moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;