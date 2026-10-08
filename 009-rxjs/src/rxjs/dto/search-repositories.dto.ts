import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum Hub {
    GITHUB = "github",
    GITLAB = "gitlab",
}

export class SearchRepositoriesDto {
    @IsString()
    @IsNotEmpty()
    text: string;

    @IsEnum(Hub)
    hub: Hub;
}