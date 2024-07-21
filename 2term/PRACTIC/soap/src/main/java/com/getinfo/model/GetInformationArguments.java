package com.getinfo.model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@XmlRootElement(name = "GetInformationArguments")
public class GetInformationArguments {
    private String password;
    private String username;
    private String serviceId;
    private List<Parameters> parametersList;

    @XmlElement
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @XmlElement
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @XmlElement
    public String getServiceId() {
        return serviceId;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

    @XmlElement(name = "parameters")
    public List<Parameters> getParametersList() {
        return parametersList;
    }

    public void setParametersList(List<Parameters> parametersList) {
        this.parametersList = parametersList;
    }

    //this method is need for database, when i want to save data, but i need PK and its "clientid"
    public int getClientidFromParameters() {
        if (parametersList != null) {
            for (Parameters param : parametersList) {
                if ("clientid".equals(param.getParamKey())) {
                    try {
                        return Integer.parseInt(param.getParamValue());
                    } catch (NumberFormatException e) {
                        e.printStackTrace();
                        return 0;
                    }
                }
            }
        }
        return 0;
    }

}
