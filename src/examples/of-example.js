import { of } from '../observable/observable';

export default () => {
  of({ foo: 'bar' }).subscribe({
    next: (value) => {
      console.log(value);
    },
    complete: () => {
      console.log('complete');
    },
  });
};
