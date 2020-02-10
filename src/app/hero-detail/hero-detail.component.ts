import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const getHeroQuery = gql`
  query getHero($id: Int!) {
    hero(id: $id) {
      id
      name
    }
  }
`;

type Response = {
  hero: Hero;
};

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  hero$: Observable<Hero>;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.hero$ = this.apollo
      .watchQuery<Response>({
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

  save(): void {
    // why is this.hero passing null
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }
}
