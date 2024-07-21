package com.getclient.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "GetClientIdentificator")
@XmlAccessorType(XmlAccessType.FIELD)
public class GetClientRequest {
    @XmlElement(name = "clientid")
    private String clientid;

    public String getClientid() {
        return clientid;
    }
    public void setClientid(String clientid) {
        this.clientid = clientid;
    }
}