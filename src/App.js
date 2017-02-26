import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
// import { setSearch } from './actions';

class App extends Component {
  render() {
    // Rendering isn't called with new props after updateQuery
    console.log(this.props.test);
    const { loading, people, setSearch } = this.props;
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
    query getPeople($search: String) {
      people(search: $search) {
        id
        name
      }
    }
  `, {
    options: ({ search }) => ({
      variables: {
        search,
      },
    }),
    props: ({ data, ownProps }) => ({
      ...ownProps,
      ...data,

      setSearch: str => data.fetchMore({
        variables: {
          search: str,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          console.log('updating');
          return {
            test: 'fake',
          };
        },
      }),
    }),
  }
)(App)

export default connect(state => ({
    search: state.search,
}), {  })(GQLApp);
