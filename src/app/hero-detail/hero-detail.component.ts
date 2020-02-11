import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../hero';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

const getHeroQuery = gql`
  query getHero($id: Int!) {
    hero(id: $id) {
      id
      name
    }
  }
`;

const saveHeroMutation = gql`
  mutation saveHeroMutation($hero: HeroInput!) {
    saveHero(hero: $hero) {
      id
      name
    }
  }
`;

type HeroResponse = {
  hero: Hero;
};

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  hero$: Observable<Hero>;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.hero$ = this.apollo
      .watchQuery<HeroResponse>({
        query: getHeroQuery,
        variables: {
          id,
        },
      })
      .valueChanges.pipe(map(({ data }) => data.hero));
  }

  goBack(): void {
    this.location.back();
  }

  save(hero: Hero): void {
    const heroInput = {
      id: hero.id,
      name: hero.name,
    };
    this.apollo
      .mutate({
        mutation: saveHeroMutation,
        variables: {
          hero: heroInput,
        },
        refetchQueries: [
          {
            query: getHeroQuery,
            variables: { id: hero.id },
          },
        ],
      })
      .pipe(take(1))
      .subscribe(() => this.goBack());
  }
}
