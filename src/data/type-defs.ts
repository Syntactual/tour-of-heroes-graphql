export const typeDefs = `
  type Query {
    heroes: [Hero]
    hero(id: Int!): Hero
  }

  type Hero {
    id: Int
    name: String
  }
`;
