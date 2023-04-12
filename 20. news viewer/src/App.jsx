import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import GlobalStyle from './styles/GlobalStyle';

import { Nav, NewsList } from './components';

const queryClient = new QueryClient();

const App = () => (
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Nav />
      <NewsList />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </RecoilRoot>
);
export default App;
