// Attempt to re-run individual tests when they fail
const retries = 3;
console.log('==========================');
console.log(
  `Running Jest with retries: will retry failing tests ${retries} time(s).`
);
console.log('==========================');
jest.retryTimes(retries);
