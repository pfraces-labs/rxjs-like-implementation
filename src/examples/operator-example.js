import { interval, create } from '../observable/observable';

export default () => {
  interval(1000)
    .pipe((observable) =>
      create((observer) => {
        observable.subscribe({
          ...observer,
          next: (value) => {
            observer.next(value * 2);
          },
        });
      }),
    )
    .subscribe((x) => {
      console.log(x);
    });
};
