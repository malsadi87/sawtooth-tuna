# Copyright 2018 Intel Corporation
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# -----------------------------------------------------------------------------

import argparse
import sys

from sawtooth_sdk.processor.core import TransactionProcessor
from sawtooth_sdk.processor.log import init_console_logging

from tunachain_processor.handler import TunachainTransactionHandler
from tunachain_processor.meta_handler import MetadataTransactionHandler
from tunachain_processor.pallet.handler import PalletTransactionHandler
from tunachain_processor.product.handler import ProductTransactionHandler
from tunachain_processor.trip.handler import TripTransactionHandler
from tunachain_processor.haul.handler import HaulTransactionHandler
from tunachain_processor.pallet_event.handler import PalletEventTransactionHandler
from tunachain_processor.catch_package.handler import CatchPackageTransactionHandler
from tunachain_processor.species.handler import SpeciesTransactionHandler
from tunachain_processor.custom_package.handler import CustomPackageTransactionHandler
from tunachain_processor.company.handler import CompanyTransactionHandler
from tunachain_processor.box.handler import BoxTransactionHandler

import logging


LOGGER = logging.getLogger(__name__)

def parse_args(args):
    parser = argparse.ArgumentParser(
        formatter_class=argparse.RawTextHelpFormatter)

    parser.add_argument(
        '-C', '--connect',
        default='tcp://localhost:4004',
        help='Endpoint for the validator connection')

    parser.add_argument(
        '-v', '--verbose',
        action='count',
        default=0,
        help='Increase output sent to stderr')

    return parser.parse_args(args)


def main(args=None):
    if args is None:
        args = sys.argv[1:]
    opts = parse_args(args)
    processor = None
    try:
        processor = TransactionProcessor(url=opts.connect)
        
        LOGGER.info('processor is initalised ')
        LOGGER.info(opts)
        init_console_logging(verbose_level=opts.verbose)

        #handler = TunachainTransactionHandler()

        #Metadata handler
       # handler2 = MetadataTransactionHandler()

        palletHandler = PalletTransactionHandler()
        productHandler = ProductTransactionHandler()
        tripHandler = TripTransactionHandler()
        haulHandler = HaulTransactionHandler()
        LOGGER.info('Haul Transaction Handler is initialsed')
        LOGGER.info(haulHandler)
        eventHandler = PalletEventTransactionHandler()
        catchHandler = CatchPackageTransactionHandler()
        speciesHandler = SpeciesTransactionHandler()
        LOGGER.info('Species Transaction Handler is initialsed')
        LOGGER.info(speciesHandler)
        customHandler  = CustomPackageTransactionHandler()
        companyHandler = CompanyTransactionHandler()
        boxHandler = BoxTransactionHandler()

        #processor.add_handler(handler)
        #processor.add_handler(handler2)
        processor.add_handler(palletHandler)
        processor.add_handler(productHandler)
        processor.add_handler(tripHandler)
        processor.add_handler(haulHandler)
        LOGGER.info('Haul Transaction Handler is registered')
        processor.add_handler(eventHandler)
        processor.add_handler(catchHandler)
        processor.add_handler(speciesHandler)
        LOGGER.info('Species Transaction Handler is registered')
        processor.add_handler(customHandler)
        processor.add_handler(companyHandler)
        processor.add_handler(boxHandler)

        processor.start()
    except KeyboardInterrupt:
        pass
    except Exception as err:  # pylint: disable=broad-except
        print("Error: {}".format(err))
    finally:
        if processor is not None:
            processor.stop()
