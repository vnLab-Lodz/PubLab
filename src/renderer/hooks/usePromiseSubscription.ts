import React from 'react';

export default function usePromiseSubscription<T>(
  asyncFunction: () => Promise<T>,
  defaultValue: T,
  deps: any[]
): [T, Error | null, boolean] {
  const [state, setState] = React.useState({
    value: defaultValue,
    error: null,
    isPending: true,
  });

  React.useEffect(() => {
    let isSubscribed = true;
    asyncFunction()
      .then((value) =>
        isSubscribed ? setState({ value, error: null, isPending: false }) : null
      )
      .catch((error) =>
        isSubscribed
          ? setState({ value: defaultValue, error, isPending: false })
          : null
      );

    return () => {
      isSubscribed = false;
    };
  }, deps);

  const { value, error, isPending } = state;
  return [value, error, isPending];
}
