import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import GlobalStyle from './styles/GlobalStyle';

import { Nav, NewsList, Spinner } from './components';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      // useErrorBoundary: true,
      // retry: 0,
    },
  },
});

const App = () => (
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Nav />
      <Suspense fallback={<Spinner />}>
        <NewsList />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </RecoilRoot>
);
export default App;
