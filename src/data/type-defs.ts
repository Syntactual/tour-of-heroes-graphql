export const typeDefs = `
  type Query {
    heroes: [Hero]
  }

  type Hero {
    id: Int
    name: String
  }
`;
