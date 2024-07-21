package com.getclient.service;

import com.getclient.dao.ClientDAO;
import com.getclient.model.Client;
import com.getclient.model.GetClientResponse;

public class ClientServiceHelper {

    public static void handleClientResponse(GetClientResponse response, String clientId) {
        ClientDAO clientDAO = new ClientDAO();
        Client client = clientDAO.getClientById(clientId);

        if (client == null) {
            response.setMSG("No users with such clientid");
        } else {
            response.setClientid(client.getClientId());
            response.setUsername(client.getUsername());
            response.setServiceid(client.getServiceId());
        }
    }
}
