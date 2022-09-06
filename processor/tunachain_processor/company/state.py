# Company State
#
# Written by Mohammed Alsadi
# -----------------------------------------------------------------------------

import hashlib
import json
import logging


LOGGER = logging.getLogger(__name__)


COMPANY_NAMESPACE = hashlib.sha512(
    'company'.encode('utf-8')).hexdigest()[0:6]
LOGGER.info(COMPANY_NAMESPACE)    


def _get_address(companyId):
    adr = hashlib.sha512(companyId.encode('utf-8')).hexdigest()[:62]
    LOGGER.info(adr)
    return adr


def _get_company_address(companyId):
    add =  COMPANY_NAMESPACE + '00' + _get_address(companyId)
    LOGGER.info(add)
    return add


def _deserialize(data):
    return json.loads(data.decode('utf-8'))


def _serialize(data):
    return json.dumps(data, sort_keys=True).encode('utf-8')


class CompanyState(object):

    TIMEOUT = 3

    def __init__(self, context):
        self._context = context

    def get_company(self, companyId):
        LOGGER.info('Get Company method')
        return self._get_state(_get_company_address(companyId))

    
    def set_company(self, companyId, companyName, companyAddress, contactInfo):
        address = _get_company_address(companyId)
        LOGGER.info('set_company method')
        LOGGER.info(address)
        state_data = _serialize(
            {   "companyId": companyId,
                "companyName": companyName,
                "companyAddress": companyAddress,
                "contactInfo": contactInfo
            })
        return self._context.set_state(
            {address: state_data}, timeout=self.TIMEOUT)

    def _get_state(self, address):
        LOGGER.info('Get Company _get_state method')
        state_entries = self._context.get_state(
            [address], timeout=self.TIMEOUT)
        if state_entries:
            entry = _deserialize(data=state_entries[0].data)
        else:
            entry = None
        return entry
