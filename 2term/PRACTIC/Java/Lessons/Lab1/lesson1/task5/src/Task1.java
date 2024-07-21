public class Task1 {
    public static void main(String[] args) {
        Car car = new Car();
        car.setColor("black");
        car.setModel("BMW");
        car.setYear(2000);
        System.out.println("Color: " + car.getColor() + ", model: " + car.getModel() + ", year: " + car.getYear());
    }
}
