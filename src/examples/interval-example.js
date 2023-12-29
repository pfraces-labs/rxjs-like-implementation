import { interval } from '../observable/observable';

export default () => {
  const subscription = interval(1000).subscribe((value) => {
    console.log(value);
  });

  setTimeout(() => {
    subscription.unsubscribe();
  }, 5000);
};
