# Catch state
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import hashlib
import json
import logging


LOGGER = logging.getLogger(__name__)


PACKAGE_NAMESPACE = hashlib.sha512(
    'catch'.encode('utf-8')).hexdigest()[0:6]


def _get_address(pkCatch):
    adr = hashlib.sha512(str(pkCompany).encode('utf-8')).hexdigest()[:62]
    LOGGER.info(adr)
    return adr


def _get_package_address(pkCatch):
    add =  PACKAGE_NAMESPACE + '00' + _get_address(pkCatch)
    LOGGER.info(add)
    return add


def _deserialize(data):
    return json.loads(data.decode('utf-8'))


def _serialize(data):
    return json.dumps(data, sort_keys=True).encode('utf-8')


class CatchState(object):

    TIMEOUT = 3

    def __init__(self, context):
        self._context = context


    def get_package(self, pkCatch):
        return self._get_state(_get_package_address(pkCatch))
    
    def get_context(self):
        return self._context

    
    def set_package(self, pkCatch, updatedDateTime, palletNum):
        address = _get_package_address(pkCatch)
        LOGGER.info('set_package_event method')
        LOGGER.info(address)
        state_data = _serialize(
            {   "pkCatch": pkCatch,
                "updatedDateTime": updatedDateTime,
                "palletNum": palletNum
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
