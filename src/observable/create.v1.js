// TODO: Defaults
//
// - [ ] No next function provided
// - [ ] No error function provided
// - [ ] No complete function provided
// - [ ] No unsubscribe function provided

// TODO: Method overload
//
// - [x] subscribe({ next, error, complete })
// - [ ] subscribe(next)

// TODO: Flow management
//
// - [ ] No more events after completion
// - [ ] No more events after error

// TODO: Operators
//
// - [ ] Add pipe method

export default (producer) => ({
  subscribe: (observer) => {
    const unsubscribe = producer(observer);
    return { unsubscribe };
  },
});
