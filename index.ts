#! /usr/bin/env node
import inquirer from "inquirer";

class Student {
  static counter = 10000;
  id: number;
  name: string;
  courses: String[];
  balance: number;

  constructor(name: string) {
    this.id = Student.counter++;
    this.name = name;
    this.courses = []; // initialize emptiy array for courses
    this.balance = 100;
  }

  // method to enroll a student in courses

  enroll_course(course: string) {
    this.courses.push(course);
  }

  // method to view balance

  view_balance() {
    console.log(`Balance for ${this.name}: $${this.balance}`);
  }

  // method to pay fees

  pay_fees(amount: number) {
    this.balance -= amount;
    console.log(`$${amount} fees paid sucessfully for ${this.name}`);
    console.log(`Remaining Balance : $${this.balance}`);
  }

  // Method to show status

  show_status() {
    console.log(`id: ${this.id}`);
    console.log(`Name: ${this.name}`);
    console.log(`Courses: ${this.courses}`);
    console.log(`Balance: ${this.balance}`);
  }
}

// class for student manager
class Student_manager {
  students: Student[];

  constructor() {
    this.students = [];
  }

  //    method to add anew student
  add_Student(name: string) {
    let studentVaribale = new Student(name);
    this.students.push(studentVaribale);
    console.log(
      `Student: ${name} added successfully. Student ID: ${studentVaribale.id}`
    );
  }

  // method to enroll a course a student in a course

  enroll_Student(student_id: number, course: string) {
    let std_found = this.find_student(student_id);

    if (std_found) {
      std_found.enroll_course(course);
      console.log(`${std_found.name} enrolled in ${course} successfully`);
    }
  }

  // method to view a student balance

  view_Student_Balance(student_id: number) {
    let std_found = this.find_student(student_id);
    if (std_found) {
      std_found.view_balance();
    } else {
      console.log(" student not found. please enter a correct student ID");
    }
  }

  // method to pay student fee
  pay_Student_Fee(st_id: number, amount: number) {
    let std_found = this.find_student(st_id);
    if (std_found) {
      std_found.pay_fees(amount);
    } else {
      console.log("student not found. please enter a correct student ID");
    }
  }

  // method to display student status

  show_Student_Status(student_id: number) {
    let std_found = this.find_student(student_id);
    if (std_found) {
      std_found.show_status();
    }
  }

  // method to find a student by id
  find_student(student_id: number) {
    return this.students.find((std) => std.id === student_id);
  }
}

// main function to run the program

async function main() {
  console.log("Welcome to 'Code With Zohaib' - Student Managment System");
  console.log("-".repeat(50));

  let student_manager = new Student_manager();

  //    while loop
  while (true) {
    let choice = await inquirer.prompt([
      {
        name: "Choice",
        type: "list",
        message: "Select an Option",
        choices: [
          "Add Student",
          "Enrol Student",
          "View Student Balance",
          "Pay Fess",
          "Show Status",
          "Exit",
        ],
      },
    ]);

    // using switch cases

    switch (choice.Choice) {
      case "Add Student":
        let name_input = await inquirer.prompt([
          {
            name: "name",
            type: "input",
            message: "Enter a student name",
          },
        ]);
        student_manager.add_Student(name_input.name);
        break;

      // Case Enrol student;
      case "Enrol Student":
        let enroll_input = await inquirer.prompt([
          {
            name: "student_ID",
            type: "number",
            message: "Enter a Student ID",
          },
          {
            name: "Course",
            type: "input",
            message: "Enter a Course Name",
          },
        ]);
        student_manager.enroll_Student(
          enroll_input.student_ID,
          enroll_input.Course
        );
        break;

      // Case View student balane
      case "View Student Balance":
        let balance_input = await inquirer.prompt([
          {
            name: "Student_ID",
            type: "number",
            message: "Enter a Student ID",
          },
        ]);
        student_manager.view_Student_Balance(balance_input.Student_ID);
        break;

      // Case Pay fees
      case "Pay Fess":
        let fess_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter a Student ID",
          },
          {
            name: "Amount",
            type: "number",
            message: "Enter a Amount to Pay Fess",
          },
        ]);
        student_manager.pay_Student_Fee(
          fess_input.student_id,
          fess_input.Amount
        );
        break;

      // Case Show Status

      case "Show Status":
        let status_input = await inquirer.prompt([
          {
            name: "student_iD",
            type: "number",
            message: "Enter a Student ID",
          },
        ]);
        student_manager.show_Student_Status(status_input.student_iD);
        break;

      // Case Exit
      case "Exit":
        console.log("Exiting!!!");
        process.exit();
    }
  }
}
 
// Calling a main function
main();
