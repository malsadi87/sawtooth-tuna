# Payload for PALLET_EVENT
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import json
import logging

from sawtooth_sdk.processor.exceptions import InvalidTransaction

LOGGER = logging.getLogger(__name__)

class PalletEventPayload(object):

    def __init__(self, payload):
        try:
            data = json.loads(payload.decode('utf-8'))
        except ValueError:
            raise InvalidTransaction("Invalid payload serialization")
        LOGGER.info(data)


        pkPallet = data.get('pkPallet')
        eventTime = data.get('eventTime')
        temperature = data.get('temperature')
        location = data.get('location')
        tilt = data.get('tilt')
        shock = data.get('shock')

        if not pkPallet:
            raise InvalidTransaction('Pallet Number is required')

        if not eventTime:
            raise InvalidTransaction('Event Time is required')

        if not temperature:
            raise InvalidTransaction('Temperature is required')

        if not location:
            raise InvalidTransaction('Location is required')

        if not tilt:
            raise InvalidTransaction('Tilt is required')

        if not shock:
            raise InvalidTransaction('Shock is required')                       
        
        self._pkPallet = pkPallet
        self._eventTime = eventTime
        self._temperature = temperature
        self._location = location
        self._tilt = tilt
        self._shock = shock
       
       
    @property
    def pkPallet(self):
        return self._pkPallet

    @property
    def eventTime(self):
        return self._eventTime

    @property
    def temperature(self):
        return self._temperature        
    
    @property
    def location(self):
        return self._location
    
    @property
    def tilt(self):
        return self._tilt

    @property
    def shock(self):
        return self._shock    