import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema } from 'graphql-tools';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HeroService } from '../app/hero.service';
import { typeDefs } from '../data/type-defs';
import { Hero } from './hero';

export function createApollo(heroService: HeroService) {
  const resolvers = {
    Query: {
      heroes: () => heroService.getHeroes().toPromise(),
      hero: (_, args) => heroService.getHero(args.id).toPromise(),
    },
    Mutation: {
      saveHero: (_, args) => heroService.updateHero(args.hero).toPromise(),
      addHero: (_, args) =>
        heroService.addHero({ name: args.name } as Hero).toPromise(),
      deleteHero: (_, args) => heroService.deleteHero(args.hero).toPromise(),
    },
  };
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  return {
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
    resolvers: {},
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HeroService],
    },
  ],
})
export class GraphQLModule {}
