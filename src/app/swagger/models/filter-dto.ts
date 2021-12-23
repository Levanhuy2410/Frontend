import { DateFilter } from './date-filter-dto';
export interface FilterDto {
    Detail?: string,
    Status?: string,
    Project_Leader?: string,
    Members?: string
    Start_Date?: DateFilter,
    End_Date?: DateFilter
}