# Speciess State
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import hashlib
import json
import logging


LOGGER = logging.getLogger(__name__)


SPECIESS_NAMESPACE = hashlib.sha512(
    'speciess'.encode('utf-8')).hexdigest()[0:6]
LOGGER.info(SPECIESS_NAMESPACE)    


def _get_address(speciessId):
    adr = hashlib.sha512(speciessId.encode('utf-8')).hexdigest()[:62]
    LOGGER.info(adr)
    return adr


def _get_speciess_address(speciessId):
    add =  SPECIESS_NAMESPACE + '00' + _get_address(speciessId)
    LOGGER.info(add)
    return add


def _deserialize(data):
    return json.loads(data.decode('utf-8'))


def _serialize(data):
    return json.dumps(data, sort_keys=True).encode('utf-8')


class SpeciessState(object):

    TIMEOUT = 3

    def __init__(self, context):
        self._context = context

    def get_speciess(self, speciessId):
        return self._get_state(_get_speciess_address(speciessId))

    
    def set_speciess(self, speciessId, quantity, species, packageNum, launchDateTime):
        address = _get_speciess_address(speciessId)
        LOGGER.info('set_speciess method')
        LOGGER.info(address)
        state_data = _serialize(
            {   "speciessId": speciessId,
                "quantity": quantity,
                "species": species,
                "packageNum": packageNum,
                "launchDateTime": launchDateTime
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
