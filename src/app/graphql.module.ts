import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema } from 'graphql-tools';
import { InMemoryCache } from 'apollo-cache-inmemory';
import resolvers from '../data/resolvers';
import { typeDefs } from '../data/type-defs';

export function createApollo() {
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
      deps: [],
    },
  ],
})
export class GraphQLModule {}
