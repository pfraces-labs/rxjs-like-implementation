const noop = () => {};

const isFunction = (x) => typeof x === 'function';

const mapValues = (obj, iteratee) =>
  Object.keys(obj).reduce(
    (acc, key) => ({ ...acc, [key]: iteratee(obj[key], key, obj) }),
    {},
  );

const defaultObserver = {
  next: noop,
  error: (err) => {
    throw new Error(err);
  },
  complete: noop,
};

const withFlowControl = (observer) => {
  let lastEventType = '';

  return mapValues(observer, (fn, event) => (...args) => {
    if (['error', 'complete'].includes(lastEventType)) {
      return;
    }

    lastEventType = event;
    return fn(...args);
  });
};

export default (producer) => {
  const observable = {
    pipe: (operator) => operator(observable),
    subscribe: (partialObserver) => {
      const observer = isFunction(partialObserver)
        ? { ...defaultObserver, next: partialObserver }
        : { ...defaultObserver, ...partialObserver };

      const unsubscribe = producer(withFlowControl(observer)) || noop;
      return { unsubscribe };
    },
  };

  return observable;
};
