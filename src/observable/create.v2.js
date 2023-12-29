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
// - [ ] No more events after completion
// - [ ] No more events after error

// TODO: Operators
//
// - [ ] Add pipe method

const noop = () => {};

const isFunction = (x) => typeof x === 'function';

const defaultObserver = {
  next: noop,
  error: (err) => {
    throw new Error(err);
  },
  complete: noop,
};

export default (producer) => ({
  subscribe: (partialObserver) => {
    const observer = isFunction(partialObserver)
      ? { ...defaultObserver, next: partialObserver }
      : { ...defaultObserver, ...partialObserver };

    const unsubscribe = producer(observer) || noop;
    return { unsubscribe };
  },
});
