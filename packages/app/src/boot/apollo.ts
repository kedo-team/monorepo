import { boot } from 'quasar/wrappers';
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context';
import { useUser } from 'src/stores/user';

const user = useUser();

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL
})

const authLink = setContext((_, { headers }) => {
  const token = user.jwt;
  return {
    headers: {
      ...headers,
      ...(token ? {authorization: `Bearer ${token}`} : null)
    }
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})


export default boot(({ app }) => {
  app.provide(DefaultApolloClient,  apolloClient )
});
