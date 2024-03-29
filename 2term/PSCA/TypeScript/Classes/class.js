var Employee = /** @class */ (function () {
    function Employee(code, name) {
        this.empName = name;
        this.empCode = code;
    }
    Employee.prototype.getSalary = function () {
        //logic
        return; //salary
    };
    return Employee;
}());
var first = new Employee(1, 'Artyom');
var second = new Employee(1, 'Vlad');
