package com.getclient.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "GetClientResponse")
@XmlAccessorType(XmlAccessType.FIELD)
public class GetClientResponse {
    @XmlElement(name = "clientid")
    private String clientid;

    @XmlElement(name = "username")
    private String username;

    @XmlElement(name = "serviceid")
    private String serviceid;
    @XmlElement(name = "MSG")
    private String MSG;

    public String getClientid() {
        return clientid;
    }

    public void setClientid(String clientid) {
        this.clientid = clientid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getServiceid() {
        return serviceid;
    }

    public void setServiceid(String serviceid) {
        this.serviceid = serviceid;
    }

    public String getMSG() {
        return MSG;
    }

    public void setMSG(String MSG) {
        this.MSG = MSG;
    }

}
