## Hyperledger Sawtooth Sample Application

This example demonstrated a Hyperledger Sawtooth based application used for storing fish. The application provides a GUI through which users can interact with Sawtooth Blockchain to add/retrieve data to/from the ledger.

The current applications has two transaction processors and two transaction handlers. One is responsbile handling transactions related to fish while the other is repsonible for interoperability transaction. This makes it possible for other Blockchains to interact with Sawtooth. Transaction Processors and Handlers are written in Pyhton. 

The main folders within the project are:

1. processor: in this folder you can find all transaction processors and handlers. You will find also payload structure.
2. client: this folder contains the codes repsonsible for handling user requests and it's execusion on Sawtooth.

To run the application, you should have docker running in your machine. You just need to run ( dicker-compose up ) from inside the main folder.

## Testing

Run test compose file for end to end testing:

`docker-compose -f docker-compose.test.yml up --abort-on-container-exit`

Delete /postgres/db-data-test to run the tests with a fresh database.

The tester will launch the images and run integration testing. To perform more interavtice testing with readable output one may change docker-compose.test.yml with the command line:

`#command: npm run start`

One may then enter the backend container and run tests:

- `docker exec -it tunachain-backend bash`
- `npm run test:e2e`

Individual tests can be runned in the container as well:

- `npm run test:e2e:<testname>`

### These tests are currenty failing:

- Product (e2e) › Can read a product with authentication - known to fail
- Product (e2e) › Cant read a product that doesnt exist - known to fail
- Product (e2e) › Cant overwrite a product with authentication - known to fail
- Trip (e2e) › Cant create a trip with conflicting departure and landing - known to fail
- Trip (e2e) › Can read a trip with authentication - known to fail
- Trip (e2e) › Cant read a trip that doesnt exist - known to fail
- Trip (e2e) › Cant overwrite a trip with authentication - known to fail
- Haul (e2e) › Cant create a haul with conflicting launch and haul known to fail
- Haul (e2e) › Can read a haul with authentication - known to fail
- Haul (e2e) › Cant read a haul that doesnt exist - known to fail
- Haul (e2e) › Can read all hauls with authentication - this fails because the API return lat and long with trailing padding of zeros.
- Haul (e2e) › Cant create a haul without a related trip - fails because of lacking error handling
- 