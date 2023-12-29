import { create } from '../observable/observable';

export default () => {
  const counter = create((subscriber) => {
    let value = 0;

    const intervalId = setInterval(() => {
      subscriber.next(value);
      value = value + 1;
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  const subscription = counter.subscribe((value) => {
    console.log(value);
  });

  setTimeout(() => {
    subscription.unsubscribe();
  }, 5000);
};
