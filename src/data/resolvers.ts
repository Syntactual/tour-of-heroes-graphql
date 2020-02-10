import { HeroService } from '../app/hero.service';
export class ResolverFactory {
  constructor(private heroService: HeroService) {}
  resolvers = {
    Query: {
      heroes: async () => {
        const heroes = await this.heroService.getHeroes().toPromise();
        return heroes;
      },
    },
  };
  getResolvers() {
    return this.resolvers;
  }
}
