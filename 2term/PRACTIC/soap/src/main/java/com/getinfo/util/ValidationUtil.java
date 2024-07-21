package com.getinfo.util;

import com.getinfo.error.ErrorDetail;
import com.getinfo.error.ErrorRegistry;
import com.getinfo.error.ErrorKey;

import com.getinfo.model.GetInformationArguments;
import com.getinfo.model.Parameters;

import javax.xml.namespace.QName;
import javax.xml.soap.*;
import javax.xml.ws.soap.SOAPFaultException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ValidationUtil {
    public static List<ErrorDetail> validateArguments(GetInformationArguments arguments) {
        List<ErrorDetail> errors = new ArrayList<>();

        errors.addAll(validateRequiredFields(arguments));
        errors.addAll(validateParameters(arguments.getParametersList()));

        return errors;
    }
    private static List<ErrorDetail> validateRequiredFields(GetInformationArguments arguments) {
        List<ErrorDetail> errors = new ArrayList<>();

        if (!validateField(arguments.getPassword())) {
            errors.add(ErrorRegistry.getError(ErrorKey.EMPTY_PASSWORD));
        }
        if (!validateField(arguments.getUsername())) {
            errors.add(ErrorRegistry.getError(ErrorKey.EMPTY_USERNAME));
        }
        if (!validateField(arguments.getServiceId())) {
            errors.add(ErrorRegistry.getError(ErrorKey.EMPTY_SERVICEID));
        }
        return errors;
    }
    private static List<ErrorDetail> validateParameters(List<Parameters> parametersList) {
        List<ErrorDetail> errors = new ArrayList<>();
        final String CLIENT_ID = "clientid";

        if (parametersList == null || parametersList.size() < 2) {
            errors.add(ErrorRegistry.getError(ErrorKey.INSUFFICIENT_PARAMETERS));
        } else {
            boolean clientIdFound = false;
            boolean clientIdUnique = true;
            List<String> clientIdList = new ArrayList<>();

            for (Parameters parameters : parametersList) {
                if (!validateField(parameters.getParamKey())) {
                    errors.add(ErrorRegistry.getError(ErrorKey.EMPTY_PARAM_KEY));
                }
                if (!validateField(parameters.getParamValue())) {
                    errors.add(ErrorRegistry.getError(ErrorKey.EMPTY_PARAM_VALUE));
                }
                if (CLIENT_ID.equals(parameters.getParamKey())) {
                    if (clientIdFound) {
                        clientIdUnique = false;
                    }
                    clientIdFound = true;
                    if (!validateClientId(parameters.getParamValue())) {
                        errors.add(ErrorRegistry.getError(ErrorKey.INVALID_CLIENTID));
                    }
                    if (!isUniqueClientId(parameters.getParamValue())) {
                        errors.add(ErrorRegistry.getError(ErrorKey.NON_UNIQUE_CLIENT_ID));
                    }
                    if (!clientIdList.contains(parameters.getParamValue())) {
                        clientIdList.add(parameters.getParamValue());
                    } else {
                        clientIdUnique = false;
                    }
                }
            }

            if (!clientIdFound) {
                errors.add(ErrorRegistry.getError(ErrorKey.NO_CLIENT_ID));
            }

            if (!clientIdUnique) {
                errors.add(ErrorRegistry.getError(ErrorKey.MULTIPLE_CLIENT_IDS));
            }
        }
        return errors;
    }
    private static boolean validateField(String field) {
        return field != null && !field.isEmpty();
    }
    private static boolean validateClientId(String clientId) {
        return clientId != null && clientId.matches("\\d{8}");
    }

    private static boolean isUniqueClientId(String clientId) {
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        boolean isUnique = true;

        try {
            connection = SQLiteConnection.getConnection();
            String query = "SELECT COUNT(*) AS count FROM Clients WHERE clientid = ?";
            statement = connection.prepareStatement(query);
            statement.setString(1, clientId);
            resultSet = statement.executeQuery();

            if (resultSet.next()) {
                int count = resultSet.getInt("count");
                if (count > 0) {
                    isUnique = false;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return isUnique;
    }

}

