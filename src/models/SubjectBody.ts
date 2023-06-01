import { Status } from "@prisma/client";

export default interface SubjectBody {
    name: string;
    teacher: string;
    grade: number;
}
