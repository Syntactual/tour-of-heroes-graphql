export const typeDefs = `
  type Query {
    heroes: [Hero]
    hero(id: Int!): Hero
  }

  type Mutation {
    saveHero(hero: saveHeroInput!): Hero
  }

  input saveHeroInput {
    id: Int
    name: String
  }

  type Hero {
    id: Int
    name: String
  }
`;
