import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GetHeroGQL,
  SaveHeroGQL,
  Hero,
  GetHeroDocument,
  GetHeroQuery,
} from '../../generated/graphql';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  hero$: Observable<Hero>;
  sub: Subscription;

  constructor(
    private getHeroGphQL: GetHeroGQL,
    private saveheroGphQL: SaveHeroGQL,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.hero$ = this.getHeroGphQL
      .watch({ id })
      .valueChanges.pipe(map(({ data }) => data.hero));
  }

  goBack(): void {
    this.location.back();
  }

  save(hero: Hero): void {
    this.sub = this.saveheroGphQL
      .mutate(
        {
          hero: { id: hero.id, name: hero.name },
        },
        {
          update: store => {
            const data: GetHeroQuery = store.readQuery({
              query: GetHeroDocument,
              variables: { id: hero.id },
            });
            data.hero = hero;
            store.writeQuery({ query: GetHeroDocument, data });
          },
        }
      )
      .subscribe(() => this.goBack());
  }
}
