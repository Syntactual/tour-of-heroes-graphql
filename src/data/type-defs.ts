import gql from 'graphql-tag';

export default gql`
  type Query {
    heroes: [Hero]
    hero(id: Int!): Hero
    searchHeroes(searchTerm: String): [Hero]
  }

  type Mutation {
    saveHero(hero: HeroInput!): Hero
    addHero(name: String!): Hero
    deleteHero(hero: HeroInput!): Hero
  }

  input HeroInput {
    id: Int
    name: String
  }

  type Hero {
    id: Int
    name: String
  }
`;
