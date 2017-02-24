import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class App extends Component {
  render() {
    const { loading, people, search } = this.props;
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
            onChange={e => search(e.target.value)}
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

export default graphql(
  gql`
    query getPeople($name: String) {
      people(name: $name) {
        id
        name
      }
    }
  `, {
    props: ({ data }) => ({
      ...data,
      search: str => data.fetchMore({
        variables: {
          name: str,
        },
        updateQuery: (prev, { fetchMoreResult }) => ({
          ...prev,
          ...fetchMoreResult.data,
        }),
      })
    }),
  }
)(App)
