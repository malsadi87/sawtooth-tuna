# Using a script to ensure that the tests run in 
# order to handle authentication and dependencies.
npm run test:e2e:authenticate || echo 'TEST FAILED: authenticate' && 
npm run test:e2e:tp:product || echo 'TEST FAILED: product' && 
npm run test:e2e:tp:trip || echo 'TEST FAILED: trip' && 
npm run test:e2e:tp:haul || echo 'TEST FAILED: haul' && 
npm run test:e2e:tp:pallet || echo 'TEST FAILED: pallet' && 
npm run test:e2e:tp:catch-package || echo 'TEST FAILED: catch-package' &&
npm run test:e2e:tp:company || echo 'TEST FAILED: Company' &&
npm run test:e2e:tp:pallet-event || echo 'TEST FAILED: Pallet-event'
npm run test:e2e:tp:species || echo 'TEST FAILED: species'
npm run test:e2e:tp:custom-package || echo 'TEST FAILED: custom-package'
