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
        searchByAllTraitsPrompt(people);
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

  checkIfNull(displayOption);
  
  switch(displayOption){
    case "info":
    // Print all information
    displayPerson(person);
    break;
    case "family":
    // Print immediate family memebers
    displayFamily(person, people);
    break;
    case "descendants":
    // Print list of all decendants
    let descendantList = "Descendants: \n";
    displayDescendants(findDescendants(person, people, descendantList));
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

function searchByAllTraitsPrompt(people){
  let traitSearchInputArray=[];
  let traitSearchInputString=prompt("Please input your search criteria based on the following traits, seperated by a comma, in this format;\nGender, Date of Birth, Height in Inches, Weight, Eye Color, Occupation\nEXAMPLE\nmale, 1/18/1949, 61, 200, green, doctor\n\nAny fields you do not know or wish to search with, input 'NA'\nEXAMPLE\nmale, NA, 61, NA, green, NA").toLowerCase();
  
  checkIfNull(traitSearchInputString);
  
  traitSearchInputArray=traitSearchInputString.split(",");
  let inputArrayLength=traitSearchInputArray.length;
  let traitSearchInputArrayClean=[];
  
  for (let i=0; i<inputArrayLength;i++){
      traitSearchInputArrayClean[i]=traitSearchInputArray[i].trim();
  }
  
  if(inputArrayLength===6){
      let nevCheck=traitSearchInputArrayClean.filter(checkIfNA);
      if (nevCheck.length<6){
        searchByInfo(traitSearchInputArrayClean,people);
      }
      else{
        console.log("Hi, Nevin.");
        alert("No traits to search!");
        searchByAllTraitsPrompt(people);
      }

    }
    else{
      searchByAllTraitsPrompt(people);
    }
}

function checkIfNA(entry){
  return entry==="na";
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  checkIfNull(firstName);
  checkIfNull(lastName);


  let foundPerson = people.filter(function(person){
    if(person.firstName.toLowerCase() === firstName.toLowerCase() && person.lastName.toLowerCase() === lastName.toLowerCase()){
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

function searchByInfo(information,people){
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
  
  if (possibleMatches.length === 0){
    alert("Found No Matches with that criteria!");
    searchByAllTraitsPrompt(people);
  }
  else{
  selectFromInformationSearchMatches(possibleMatches,people);
  }
}

function selectFromInformationSearchMatches(possibleMatches,people){
  let matchesToDisplayArray = [];
  let matchesToDisplayString = "";  

  for (let i=0;i<possibleMatches.length;i++){
    matchesToDisplayArray[i]=(i+1)+") "+possibleMatches[i].firstName+" "+possibleMatches[i].lastName+"\n";
  }

  matchesToDisplayString = matchesToDisplayArray.join("");
  let userResultChoice = 0
  userResultChoice = prompt("Please input the number that matches the result you'd like to further inspect:\n"+matchesToDisplayString);
  checkIfNull(userResultChoice);
  let userResultChoiceNumber = parseInt(userResultChoice);

  if (userResultChoiceNumber < 1|| userResultChoiceNumber > (possibleMatches.length) || Number.isNaN(userResultChoiceNumber)){
      selectFromInformationSearchMatches(possibleMatches,people);
  }
  else  {
      mainMenu(possibleMatches[userResultChoiceNumber - 1], people);
  }
}

function displayFamily(targetPerson, people){
  let parentList = "";
  let siblingList = "";
  let spouse = "";
  let j = 0;
  let parentFound = false;

  // Run through array of parents until all parents are identified
  for(let i = 0; i < targetPerson.parents.length; i++){
    console.log(targetPerson.parents[i]);

    while(parentFound === false){
      console.log(people[j].id);

      if(targetPerson.parents[i] === people[j].id){
        if(people[j].gender === "male"){
          parentList += "Father: " + people[j].firstName + " " + people[j].lastName + "\n";
        }
        else{
          parentList += "Mother: " + people[j].firstName + " " + people[j].lastName + "\n";
        }

        parentFound = true;
      }

      j++;
    }  

    parentFound = false;
    j = 0;
  }

  // Detect if there are any siblings
  for(let i = 0; i < people.length; i++){
    console.log(people[i].firstName + " " + people[i].lastName);

    if(targetPerson.parents.toString() === people[i].parents.toString() && targetPerson.id !== people[i].id){
      siblingList = "Sibling: " + people[i].firstName + " " + people[i].lastName + "\n";
    }

  }

  // Find spouse if their is one
  for(let i = 0; i < people.length; i++){
    console.log(people[i].firstName + " " + people[i].lastName);

    if(targetPerson.currentSpouse === people[i].id){
      spouse = "Spouse: " + people[i].firstName + " " + people[i].lastName + "\n";
    }

  }

  // Display immediate family
  if(parentList && siblingList && spouse === ""){
    alert("No family found.")
  }
  else{
    alert(parentList + siblingList + spouse)
  }
}

// Search for all descendants
function findDescendants(ancestor, people, listOfDescendants){

  for(let i = 0; i < people.length; i++){
    if(people[i].parents.length > 0){
      for(let j = 0; j < people[i].parents.length; j++){
        if(ancestor.id === people[i].parents[j]){
          console.log(people[i].firstName + " " + people[i].lastName);
          listOfDescendants += people[i].firstName + " " + people[i].lastName + "\n";
          listOfDescendants = findDescendants(people[i], people, listOfDescendants);
        }
      }
    }
  }

  return listOfDescendants;
}

// Display list of descendants
function displayDescendants(toDisplay){
  alert(toDisplay);
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

// Display all person's information
function displayPerson(person){
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

function checkIfNull(input){
  if (input === null){
    reload();
    return;
  }
}