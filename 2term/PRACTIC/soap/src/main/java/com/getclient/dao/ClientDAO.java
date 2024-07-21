package com.getclient.dao;

import com.getclient.model.Client;
import com.getclient.util.SQLiteConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ClientDAO {

    public Client getClientById(String clientId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Client client = null;

        try {
            conn = SQLiteConnection.getConnection();
            String query = "SELECT clientid, username, serviceid FROM Clients WHERE clientid = ?";
            stmt = conn.prepareStatement(query);
            stmt.setInt(1, Integer.parseInt(clientId));

            rs = stmt.executeQuery();
            if (rs.next()) {
                String username = rs.getString("username");
                String serviceid = rs.getString("serviceid");
                client = new Client(clientId, username, serviceid);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
//            SQLiteConnection.closeConnection();  // Uncomment if needed
        }

        return client;
    }
}
