#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from 'chalk';


console.log(
  chalk.bold.underline.whiteBright(
    "\t\t\t\t\t\t\nWellcome to  IT WORLD CITY  (Admission Open)\n"
  )
);

enum weekDays {
  monday = "Monday",
  tuesday = "Tuesday",
  wednessday = "Wednessdaay",
  thursday = "Thursday",
  friday = "Friday",
  satureday = "Satureday",
  sunday = "Sunday",
}

enum Courses {
  WebDevelopment = 'Web Development',
  AiEngineer = 'Ai Engineer',
  DataAnalyist = 'Data Analyist',
  CloudDeveloper  = 'Cloud Developer'

}
enum Timings {
  firstTime = '9AM to 12PM',
  secondTime = '2PM to 5PM',
  ThirdTime = '6pM to 10PM'
}
enum PaymentMethod {
  Jazzcash = 'JazCash',
  EasyPasa = 'Easypasa',
  SadaPay = 'SadaPay',
  HBL = 'HBL'
}
enum feeStructure {
  WebDevelopment = 5000,
  AiEngineer = 10000  ,
  DataAnalyist =20000 ,
  CloudDeveloper  =20000,

  }
let weekdays: weekDays;
let courses:Courses ;
let Time:Timings;
let paymentMethod:PaymentMethod ;
let fees:feeStructure;




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
    validate: function(value: string) {
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
    choices:Object.values(Courses),
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
  
if(feeConfirmation.courseFee == 'Okay'){
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
      validate: function(value: string) {
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
    choices:Object.values(PaymentMethod)
    },
    {
      name: "paymentConfirmation",
      type: "list",
      message: "Confirm Payment Of Course",
      choices:['Yes','No']
    }
  ]);

  if (payments.paymentConfirmation == 'Yes' ) {
    console.log( chalk.bold.bgRed.whiteBright(`                          Congratulations! You have Successfully Enrolled in ${selectThings.courseName} Course!                          `));
    let studentStatus = await inquirer.prompt([
      {
        name:'status',
        type:'list',
        choices:['Veiw student status','Exit'],
        message:'Choose option',
    
      }
    ]);
             if (studentStatus.status == 'Veiw student status') {
             let studentDetails= `
                Student Name: ${selectThings.name.toUpperCase()}                    
                Student ID : ${studentID}                                  
                Course   : ${selectThings.courseName}                        
                Class Day :${nextThings.days}                                 
                Class Timing : ${nextThings.timing} `                            
              
                console.log(chalk.yellowBright(studentDetails));
             }
             else{
              console.log(`Thanks For Enrolling in ${selectThings.courseName} Course` );
              
            }
    
    
  }
  else{
    console.log('Thanks For Visiting');
    
  }

} else{   console.log('Thanks For Visiting');}

