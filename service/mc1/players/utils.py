from datetime import datetime
from calendar import timegm
from rest_framework_jwt.settings import api_settings


def jwt_payload_handler(player):
    """ Custom payload handler
    Token encrypts the dictionary returned by this function, and can be
    decoded by rest_framework_jwt.utils.jwt_decode_handler
    """
    return {
        'userId': player.pk,
        'username': player.username,
        'exp': datetime.utcnow() + api_settings.JWT_EXPIRATION_DELTA,
        'orig_iat': timegm(
            datetime.utcnow().utctimetuple()
        )
    }


def jwt_response_payload_handler(token, player=None, request=None):
    """ Custom response payload handler.
    This function controlls the custom payload after login or token refresh.
    This data is returned through the web API.
    """
    return {
        'token': token
    }
