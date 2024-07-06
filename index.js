#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from 'chalk';
console.log(chalk.bold.underline.whiteBright("\t\t\t\t\t\t\nWellcome to  IT WORLD CITY  (Admission Open)\n"));
var weekDays;
(function (weekDays) {
    weekDays["monday"] = "Monday";
    weekDays["tuesday"] = "Tuesday";
    weekDays["wednessday"] = "Wednessdaay";
    weekDays["thursday"] = "Thursday";
    weekDays["friday"] = "Friday";
    weekDays["satureday"] = "Satureday";
    weekDays["sunday"] = "Sunday";
})(weekDays || (weekDays = {}));
var Courses;
(function (Courses) {
    Courses["WebDevelopment"] = "Web Development";
    Courses["AiEngineer"] = "Ai Engineer";
    Courses["DataAnalyist"] = "Data Analyist";
    Courses["CloudDeveloper"] = "Cloud Developer";
})(Courses || (Courses = {}));
var Timings;
(function (Timings) {
    Timings["firstTime"] = "9AM to 12PM";
    Timings["secondTime"] = "2PM to 5PM";
    Timings["ThirdTime"] = "6pM to 10PM";
})(Timings || (Timings = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["Jazzcash"] = "JazCash";
    PaymentMethod["EasyPasa"] = "Easypasa";
    PaymentMethod["SadaPay"] = "SadaPay";
    PaymentMethod["HBL"] = "HBL";
})(PaymentMethod || (PaymentMethod = {}));
var feeStructure;
(function (feeStructure) {
    feeStructure[feeStructure["WebDevelopment"] = 5000] = "WebDevelopment";
    feeStructure[feeStructure["AiEngineer"] = 10000] = "AiEngineer";
    feeStructure[feeStructure["DataAnalyist"] = 20000] = "DataAnalyist";
    feeStructure[feeStructure["CloudDeveloper"] = 20000] = "CloudDeveloper";
})(feeStructure || (feeStructure = {}));
let weekdays;
let courses;
let Time;
let paymentMethod;
let fees;
//   func   that genrate Student Id..
function generateStudentID() {
    const min = 1001;
    const max = 4999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Example usage:
const studentID = generateStudentID();
let selectThings = await inquirer.prompt([
    {
        name: "name",
        type: "input",
        message: "What is your name",
        validate: function (value) {
            const nameRegex = /^[A-Za-z\s]+$/;
            if (value.trim() !== '' && nameRegex.test(value)) {
                return true;
            }
            return "Please enter a valid  Name  without numbers or special characters.";
        }
    },
    {
        name: "courseName",
        type: "list",
        choices: Object.values(Courses),
        message: "Choose your Course",
    },
]);
// Access the course fee dynamically
const selectedCourse = selectThings.courseName;
const courseFee = feeStructure[selectedCourse.replace(' ', '')]; // Assuming the key in feeStructure matches the course name without spaces
// Prompt for course fee confirmation
let feeConfirmation = await inquirer.prompt([
    {
        name: "courseFee",
        type: "list",
        choices: ['Okay', 'No'],
        message: chalk.bgBlue(`\n\tCourse Fees: ${courseFee}/-`),
    }
]);
if (feeConfirmation.courseFee == 'Okay') {
    let nextThings = await inquirer.prompt([
        {
            name: "days",
            type: "list",
            choices: Object.values(weekDays),
            message: "select your day!",
        },
        {
            name: "timing",
            type: "list",
            choices: Object.values(Timings),
            message: "Choose your timing",
        },
        {
            name: "contactNo",
            type: "input",
            message: "Enter your Contact Number",
            validate: function (value) {
                const numberRegex = /^\d{11}$/;
                if (numberRegex.test(value)) {
                    return true;
                }
                return "Please enter a valid contact number with exactly 11 digits.";
            }
        }
    ]);
    let payments = await inquirer.prompt([
        {
            name: "paymentmethod",
            type: "list",
            message: "Choose Payment Method.",
            choices: Object.values(PaymentMethod)
        },
        {
            name: "paymentConfirmation",
            type: "list",
            message: "Confirm Payment Of Course",
            choices: ['Yes', 'No']
        }
    ]);
    if (payments.paymentConfirmation == 'Yes') {
        console.log(chalk.bold.bgRed.whiteBright(`                          Congratulations! You have Successfully Enrolled in ${selectThings.courseName} Course!                          `));
        let studentStatus = await inquirer.prompt([
            {
                name: 'status',
                type: 'list',
                choices: ['Veiw student status', 'Exit'],
                message: 'Choose option',
            }
        ]);
        if (studentStatus.status == 'Veiw student status') {
            let studentDetails = `
                Student Name: ${selectThings.name.toUpperCase()}                    
                Student ID : ${studentID}                                  
                Course   : ${selectThings.courseName}                        
                Class Day :${nextThings.days}                                 
                Class Timing : ${nextThings.timing} `;
            console.log(chalk.yellowBright(studentDetails));
        }
        else {
            console.log(`Thanks For Enrolling in ${selectThings.courseName} Course`);
        }
    }
    else {
        console.log('Thanks For Visiting');
    }
}
else {
    console.log('Thanks For Visiting');
}
