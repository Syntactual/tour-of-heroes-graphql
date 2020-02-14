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
    messages: [Message]
  }

  type Mutation {
    updateHero(hero: HeroInput!): Message
    addHero(name: String!): Hero
    deleteHero(hero: HeroInput!): Message
    clearMessages: Message
  }

  input HeroInput {
    id: Int!
    name: String!
  }

  type Hero {
    id: Int!
    name: String!
  }

  type Message {
    body: String!
  }
`;
