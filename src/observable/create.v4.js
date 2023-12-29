// TODO: Defaults
//
// - [x] No next function provided
// - [x] No error function provided
// - [x] No complete function provided
// - [x] No unsubscribe function provided

// TODO: Method overload
//
// - [x] subscribe({ next, error, complete })
// - [x] subscribe(next)

// TODO: Flow management
//
// - [x] No more events after completion
// - [x] No more events after error

// TODO: Operators
//
// - [x] Add pipe method

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
