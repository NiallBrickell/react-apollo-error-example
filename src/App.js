import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
// import { setSearch } from './actions';

class App extends Component {
  render() {
    // Added keys in updateQuery not reflected in props
    const { loading, people, setSearch, test } = this.props;
    console.log(test);
    console.log(people && people[0] && people[0].test);
    console.log(people && people[0] && people[0].test2);
    return (
      <main>
        <header>
          <h1>Apollo Client Error Template</h1>
          <p>
            This is a template that you can use to demonstrate an error in Apollo Client.
            Edit the source code and watch your browser window reload with the changes.
          </p>
          <p>
            The code which renders this component lives in <code>./src/App.js</code>.
          </p>
          <p>
            The GraphQL schema is in <code>./src/graphql/schema</code>.
            Currently the schema just serves a list of people with names and ids.
          </p>
        </header>
        <input
            type="text"
            placeholder="Name..."
            onChange={e => setSearch(e.target.value)}
        />
        {loading ? (
          <p>Loading…</p>
        ) : (
          <ul>
            {people.map(person => (
              <li key={person.id}>
                {person.name}
              </li>
            ))}
          </ul>
        )}
      </main>
    );
  }
}

const GQLApp = graphql(
  gql`
    query getPeople($search: String, $includeTest: Boolean!) {
      people(search: $search) {
        id
        name
        test @include(if: $includeTest)
      }
    }
  `, {
    options: ({ search }) => ({
      variables: {
        search,
        includeTest: false,
      },
    }),
    props: ({ data, ownProps }) => ({
      ...ownProps,
      ...data,

      setSearch: str => data.fetchMore({
        variables: {
          search: str,
          includeTest: true,
        },
        updateQuery: (prev, { fetchMoreResult }) => ({
          test: 'test',
          people: fetchMoreResult.data.people.map(person => ({
            ...person,
            test2: 'fake2',
          })),
        }),
      }),
    }),
  }
)(App)

export default connect(state => ({
    search: state.search,
}), {  })(GQLApp);
