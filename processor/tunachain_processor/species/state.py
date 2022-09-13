# Species State
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import hashlib
import json
import logging


LOGGER = logging.getLogger(__name__)


SPECIES_NAMESPACE = hashlib.sha512(
    'species'.encode('utf-8')).hexdigest()[0:6]


def _get_address(speciesId):
    adr = hashlib.sha512(str(speciesId).encode('utf-8')).hexdigest()[:62]
    LOGGER.info(adr)
    return adr


def _get_species_address(speciesId):
    add =  SPECIES_NAMESPACE + '00' + _get_address(speciesId)
    LOGGER.info(add)
    return add


def _deserialize(data):
    return json.loads(data.decode('utf-8'))


def _serialize(data):
    return json.dumps(data, sort_keys=True).encode('utf-8')


class SpeciesState(object):

    TIMEOUT = 3

    def __init__(self, context):
        self._context = context

    def get_species(self, speciesId):
        return self._get_state(_get_species_address(speciesId))

    
    def set_species(self, speciesId, quantity, species, packageNum, launchDateTime):
        address = _get_species_address(speciesId)
        LOGGER.info('set_species method')
        LOGGER.info(address)
        state_data = _serialize(
            {   "speciesId": speciesId,
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
