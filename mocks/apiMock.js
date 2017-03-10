import world from './world';

export default function fetchWorld() {
  return new Promise((resolve) => {
    process.nextTick(
      () => resolve(world)
    );
  });
}
