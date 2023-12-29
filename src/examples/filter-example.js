import { interval } from '../observable/observable';
import { filter } from '../operators/operators';

export default () => {
  interval(1000)
    .pipe(filter((x) => x % 3 === 0))
    .subscribe((x) => {
      console.log(x);
    });
};
