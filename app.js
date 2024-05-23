#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//Decorating the heading of my project
console.log(chalk.bold.italic.cyanBright("**---** Welcome to Arisha Ghaffar's Student-Management-Project **---**"));
//starting my project
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 1000;
    }
    //enroll a student
    enroll_course(course) {
        this.courses.push(course);
    }
    //viewing student balance
    view_balance() {
        console.log(chalk.bold.italic.yellowBright(`Balance for ${this.name} : ${this.balance}`));
    }
    //methods for student to pay his fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(chalk.bold.italic.cyanBright(`${this.name} Your ${amount} Fees has been paid succesfully`));
        console.log(chalk.bold.greenBright(`Remaining Balance: $${this.balance}`));
    }
    //showing student staatus
    status() {
        console.log(chalk.bold.italic.greenBright(`ID: ${this.id}`));
        console.log(chalk.bold.italic.blueBright(`Name: ${this.name}`));
        console.log(chalk.bold.italic.cyanBright(`Courses: ${this.courses}`));
        console.log(chalk.bold.italic.yellowBright(`Balance: ${this.balance}`));
    }
}
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    //add new student
    add_student(name) {
        let newStudent = new Student(name);
        this.students.push(newStudent);
        console.log(chalk.bold.italic.cyanBright(`Student: ${name} added succesfully. Student ID: ${newStudent.id}`));
    }
    //method to enroll a student in course
    enrollStudent(studentId, course) {
        let student = this.find_Student(studentId);
        if (student) {
            student.enroll_course(course);
            console.log(chalk.bold.italic.greenBright(`${student.name} enrolled in ${course} successfully`));
        }
    }
    //method to view student balance
    view_student_balance(studentId) {
        let student = this.find_Student(studentId);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(chalk.bold.italic.yellowBright("Student not found.Please enter a correct student Id"));
        }
    }
    //method to pay student fees
    pay_student_fees(studentId, amount) {
        let student = this.find_Student(studentId);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log(chalk.bold.italic.yellowBright("Student not found.Please enter a correct student Id"));
        }
    }
    //method to show student status
    show_student_status(studentId) {
        let student = this.find_Student(studentId);
        if (student) {
            student.status();
        }
    }
    //method to find a student by student id
    find_Student(studentId) {
        return this.students.find(std => std.id === studentId);
    }
}
// Main function to run program
async function main() {
    let call_std = new Student_manager();
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
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        //using switch case for user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name",
                    }
                ]);
                call_std.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name",
                    }
                ]);
                call_std.enrollStudent(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                ]);
                call_std.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    { name: "amount",
                        type: "number",
                        message: "Enter a amount to pay",
                    },
                ]);
                call_std.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                ]);
                call_std.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log(chalk.italic.yellowBright("Exiting..."));
                process.exit();
        }
    }
}
//Calling function
main();
