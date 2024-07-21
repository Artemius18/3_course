public class Lesson19 {
    public static void main(String[] args) {
        Human human2 = new Human("Danila", 32);
        System.out.println(human2.toString());
    }
}

class Human {
    private String name;
    private int age;


    public Human(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String toString() {
        return name + ", " + age;
    }
}