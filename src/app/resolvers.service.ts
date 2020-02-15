import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './hero';
import { MessageService } from '../app/message.service';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  QueryHeroArgs,
  QuerySearchHeroesArgs,
  MutationUpdateHeroArgs,
  MutationAddHeroArgs,
  MutationDeleteHeroArgs,
} from 'src/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class ResolversService {
  private heroesUrl = 'api/heroes'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  heroes(): Promise<Hero[]> {
    console.log(this.http);
    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(
          _ => this.messageService.add('fetched heroes'),
          catchError(this.handleError<Hero[]>('getHeroes', []))
        )
      )
      .toPromise();
  }

  hero(__, args: QueryHeroArgs): Promise<Hero> {
    const id = args.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http
      .get<Hero>(url)
      .pipe(
        tap(_ => this.messageService.add(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      )
      .toPromise();
  }

  searchHeroes(__, args: QuerySearchHeroesArgs): Promise<Hero[]> {
    const term = args.searchTerm;
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return Promise.resolve([]);
    }
    return this.http
      .get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(x =>
          x.length
            ? this.messageService.add(`found heroes matching "${term}"`)
            : this.messageService.add(`no heroes matching "${term}"`)
        ),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      )
      .toPromise();
  }

  updateHero(__, args: MutationUpdateHeroArgs): Promise<any> {
    const hero = args.hero;
    return this.http
      .put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.messageService.add(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      )
      .toPromise();
  }

  addHero(_, args: MutationAddHeroArgs): Promise<Hero> {
    const name = args.name;
    return this.http
      .post<Hero>(this.heroesUrl, { name } as Hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) =>
          this.messageService.add(`added hero w/ id=${newHero.id}`)
        ),
        catchError(this.handleError<Hero>('addHero'))
      )
      .toPromise();
  }

  deleteHero(__, args: MutationDeleteHeroArgs): Promise<any> {
    const id = args.hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http
      .delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_ => this.messageService.add(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      )
      .toPromise();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.messageService.add(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
