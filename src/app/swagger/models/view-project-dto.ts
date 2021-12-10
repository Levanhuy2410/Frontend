import { EmployeeDto } from "./employee-dto";
import { ProjectDto } from './project-dto';

export interface ViewProjectDto extends ProjectDto {
    Id?: number,
    Employees?: EmployeeDto[]
}