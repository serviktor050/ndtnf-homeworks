import { Injectable } from "@nestjs/common";
import {
  firstValueFrom,
  toArray,
  from,
  map,
  mergeAll,
  take,
  catchError,
  throwError,
  Observable,
} from "rxjs";
import axios from "axios";

@Injectable()
export class RxjsService {
  private readonly githubURL = "https://api.github.com/search/repositories?q=";
  private readonly gitlabURL = "https://gitlab.com/api/v4/projects?search=";

  private getGithub(text: string, count: number): Observable<any> {
    return from(axios.get(`${this.githubURL}${text}`))
      .pipe(
        map((res: any) => res.data.items),
        mergeAll(),
      )
      .pipe(
          take(count),
          catchError((err) => {
            console.error(err?.message);
            return throwError(() => new Error(err?.message));
          }),
      );
  }

  private getGitlab(text: string, count: number): Observable<any> {
    return from(axios.get(`${this.gitlabURL}${text}`))
        .pipe(
            map((res: any) => res.data),
            mergeAll(),
        )
        .pipe(
            take(count),
            catchError((err) => {
              console.error(err?.message);
              return throwError(() => new Error(err?.message));
            }),
        );
  }

  async searchRepositories(text: string, hub: string): Promise<any> {
    const source$ =
        hub === 'gitlab'
            ? this.getGitlab(text, 10)
            : this.getGithub(text, 10);
    const data$ = source$.pipe(toArray());
    return await firstValueFrom(data$);
  }
}
