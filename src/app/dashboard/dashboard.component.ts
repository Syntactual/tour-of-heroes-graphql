import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetHeroesGQL, Hero } from '../../generated/graphql';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  constructor(private getHeroesGQL: GetHeroesGQL) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroes$ = this.getHeroesGQL
      .watch()
      .valueChanges.pipe(map(({ data }) => data.heroes.slice(1, 5)));
  }
}
