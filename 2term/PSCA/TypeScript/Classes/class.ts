class Employee {
    empCode: number;
    empName: string;

    constructor(code: number, name: string) {
        this.empName = name;
        this.empCode = code;
    }

    getSalary() : number {
        //logic
        return //salary
    }
}

let first = new Employee(1, 'Artyom');
let second = new Employee(1, 'Vlad');
