import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { StudentRoutes } from "../modules/student/student.route";
import { AcademicSemesterRotes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRouters } from "../modules/academicFaculty/academicFaculty.route";

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
        path: '/academic-semesters',
        route: AcademicSemesterRotes
    },
    {
        path: '/academic-faculties',
        route: AcademicFacultyRouters
    },
]


moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;