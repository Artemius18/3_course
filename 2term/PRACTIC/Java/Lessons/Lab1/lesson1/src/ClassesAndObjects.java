public class ClassesAndObjects {
    public static void main(String[] args) {
        Person artyom = new Person();
        artyom.setName("Artyom");
        artyom.setAge(20);

        Person danila = new Person();
        danila.setName("Danila");
        danila.setAge(30);
    }
}

class Person {
    private String name;
    private int age;

    void speak() {
        System.out.println("My name is " + name + ", I'm " + age);
    }

    void sayHello() {
        System.out.println("Hello");
    }

    int calculateYearsToRetirement() {
        int years = 65 - age;
        return years;
    }


    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
