//Problem 1
let empl = '{ "employees" : [' +
'{ "firstName":"Sam" , "department":"Tech" , "designation":"Manager" , "salary":"40000" , "raiseEligible":"true"},' +
'{ "firstName":"Mary" , "department":"Finance" , "designation":"Trainee" , "salary":"18500" , "raiseEligible":"true"},' +
//problem 3
'{ "firstName":"Anna" , "department":"Tech" , "designation":"Executive" , "salary":"25600" , "raiseEligible":"false"},' +
'{ "firstName":"Bill" , "department":"HR" , "designation":"Executive" , "salary":"21200" , "raiseEligible":"false"} ]}';

const obj = JSON.parse(empl);
console.log("Problem 1");
console.log(obj);


//Problem 2
let comp = '{ "company" : [' +
'{ "companyName":"Tech Stars" , "website":"www.techstars.site" , "employees":"array of Employees"} ]}';

const obja = JSON.parse(comp);
console.log("Problem 2")
console.log(comp);

comp['employees'] = obj

//Problem 4
console.log("Problem 4")
console.log("Total Salary:")
console.log(parseInt(obj["employees"][0]["salary"]) + parseInt(obj["employees"][1]["salary"]) + parseInt(obj["employees"][2]["salary"]) + parseInt(obj["employees"][3]["salary"]));


//Problem 5
console.log("Problem 5")

function giveRaise(obj) {
  for (let i = 0; i < obj.employees.length; i++) {
    if (obj.employees[i].raiseEligible === "true") {
      obj.employees[i].salary = parseInt(obj.employees[i].salary) * 1.1;
      obj.employees[i].raiseEligible = "false";
    }
  }
}

giveRaise(obj);
console.log(obj);

console.log("NEW Total Salary:")
console.log(parseInt(obj["employees"][0]["salary"]) + parseInt(obj["employees"][1]["salary"]) + parseInt(obj["employees"][2]["salary"]) + parseInt(obj["employees"][3]["salary"]));

//Problem 6
console.log("Problem 6");

const workingFromHome = ['Anna', 'Sam'];

for (let i = 0; i < obj.employees.length; i++) {
  if (workingFromHome.includes(obj.employees[i].firstName)) {
    obj.employees[i].wfh = true;
  } else {
    obj.employees[i].wfh = false;
  }
}

console.log(obj);
