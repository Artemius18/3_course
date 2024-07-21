package Interfaces;

public class Test {
    public static void main(String[] args) {
        Info info1 = new Animal(1);
        Info info2 = new Person("Artyom");
        info1.showInfo();
        info2.showInfo();
    }
}
