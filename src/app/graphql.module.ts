import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions } from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema } from 'graphql-tools';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ResolversService } from '../app/resolvers.service';
import typeDefs from '../data/type-defs';
import { Resolvers } from '../generated/graphql';

export function createApollo(
  resolversService: ResolversService
): ApolloClientOptions<any> {
  const resolvers: Resolvers = {
    Query: {
      heroes: () => resolversService.heroes(),
      hero: (_, args) => resolversService.hero(_, args),
      searchHeroes: (_, args) => resolversService.searchHeroes(_, args),
    },
    Mutation: {
      updateHero: (_, args) => resolversService.updateHero(_, args),
      addHero: (_, args) => resolversService.addHero(_, args),
      deleteHero: (_, args) => resolversService.deleteHero(_, args),
    },
  };

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  return {
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [ResolversService],
    },
  ],
})
export class GraphQLModule {}
