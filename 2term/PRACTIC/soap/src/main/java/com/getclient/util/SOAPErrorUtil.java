package com.getclient.util;

import com.getclient.error.ErrorDetail;

import javax.xml.namespace.QName;
import javax.xml.soap.*;
import javax.xml.ws.soap.SOAPFaultException;
import java.util.List;

public class SOAPErrorUtil {
    public static void handleValidationErrors(List<ErrorDetail> errors) {
        try {
            SOAPFault soapFault = SOAPFactory.newInstance(SOAPConstants.SOAP_1_1_PROTOCOL).createFault();
            soapFault.setFaultCode("Errors");
            soapFault.setFaultString("Validation Errors");

            Detail detail = soapFault.addDetail();
            for (ErrorDetail error : errors) {
                QName errorName = new QName("", "error");
                QName codeName = new QName("", "code");
                QName infoName = new QName("", "info");
                QName messageName = new QName("", "message");

                SOAPElement errorElement = detail.addChildElement(errorName);
                errorElement.addChildElement(codeName).addTextNode(error.getCode());
                errorElement.addChildElement(infoName).addTextNode(error.getMessage());
                errorElement.addChildElement(messageName).addTextNode(error.getDetail());
            }

            throw new SOAPFaultException(soapFault);
        } catch (SOAPException e) {
            e.printStackTrace();
        }
    }
}
