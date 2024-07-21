public class Dog extends Animal {

    String name;

    public void eat() {
        System.out.println("Dog is eating");
    }
    public void bark() {
        System.out.println("I'm barking");
    }

    public void showName() {
        System.out.println(name);
    }

    public void setName(String name) {
        this.name = name;
    }
}
