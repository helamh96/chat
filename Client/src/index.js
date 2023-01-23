import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import {Provider} from 'react-redux'
import store from './redux/store'
import "./i18n"
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById('root'))
root.render(<ApolloProvider client={client}><Provider store={store}><App /></Provider></ApolloProvider>)