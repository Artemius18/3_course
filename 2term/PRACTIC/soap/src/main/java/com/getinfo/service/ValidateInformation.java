package com.getinfo.service;

import com.getinfo.dao.ClientDAO;
import com.getinfo.error.ErrorDetail;
import com.getinfo.model.GetInformationArguments;
import com.getinfo.model.GetResponse;
import com.getinfo.util.SOAPErrorUtil;
import com.getinfo.util.ValidationUtil;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import java.util.List;

@WebService
public class ValidateInformation {
    @WebMethod(operationName = "GetInformation")
    public GetResponse getInformation(@WebParam(name = "GetInformationArguments") GetInformationArguments arguments) {
        List<ErrorDetail> errors = ValidationUtil.validateArguments(arguments);

        if (!errors.isEmpty()) {
            SOAPErrorUtil.handleValidationErrors(errors);
        }

        ClientDAO clientDAO = new ClientDAO();
        clientDAO.saveClient(arguments);

        GetResponse response = new GetResponse();
        response.setMSG("OK");
        return response;
    }
}
