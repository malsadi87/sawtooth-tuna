# Catch Package state
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import hashlib
import json
import logging


LOGGER = logging.getLogger(__name__)


PACKAGE_NAMESPACE = hashlib.sha512(
    'catch-package'.encode('utf-8')).hexdigest()[0:6]


def _get_address(catchPackageId):
    adr = hashlib.sha512(str(companyId).encode('utf-8')).hexdigest()[:62]
    LOGGER.info(adr)
    return adr


def _get_package_address(catchPackageId):
    add =  PACKAGE_NAMESPACE + '00' + _get_address(catchPackageId)
    LOGGER.info(add)
    return add


def _deserialize(data):
    return json.loads(data.decode('utf-8'))


def _serialize(data):
    return json.dumps(data, sort_keys=True).encode('utf-8')


class CatchPackageState(object):

    TIMEOUT = 3

    def __init__(self, context):
        self._context = context


    def get_package(self, catchPackageId):
        return self._get_state(_get_package_address(catchPackageId))
    
    def get_context(self):
        return self._context

    
    def set_package(self, catchPackageId, packingDate, palletNum):
        address = _get_package_address(catchPackageId)
        LOGGER.info('set_package_event method')
        LOGGER.info(address)
        state_data = _serialize(
            {   "catchPackageId": catchPackageId,
                "packingDate": packingDate,
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
