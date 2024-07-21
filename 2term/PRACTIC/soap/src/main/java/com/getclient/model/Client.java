package com.getclient.model;

public class Client {
    private String clientId;
    private String username;
    private String serviceId;

    public Client(String clientId, String username, String serviceId) {
        this.clientId = clientId;
        this.username = username;
        this.serviceId = serviceId;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getServiceId() {
        return serviceId;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }
}
