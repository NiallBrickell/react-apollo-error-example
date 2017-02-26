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
        search: {
          type: GraphQLString,
        },
      },
      resolve: (root, { search }) => {
        if (search) return peopleData.filter(
          person => person.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
        ).map(person => ({
          ...person,
          test: 'fake',
        }));
        return peopleData;
      }
    },
  },
});

export const schema = new GraphQLSchema({ query: QueryType });
