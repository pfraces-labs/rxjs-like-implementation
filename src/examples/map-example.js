import { interval } from '../observable/observable';
import { map } from '../operators/operators';

export default () => {
  interval(1000)
    .pipe(map((x) => x * 2))
    .subscribe((x) => {
      console.log(x);
    });
};
