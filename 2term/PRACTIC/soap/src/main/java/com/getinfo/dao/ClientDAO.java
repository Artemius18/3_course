package com.getinfo.dao;

import com.getinfo.model.GetInformationArguments;
import com.getinfo.util.SQLiteConnection;
import org.mindrot.jbcrypt.BCrypt;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class ClientDAO {

    public void saveClient(GetInformationArguments arguments) {
        Connection conn = null;
        PreparedStatement stmt = null;
        try {
            conn = SQLiteConnection.getConnection();
            String query = "INSERT INTO Clients (clientid, username, password, serviceid) VALUES (?, ?, ?, ?)";
            stmt = conn.prepareStatement(query);
            stmt.setInt(1, arguments.getClientidFromParameters());
            stmt.setString(2, arguments.getUsername());
            stmt.setString(3, hashPassword(arguments.getPassword()));
            stmt.setString(4, arguments.getServiceId());

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private String hashPassword(String plainTextPassword) {
        return BCrypt.hashpw(plainTextPassword, BCrypt.gensalt());
    }
}
