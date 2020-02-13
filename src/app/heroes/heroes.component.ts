import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {
  AddHeroGQL,
  DeleteHeroGQL,
  GetHeroesGQL,
  Hero,
  GetHeroesDocument,
  GetHeroesQuery,
} from '../../generated/graphql';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  constructor(
    private addHeroGQL: AddHeroGQL,
    private deleteHeroGQL: DeleteHeroGQL,
    private getHeroesGQL: GetHeroesGQL
  ) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroes$ = this.getHeroesGQL
      .watch()
      .valueChanges.pipe(map(({ data }) => data.heroes));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.addHeroGQL
      .mutate(
        {
          name,
        },
        {
          update: (store, { data: { addHero } }: any) => {
            const data: GetHeroesQuery = store.readQuery({
              query: GetHeroesDocument,
            });
            data.heroes = [...data.heroes, addHero];
            store.writeQuery({ query: GetHeroesDocument, data });
          },
        }
      )
      .pipe(take(1))
      .subscribe();
  }

  delete(hero: Hero): void {
    this.deleteHeroGQL
      .mutate(
        {
          hero: { id: hero.id, name: hero.name },
        },
        {
          update: store => {
            const data: GetHeroesQuery = store.readQuery({
              query: GetHeroesDocument,
            });
            data.heroes = data.heroes.filter(
              singleHero => singleHero.id !== hero.id
            );
            store.writeQuery({ query: GetHeroesDocument, data });
          },
        }
      )
      .pipe(take(1))
      .subscribe();
  }
}
