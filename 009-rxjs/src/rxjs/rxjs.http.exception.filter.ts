import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from "@nestjs/common";
import {Response} from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = exception.getStatus();
        const res = exception.getResponse();

        const data =
            typeof res === "string" ? res : (res as any).message ?? res;

        response
            .status(status)
            .json({
                timestamp: new Date().toISOString(),
                status: "fail",
                data,
                code: status,
            })
    }
}