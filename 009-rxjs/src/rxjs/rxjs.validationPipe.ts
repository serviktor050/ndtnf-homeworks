import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform {
    public async transform(incomeValues: any, metadata: ArgumentMetadata): Promise<any> {
        const object = plainToInstance(metadata.metatype, incomeValues);
        const errors = await validate(object);

        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }

        return object;
    }
}