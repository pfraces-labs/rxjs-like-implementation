import { create } from '../observable/observable';

export default () => {
  const createLogObserver = (context) => ({
    next: (value) => {
      console.log(`[${context}] next: ${value}`);
    },
    error: (err) => {
      console.log(`[${context}] error: ${err}`);
    },
    complete: () => {
      console.log(`[${context}] complete`);
    },
  });

  const nec = create((observer) => {
    observer.next('foo');
    observer.error('bar');
    observer.complete();
  });

  const nce = create((observer) => {
    observer.next('foo');
    observer.complete();
    observer.error('bar');
  });

  const ecn = create((observer) => {
    observer.error('bar');
    observer.complete();
    observer.next('foo');
  });

  const enc = create((observer) => {
    observer.error('bar');
    observer.next('foo');
    observer.complete();
  });

  const cne = create((observer) => {
    observer.complete();
    observer.next('foo');
    observer.error('bar');
  });

  const cen = create((observer) => {
    observer.complete();
    observer.error('bar');
    observer.next('foo');
  });

  nec.subscribe(createLogObserver('nec'));
  nce.subscribe(createLogObserver('nce'));
  ecn.subscribe(createLogObserver('ecn'));
  enc.subscribe(createLogObserver('enc'));
  cne.subscribe(createLogObserver('cne'));
  cen.subscribe(createLogObserver('cen'));
};
