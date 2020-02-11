import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  tap,
} from 'rxjs/operators';

import { Hero } from '../hero';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

const searchHeroQuery = gql`
  query searchHeroQuery($searchTerm: String) {
    searchHero(searchTerm: $searchTerm) {
      id
      name
    }
  }
`;

type HeroesResponse = {
  heroes: Hero[];
};

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private apollo: Apollo) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) =>
        this.apollo
          .query<HeroesResponse>({
            query: searchHeroQuery,
            variables: {
              searchTerm: term,
            },
          })
          .pipe(map(({ data }) => data.heroes))
      )
    );
  }
}
