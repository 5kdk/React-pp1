import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback, LoadingFallback, TabsHeader, TabsMain } from './components';

const App = () => (
  <ErrorBoundary fallback={ErrorFallback}>
    <Suspense fallback={<LoadingFallback />}>
      <TabsHeader />
      <TabsMain />
    </Suspense>
  </ErrorBoundary>
); 

export default App;
