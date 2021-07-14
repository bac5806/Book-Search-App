import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      {/* try this out! <Context created Provider> */}
      <Router>
        <div>
          <Navbar/>
          <Switch>

            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/signin' component={SavedBooks} />

          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;