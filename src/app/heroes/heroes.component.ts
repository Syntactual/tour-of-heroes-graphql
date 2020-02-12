import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, take } from 'rxjs/operators';

const getHeroesQuery = gql`
  query {
    heroes {
      id
      name
    }
  }
`;

const addHeroMutation = gql`
  mutation addHeroMutation($name: String!) {
    addHero(name: $name) {
      id
      name
    }
  }
`;

const deleteHeroMutation = gql`
  mutation deleteHeroMutation($hero: HeroInput!) {
    deleteHero(hero: $hero) {
      id
      name
    }
  }
`;

type HeroesResponse = {
  heroes: Hero[];
};

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  constructor(private apollo: Apollo, private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroes$ = this.apollo
      .watchQuery<HeroesResponse>({
        query: getHeroesQuery,
      })
      .valueChanges.pipe(map(({ data }) => data.heroes));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.apollo
      .mutate({
        mutation: addHeroMutation,
        variables: {
          name,
        },
        update: (store, { data: { addHero } }: any) => {
          // Read the data from our cache for this query.
          const data: HeroesResponse = store.readQuery({
            query: getHeroesQuery,
          });
          data.heroes = [...data.heroes, addHero];
          // Write our data back to the cache.
          store.writeQuery({ query: getHeroesQuery, data });
        },
      })
      .pipe(take(1))
      .subscribe();
  }

  delete(hero: Hero): void {
    this.apollo
      .mutate({
        mutation: deleteHeroMutation,
        variables: {
          hero: { id: hero.id, name: hero.name },
        },
        update: store => {
          // Read the data from our cache for this query.
          const data: HeroesResponse = store.readQuery({
            query: getHeroesQuery,
          });
          data.heroes = data.heroes.filter(h => h.id !== hero.id);
          // Write our data back to the cache.
          store.writeQuery({ query: getHeroesQuery, data });
        },
      })
      .pipe(take(1))
      .subscribe();
  }
}
