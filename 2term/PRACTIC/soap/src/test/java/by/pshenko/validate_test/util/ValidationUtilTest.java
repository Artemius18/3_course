package by.pshenko.validate_test.util;

import com.getinfo.error.ErrorDetail;
import com.getinfo.error.ErrorKey;
import com.getinfo.error.ErrorRegistry;
import com.getinfo.model.GetInformationArguments;
import com.getinfo.model.Parameters;
import com.getinfo.util.SOAPErrorUtil;
import com.getinfo.util.ValidationUtil;
import org.junit.Test;
import org.w3c.dom.NodeList;

import javax.xml.soap.Detail;
import javax.xml.ws.soap.SOAPFaultException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class ValidationUtilTest {

    @Test
    public void validateArguments_AllFieldsValid() {
        GetInformationArguments arguments = ValidationUtilTestHelper.createValidArguments();

        List<ErrorDetail> errors = ValidationUtil.validateArguments(arguments);
        assertTrue(errors.isEmpty());
    }

    @Test
    public void validateArguments_MissingPassword() {
        GetInformationArguments arguments = ValidationUtilTestHelper.createValidArguments();
        arguments.setPassword(null);

        List<ErrorDetail> errors = ValidationUtil.validateArguments(arguments);
        assertErrorCode(ErrorKey.EMPTY_PASSWORD, errors);
    }

    @Test
    public void validateArguments_MissingUsername() {
        GetInformationArguments arguments = ValidationUtilTestHelper.createValidArguments();
        arguments.setUsername(null);

        List<ErrorDetail> errors = ValidationUtil.validateArguments(arguments);
        assertErrorCode(ErrorKey.EMPTY_USERNAME, errors);
    }

    @Test
    public void validateArguments_MissingServiceId() {
        GetInformationArguments arguments = ValidationUtilTestHelper.createValidArguments();
        arguments.setServiceId(null);

        List<ErrorDetail> errors = ValidationUtil.validateArguments(arguments);
        assertErrorCode(ErrorKey.EMPTY_SERVICEID, errors);
    }

    @Test
    public void validateArguments_InvalidClientId() {
        GetInformationArguments arguments = ValidationUtilTestHelper.createValidArguments();
        Parameters param1 = new Parameters();
        param1.setParamKey("clientid");
        param1.setParamValue("123d45678"); // INVALID VALUE (MUST BE 8 DIGITS)
        arguments.getParametersList().add(param1);

        List<ErrorDetail> errors = ValidationUtil.validateArguments(arguments);
        assertErrorCode(ErrorKey.INVALID_CLIENTID, errors);
    }

    @Test
    public void validateArguments_AnyParamValueExceptClientId() {
        GetInformationArguments arguments = ValidationUtilTestHelper.createValidArguments();
        Parameters param1 = new Parameters();
        param1.setParamKey("text");
        param1.setParamValue("12345dfdfd678987654321");
        arguments.getParametersList().add(param1);

        List<ErrorDetail> errors = ValidationUtil.validateArguments(arguments);
        assertTrue(errors.isEmpty());
    }

    @Test
    public void validateArguments_MissingBothParametersBlocks() {
        GetInformationArguments arguments = ValidationUtilTestHelper.createValidArguments();
        arguments.setParametersList(null);

        List<ErrorDetail> errors = ValidationUtil.validateArguments(arguments);
        assertErrorCode(ErrorKey.INSUFFICIENT_PARAMETERS, errors);
    }

    @Test
    public void testHandleValidationErrors() {
        List<ErrorDetail> errors = new ArrayList<>();
        errors.add(ErrorRegistry.getError(ErrorKey.EMPTY_PARAM_KEY));
        errors.add(ErrorRegistry.getError(ErrorKey.EMPTY_SERVICEID));
        try {
            SOAPErrorUtil.handleValidationErrors(errors);
            fail("Expected SOAPFaultException was not thrown");
        } catch (SOAPFaultException e) {
            assertEquals("Errors", e.getFault().getFaultCode());
            assertEquals("Validation Errors", e.getFault().getFaultString());

            Detail detail = e.getFault().getDetail();
            NodeList errorElements = detail.getElementsByTagName("error");
            assertEquals(2, errorElements.getLength());
        }
    }
    private void assertErrorCode(ErrorKey expectedKey, List<ErrorDetail> errors) {
        String expectedErrorCode = ErrorRegistry.getError(expectedKey).getCode();
        assertEquals(expectedErrorCode, errors.get(0).getCode());
    }
}
