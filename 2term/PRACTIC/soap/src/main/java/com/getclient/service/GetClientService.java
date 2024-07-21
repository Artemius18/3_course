package com.getclient.service;

import com.getclient.dao.ClientDAO;
import com.getclient.error.ErrorDetail;
import com.getclient.error.ErrorKey;
import com.getclient.error.ErrorRegistry;
import com.getclient.model.Client;
import com.getclient.model.GetClientRequest;
import com.getclient.model.GetClientResponse;
import com.getclient.util.ClientValidationUtil;
import com.getclient.util.SOAPErrorUtil;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import java.util.List;

@WebService
public class GetClientService {

    @WebMethod(operationName = "GetClientIdentificator")
    public GetClientResponse getClient(@WebParam(name = "GetClientId") GetClientRequest request) {
        GetClientResponse response = new GetClientResponse();

        String clientid = request.getClientid();

        List<ErrorDetail> errors = ClientValidationUtil.validateClientId(clientid);
        if (!errors.isEmpty()) {
            SOAPErrorUtil.handleValidationErrors(errors);
            return response;
        }
        ClientServiceHelper.handleClientResponse(response, clientid);

        return response;
    }
}

