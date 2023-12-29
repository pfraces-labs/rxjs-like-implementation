import create from '../observable/create';

export default (predicate) => (observable) =>
  create((observer) => {
    observable.subscribe({
      ...observer,
      next: (value) => {
        if (!predicate(value)) {
          return;
        }

        observer.next(value);
      },
    });
  });
