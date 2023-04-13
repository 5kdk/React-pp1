import { Spinner } from '.';

const ScrollObserver = ({ hasNextPage = true, observer = null }) => (
  <div ref={observer}>{hasNextPage && <Spinner />}</div>
);

export default ScrollObserver;
