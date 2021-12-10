import { PagingInfoDto } from "./paging-info-dto";
import { ViewProjectDto } from "./view-project-dto";

export interface ProjectListDto {
    Projects?: ViewProjectDto[],
    PagingInfo?: PagingInfoDto,
}