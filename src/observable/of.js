import create from './create';

export default (value) =>
  create((subscriber) => {
    subscriber.next(value);
    subscriber.complete();
  });
