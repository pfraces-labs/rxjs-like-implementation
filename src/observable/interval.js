import create from './create';

export default (period) =>
  create((subscriber) => {
    let value = 0;

    const intervalId = setInterval(() => {
      subscriber.next(value);
      value = value + 1;
    }, period);

    return () => {
      clearInterval(intervalId);
    };
  });
