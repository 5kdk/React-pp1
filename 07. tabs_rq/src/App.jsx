import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback, LoadingFallback, TabsHeader, TabsMain } from './components';

const App = () => (
  <>
    <TabsHeader />
    <ErrorBoundary fallback={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <TabsMain />
      </Suspense>
    </ErrorBoundary>
  </>
);

export default App;
