package com.getinfo.error;

import java.util.HashMap;
import java.util.Map;

public class ErrorRegistry {
    private static final Map<ErrorKey, ErrorDetail> errorMap = new HashMap<>();

    static {
        errorMap.put(ErrorKey.EMPTY_PASSWORD, new ErrorDetail("1", "is empty", "password is empty"));
        errorMap.put(ErrorKey.EMPTY_USERNAME, new ErrorDetail("2", "is empty", "username is empty"));
        errorMap.put(ErrorKey.EMPTY_PARAMETERS, new ErrorDetail("3", "is empty", "parameters block is empty"));
        errorMap.put(ErrorKey.EMPTY_PARAM_KEY, new ErrorDetail("4", "is empty", "paramKey is empty"));
        errorMap.put(ErrorKey.EMPTY_PARAM_VALUE, new ErrorDetail("5", "is empty", "paramValue is empty"));
        errorMap.put(ErrorKey.INVALID_CLIENTID, new ErrorDetail("6", "invalid paramValue", "paramValue should contain exactly 8 digits for clientid"));
        errorMap.put(ErrorKey.EMPTY_SERVICEID, new ErrorDetail("7", "is empty", "serviceid is empty"));
        errorMap.put(ErrorKey.INSUFFICIENT_PARAMETERS, new ErrorDetail("8", "insufficient parameters", "two parameter blocks are required"));
        errorMap.put(ErrorKey.NO_CLIENT_ID, new ErrorDetail("8", "clientid is required", "one paramkey must be clientid"));
        errorMap.put(ErrorKey.MULTIPLE_CLIENT_IDS, new ErrorDetail("9", "multiple client ids", "you must input only one clientid parameter"));
        errorMap.put(ErrorKey.NON_UNIQUE_CLIENT_ID, new ErrorDetail("10", "non unique clientid", "user with such clientid is already exist"));
    }

    public static ErrorDetail getError(ErrorKey errorKey) {
        return errorMap.get(errorKey);
    }
}
