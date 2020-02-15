import gql from 'graphql-tag';

export default gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    heroes: [Hero]
    hero(id: Int!): Hero
    searchHeroes(searchTerm: String): [Hero]
  }

  type Mutation {
    updateHero(hero: HeroInput!): Hero
    addHero(name: String!): Hero
    deleteHero(hero: HeroInput!): Hero
  }

  input HeroInput {
    id: Int!
    name: String!
  }

  type Hero {
    id: Int!
    name: String!
  }
`;
