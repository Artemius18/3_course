package by.pshenko.validate_test.util;

import com.getinfo.model.GetInformationArguments;
import com.getinfo.model.Parameters;

import java.util.ArrayList;
import java.util.List;

public class ValidationUtilTestHelper {

    public static GetInformationArguments createValidArguments() {
        GetInformationArguments arguments = new GetInformationArguments();
        arguments.setPassword("password");
        arguments.setUsername("username");
        arguments.setServiceId("service123");

        Parameters param1 = new Parameters();
        param1.setParamKey("clientid");
        param1.setParamValue("00000000");

        Parameters param2 = new Parameters();
        param2.setParamKey("otherKey");
        param2.setParamValue("someValue");

        List<Parameters> paramsList = new ArrayList<>();
        paramsList.add(param1);
        paramsList.add(param2);

        arguments.setParametersList(paramsList);

        return arguments;
    }
}
