npm run test:e2e:authenticate || echo 'TEST FAILED: Authenticate' && 
npm run test:e2e:tp:product || echo 'TEST FAILED: Product' && 
npm run test:e2e:tp:trip || echo 'TEST FAILED: Trip' && 
npm run test:e2e:tp:haul || echo 'TEST FAILED: Haul' && 
npm run test:e2e:tp:pallet || echo 'TEST FAILED: Pallet' && 
npm run test:e2e:tp:catch-package || echo 'TEST FAILED: CatchPackage' &&
npm run test:e2e:tp:company || echo 'TEST FAILED: Company' &&
npm run test:e2e:tp:pallet-event || echo 'TEST FAILED: Pallet-event'
