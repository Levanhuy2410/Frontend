/* tslint:disable */
export interface ProjectDto {
    Project_Number: number,
    Name: string,
    Customer: string,
    GroupId: number,
    EmployeeVisas: string[],
    Status: string,
    Start_Date: Date,
    End_Date?: Date,
    Row_Version?: number[],
}