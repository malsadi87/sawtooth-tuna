## Hyperledger Sawtooth Sample Application

This example demonstrated a Hyperledger Sawtooth based application used for storing fish. The application provides a GUI through which users can interact with Sawtooth Blockchain to add/retrieve data to/from the ledger.

The current applications has two transaction processors and two transaction handlers. One is responsbile handling transactions related to fish while the other is repsonible for interoperability transaction. This makes it possible for other Blockchains to interact with Sawtooth. Transaction Processors and Handlers are written in Pyhton. 

The main folders within the project are:

1. processor: in this folder you can find all transaction processors and handlers. You will find also payload structure.
2. client: this folder contains the codes repsonsible for handling user requests and it's execusion on Sawtooth.

To run the application, you should have docker running in your machine. You just need to run ( dicker-compose up ) from inside the main folder.
