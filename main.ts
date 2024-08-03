import inquirer from 'inquirer';

class Student {
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }

    enroll_course(course: string) {
        this.courses.push(course);
    }

    view_balance() {
        console.log(`Balance for ${this.name}: ${this.balance}`);
    }

    pay_fees(amount: number) {
        this.balance -= amount;
        console.log(`$${amount} fees paid successfully for ${this.name}`);
    }

    show_status() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}

class StudentManager {
    students: Student[];

    constructor() {
        this.students = [];
    }

    new_student(name: string) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully. Student ID: ${student.id}`);
    }

    enroll_student(student_id: number, course: string) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} successfully`);
        } else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }

    view_student_balance(student_id: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        } else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }

    pay_student_fees(student_id: number, amount: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        } else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }

    show_student_status(student_id: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        } else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }

    find_student(student_id: number) {
        return this.students.find(std => std.id === student_id);
    }
}

async function main() {
    console.log("Welcome to Marri. Student Management System");
    console.log("-".repeat(50)); // Fixed repeat method

    let studentManager = new StudentManager(); // Fixed instance name

    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Show Status",
                    "Exit",
                ]
            }
        ]);

        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name",
                    }
                ]);

                studentManager.new_student(name_input.name);
                break; // Added break statement

            case "Enroll Student":
                let enroll_input = await inquirer.prompt([
                    {
                        name: "id",
                        type: "input",
                        message: "Enter Student ID",
                        validate: (input) => !isNaN(Number(input)) || "Please enter a valid number",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter Course Name",
                    }
                ]);

                studentManager.enroll_student(Number(enroll_input.id), enroll_input.course);
                break;

            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "id",
                        type: "input",
                        message: "Enter Student ID",
                        validate: (input) => !isNaN(Number(input)) || "Please enter a valid number",
                    }
                ]);

                studentManager.view_student_balance(Number(balance_input.id));
                break;

            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "id",
                        type: "input",
                        message: "Enter Student ID",
                        validate: (input) => !isNaN(Number(input)) || "Please enter a valid number",
                    }
                ]);

                studentManager.show_student_status(Number(status_input.id));
                break;

            case "Exit":
                console.log("Exiting...");
                return; // Exit the function to end the program

            default:
                console.log("Invalid option selected.");
                break;
        }
    }
}

main().catch(error => console.error(error));
