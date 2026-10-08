import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {catchError, map, Observable, of} from "rxjs";

@Injectable()
export class Interceptor implements NestInterceptor {
    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        return next
        .handle()
        .pipe(
            map((data)=> {
                return {
                    status: "success",
                    data: data
                }
            }),
            catchError((err) =>
                of({
                    status: "fail",
                    data: err?.message,
                }),
            ),
        )
    }
}