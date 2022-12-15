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


def _get_address(pkSpecies):
    adr = hashlib.sha512(str(pkSpecies).encode('utf-8')).hexdigest()[:62]
    LOGGER.info(adr)
    return adr


def _get_species_address(pkSpecies):
    add =  SPECIES_NAMESPACE + '00' + _get_address(pkSpecies)
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

    def get_species(self, pkSpecies):
        return self._get_state(_get_species_address(pkSpecies))

    
    def set_species(self, pkSpecies, quantity, species, packageNum, launchDateTime):
        address = _get_species_address(pkSpecies)
        LOGGER.info('set_species method')
        LOGGER.info(address)
        state_data = _serialize(
            {   "pkSpecies": pkSpecies,
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
