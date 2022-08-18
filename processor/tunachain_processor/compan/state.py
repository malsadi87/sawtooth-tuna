# Compan State
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import hashlib
import json
import logging


LOGGER = logging.getLogger(__name__)


COMPANY_NAMESPACE = hashlib.sha512(
    'compan'.encode('utf-8')).hexdigest()[0:6]
LOGGER.info(COMPANY_NAMESPACE)    


def _get_address(companId):
    adr = hashlib.sha512(companId.encode('utf-8')).hexdigest()[:62]
    LOGGER.info(adr)
    return adr


def _get_compan_address(companId):
    add =  COMPANY_NAMESPACE + '00' + _get_address(companId)
    LOGGER.info(add)
    return add


def _deserialize(data):
    return json.loads(data.decode('utf-8'))


def _serialize(data):
    return json.dumps(data, sort_keys=True).encode('utf-8')


class CompanState(object):

    TIMEOUT = 3

    def __init__(self, context):
        self._context = context

    def get_compan(self, companId):
        return self._get_state(_get_compan_address(companId))

    
    def set_compan(self, companId, companName, companAddress, contactInfo):
        address = _get_compan_address(companId)
        LOGGER.info('set_compan method')
        LOGGER.info(address)
        state_data = _serialize(
            {   "companId": companId,
                "companName": companName,
                "companAddress": companAddress,
                "contactInfo": contactInfo
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