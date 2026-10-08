import {Controller, Get, Query, UseInterceptors, UseFilters} from "@nestjs/common";
import { RxjsService } from "./rxjs.service";
import { IParamText } from "./interfaces/text-param";
import {Interceptor} from "./rxjs.interceptor";
import {HttpExceptionFilter} from "./rxjs.http.exception.filter";


@UseInterceptors(Interceptor)
@UseFilters(HttpExceptionFilter)
@Controller("rxjs")
export class RxjsController {
  constructor(private rxjsService: RxjsService) {}

  @Get("repositories/")
  async repositories(@Query() { text, hub }: IParamText) {
    return await this.rxjsService.searchRepositories(text, hub);
  }
}
