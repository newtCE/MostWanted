"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
        searchByAllTraitsPrompt();
      break;
      default:
    app(people); // restart app
      break;
  }
  


  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Or type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // Print all information
    displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
    displayFamily(person, people);
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}
function searchByAllTraitsPrompt(){
let traitSearchInputArray=[];
let traitSearchInputString=prompt("Please input your search criteria based on the following traits, seperated by a comma, in this format;\nGender, Date of Birth, Height in Inches, Weight, Eye Color, Occupation\nEXAMPLE\nmale, 1/18/1949, 61, 200, green, doctor\n\nAny fields you do not know or wish to search with, input 'NA'\nEXAMPLE\nmale, NA, 61, NA, green, NA").toLowerCase();
traitSearchInputArray=traitSearchInputString.split(",");
let inputArrayLength=traitSearchInputArray.length;
let traitSearchInputArrayClean=[];
for (let i=0; i<inputArrayLength;i++){
    traitSearchInputArrayClean[i]=traitSearchInputArray[i].trim();
}
if(inputArrayLength===6){
    //traitSearchInput=traitSearchInput.forEachtoLowerCase;
    console.log(traitSearchInputArrayClean);
    alert(traitSearchInputArrayClean);
  }

}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);


  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      alert("The function returned true!")
      return true;
    }  
    else{
      //alert("The function returned false!")
      return false;
    }
  })
  console.log(foundPerson);
  // TODO: find the person using the name they entered
  return foundPerson[0];
}

function searchByInfo(information){
  let possibleMatches = [];
  let isMatch = false;

  for(let i = 0; i < people.length; i++){
    if(information[0] === people[i].gender){
      isMatch = true;
    }
    else if(information[0] === "na"){
      isMatch = true;
    }
    else{
      isMatch = false;
      continue;
    }
    if(information[1] === people[i].dob){
      isMatch = true;
    }
    else if(information[1] === "na"){
      isMatch = true;
    }
    else{
      isMatch = false;
      continue;
    }
    if(information[2] === people[i].height){
      isMatch = true;
    }
    else if(information[2] === "na"){
      isMatch = true;
    }
    else{
      isMatch = false;
      continue;
    }
    if(information[3] === people[i].weight){
      isMatch = true;
    }
    else if(information[3] === "na"){
      isMatch = true;
    }
    else{
      isMatch = false;
      continue;
    }
    if(information[4] === people[i].eyeColor){
      isMatch = true;
    }
    else if(information[4] === "na"){
      isMatch = true;
    }
    else{
      isMatch = false;
      continue;
    }
    if(information[5] === people[i].occupation){
      isMatch = true;
    }
    else if(information[5] === "na"){
      isMatch = true;
    }
    else{
      isMatch = false;
      continue;
    }

    if(isMatch === true){
      possibleMatches.push(people[i]);
    }
    else{
      continue;
    }

  }

}

function displayFamily(person, people){
  let parentList = "";
  let foundParent = people.filter(function(person){
  for(let i = 0; i < person.parents.length; i++){
    if(person.parents[i] === people[i].id){
      if(people[i].gender === "male"){
        parentList += "Father: " + people[i].firstName + " " + people[i].lastName;
      }
      else{
        parentList += "Mother: " + people[i].firstName + " " + people[i].lastName;
      }
      return true;
    }  
    else{
      return false;
    }
  }
  })

  if(parentList === ""){
    alert("No parents found.")
  }
  else{
    alert(parentList)
  }
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo = "ID Number: " + person.id + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
