import java.io.FileWriter;
import java.io.IOException;
import java.sql.*;

public class Main {
    //D:
    //cd BSTU\2course\2term\JAVA\Lab_6\src
    //javac Main.java
    //java -classpath mssql-jdbc-12.2.0.jre11.jar;. Main
    //String connectionUrl = "jdbc:sqlserver://ARTYOM;databaseName=Java_lab6;trustServerCertificate=true;encrypt=false;IntegratedSecurity=false";


    public static void main(String[] args) {
        DatabaseQueryExecutor executor = new DatabaseQueryExecutor();

        System.out.println("Вывести информацию обо всех жителях заданного города, разговаривающих на заданном языке:\n");
        executor.printResidentsInfoByCityAndLanguage("Витебск", "Белорусский");
        System.out.println('\n');

        System.out.println("Вывести информацию обо всех городах, в которых проживают жители выбранного типа:\n");
        executor.printCitiesByResidentLanguage("Английский");
        System.out.println('\n');

        System.out.println("Информация о городе с заданным количеством населения и всех типах жителей, в нем проживающих:\n");
        executor.printCityInfoByPopulation(2141000);
        System.out.println('\n');

        System.out.println("Информация о самом древнем типе жителей:\n");
        executor.printOldestResidentsInfo();
    }

}
