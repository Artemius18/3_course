package com.getclient.error;

import java.util.HashMap;
import java.util.Map;

public class ErrorRegistry {
    private static final Map<ErrorKey, ErrorDetail> errorMap = new HashMap<>();

    static {
        errorMap.put(ErrorKey.EMPTY_CLIENT_ID, new ErrorDetail("1", "is empty", "clientid is empty"));
        errorMap.put(ErrorKey.INVALID_CLIENT_ID, new ErrorDetail("2", "invalid clientid", "clientid should contain exactly 8 digits"));
        errorMap.put(ErrorKey.NO_CLIENT_ID, new ErrorDetail("3", "no clientid", "you must input clientid in request"));
    }

    public static ErrorDetail getError(ErrorKey errorKey) {
        return errorMap.get(errorKey);
    }
}
