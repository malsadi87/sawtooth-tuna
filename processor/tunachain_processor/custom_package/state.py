# Custom Package state
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import hashlib
import json
import logging
from tunachain_processor.catch.state import CatchState



LOGGER = logging.getLogger(__name__)


CUSTOM_PACKAGE_NAMESPACE = hashlib.sha512(
    'custom-package'.encode('utf-8')).hexdigest()[0:6]


def _get_address(pkConsumerPackage):
    adr = hashlib.sha512(str(pkConsumerPackage).encode('utf-8')).hexdigest()[:62]
    LOGGER.info(adr)
    return adr


def _get_custom_package_address(pkConsumerPackage):
    add =  CUSTOM_PACKAGE_NAMESPACE + '00' + _get_address(pkConsumerPackage)
    LOGGER.info(add)
    return add


def _deserialize(data):
    return json.loads(data.decode('utf-8'))


def _serialize(data):
    return json.dumps(data, sort_keys=True).encode('utf-8')


class ConsumerPackageState(object):

    TIMEOUT = 3

    def __init__(self, context):
        self._context = context


    def get_custom_package(self, pkConsumerPackage):
        custom_package = self._get_state(_get_custom_package_address(pkConsumerPackage))
        return custom_package


    
    def set_custom_package(self, pkConsumerPackage, fkPallet, packingDateTime, agent):
        address = _get_custom_package_address(pkConsumerPackage)
        LOGGER.info('set_custom_package method')
        LOGGER.info(address)
        state_data = _serialize(
            {   "pkConsumerPackage":pkConsumerPackage,
                "fkPallet": fkPallet,
                "packingDateTime": packingDateTime,
                "agent": agent
            })
        return self._context.set_state(
            {address: state_data}, timeout=self.TIMEOUT)

    def _get_state(self, address):
        state_entries = self._context.get_state(
            [address], timeout=self.TIMEOUT)   
        if state_entries:
            entry = _deserialize(data=state_entries[0].data)
        else:
            entry = None
        return entry
