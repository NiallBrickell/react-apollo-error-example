import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

const peopleData = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Sara Smith' },
  { id: 3, name: 'Budd Deey' },
];

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      args: {
        name: {
          type: GraphQLString,
        },
      },
      resolve: (root, { name }) => {
        if (name) return peopleData.filter(
          person => person.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
        );
        return peopleData;
      }
    },
  },
});

export const schema = new GraphQLSchema({ query: QueryType });
