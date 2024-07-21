package com.getclient.util;

import com.getclient.error.ErrorDetail;
import com.getclient.error.ErrorKey;
import com.getclient.error.ErrorRegistry;

import java.util.ArrayList;
import java.util.List;

public class ClientValidationUtil {

    public static List<ErrorDetail> validateClientId(String clientId) {
        List<ErrorDetail> errors = new ArrayList<>();

        if (clientId == null) {
            errors.add(ErrorRegistry.getError(ErrorKey.NO_CLIENT_ID));
            return errors;
        }

        if (clientId.isEmpty()) {
            errors.add(ErrorRegistry.getError(ErrorKey.EMPTY_CLIENT_ID));
        }
        if (!clientId.matches("\\d{8}")) {
            errors.add(ErrorRegistry.getError(ErrorKey.INVALID_CLIENT_ID));
        }

        return errors;
    }

}
