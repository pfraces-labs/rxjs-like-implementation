import create from '../observable/create';

export default (project) => (observable) =>
  create((observer) => {
    observable.subscribe({
      ...observer,
      next: (value) => {
        observer.next(project(value));
      },
    });
  });
