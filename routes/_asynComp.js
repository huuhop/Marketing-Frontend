import React, { PureComponent, Suspense, lazy } from "react";
import FullScreenLoading from "~/components/Base/FullScreenLoading";

export default (ImportComponent) => {
  const LazyComp = lazy(ImportComponent);

  class AsyncComponent extends PureComponent {
    render() {
      return (
        <Suspense fallback={<FullScreenLoading />}>
          <LazyComp {...this.props} />
        </Suspense>
      );
    }
  }

  return AsyncComponent;
};
