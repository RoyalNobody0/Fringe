"use strict";

// || PAGE LOAD ||

function pageLoad(){
    let emailRadio = document.getElementById("email");
    let req2 = document.querySelector('label[for="phone"] span');
    emailRadio.checked;
    emailRadio.setAttribute("required", "");
    req2.classList.add("hidden")
    document.querySelector("form").reset();
}

// || FORM HANDLING ||

//Radio Buttons
let phoneRadio = document.getElementById("pref-phone");
let emailRadio = document.getElementById("pref-email");

//FUNCTION TO DETERMINE WHICH PREFERRED CONTACT BUTTON IS SELECTED AND THEN DISPLAY A * BESIDE IT
function requirementChange(event){
    //Resets error messages
    let emailError = document.getElementById("email-error");
    let phoneError = document.getElementById("phone-error");
    emailError.classList.add("hidden")
    phoneError.classList.add("hidden")

    //Spans containing the * symbol
    let req1 = document.querySelector('label[for="email"] span');
    let req2 = document.querySelector('label[for="phone"] span');

    let prefMethod = event.target;

    //Resets them both to be blank so that only the one thats currently being selected appears
    req1.classList.add("hidden")
    req2.classList.add("hidden")

    //Determines which radio button is currently selected and displays the * for it
    if(prefMethod.id === "pref-email"){
        req1.classList.remove("hidden")
        document.getElementById("email").setAttribute("required", "");
        document.getElementById("phone").removeAttribute("required", "");
    }
    if(prefMethod.id === "pref-phone"){
        req2.classList.remove("hidden")
        document.getElementById("phone").setAttribute("required", "");
        document.getElementById("email").removeAttribute("required", "");
    }
}

//FUNCTION TO VALIDATE FORM
function validateForm(event){
    event.preventDefault();

    let customer = {};

    //Input values
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let position = document.getElementById("position").value;

    //Error Messages
    let nameError = document.getElementById("name-error");
    let emailError = document.getElementById("email-error");
    let phoneError = document.getElementById("phone-error");
    let positionError = document.getElementById("pos-error");
    let commentError = document.getElementById("comm-error");

    //Regular Expressions
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
    let phoneRegex = /^\d{10}$/; 
    

    // Validation Status
    let isValid = true;

    //Checks if input is blank for name and displays error message
    if(name === ""){ 
        nameError.textContent = "Field cannot be left blank.";
        nameError.classList.remove("hidden"); //makes the message visible
        isValid = false;
        console.log(nameError.textContent);
    }
    else{ //hides error message if the input is valid and adds input value to the customer object
        nameError.classList.add("hidden");
        console.log('Name Input:' + name);
        customer.name = name;
    }

    if(emailRadio.checked && email === ""){ //Checks to see if email is the preferred method of contact, and then displays an error message if the phone input field is left blank
        emailError.textContent = "Field cannot be left blank.";
        emailError.classList.remove("hidden"); //makes the message visible
        isValid = false;
    }
    else if(emailRadio.checked && !emailRegex.test(email)){ //compares the email input information to the RegEx to ensure valid input. Displays error message on fail
        emailError.textContent = "Please enter a valid email";
        emailError.classList.remove("hidden"); //makes the message visible
        isValid = false; 
    }
    else{ //hides error message if the input is valid and adds input value to the customer object
        emailError.classList.add("hidden");
        customer.email = email;
    }

    if(phoneRadio.checked && phone === ""){  //Checks to see if phone is the preferred method of contact, and then displays an error message if the phone input field is left blank
        phoneError.classList.remove("hidden");
        phoneError.textContent = "Field cannot be left blank.";
        isValid = false;
    }
    else if(phoneRadio.checked && !phoneRegex.test(phone)){ //compares the phone input information to the RegEx to ensure valid input. Displays error message on fail
        phoneError.classList.remove("hidden");
        phoneError.textContent = "Please enter a valid phone number";
        isValid = false;
    }
    else{ //hides error message if the input is valid and adds input value to the customer object
        phoneError.classList.add("hidden");
        customer.phone = phone;
    }

    //Checks if input is blank for position and displays error message
    if(position === ""){ 
        positionError.textContent = "Field cannot be left blank.";
        positionError.classList.remove("hidden"); //makes the message visible
        isValid = false;
        console.log(nameError.textContent);
    }
    else{ //hides error message if the input is valid and adds input value to the customer object
        positionError.classList.add("hidden");
        customer.position = position;
    }

    if(isValid){
        //Resets the form
        let form = document.querySelector("form");
        form.reset(); 

        let inputs = document.getElementById("input-fields")

        //Removes form from contact section
        let apply = document.getElementById("apply-form");
        let sub = document.getElementById("applySubmit");
        apply.removeChild(sub);
        apply.removeChild(inputs);

        //Adds Section informing user of sucessful submission
        let messageDiv = document.getElementById("sucessful-apply-submit");
        let outerDiv = document.createElement("div");
        let innerDiv = document.createElement("div");
        let messageH2 = document.createElement("h2");
        let messageP = document.createElement("p");
        let firstName = customer.name.split(" ")[0]; //Retrieves first name

        //Adds text and classes to created elements
        messageH2.textContent = "Application Recieved"
        if (!customer.email) {
            messageP.textContent = `Thank you for your ${customer.position} application, ${firstName}. We will contact you at ${customer.phone} once we have finished reviewing your application.`;
        } else {
            messageP.textContent = `Thank you for your ${customer.position} application, ${firstName}. We will contact you at ${customer.email} once we have finished reviewing your application.`;
        }+ 
        innerDiv.classList.add("inner-box", "padding-m")
        outerDiv.classList.add("outer-box")

        let img = document.getElementById("apply-img-container");
        apply.removeChild(img);
        //Appends section to page
        innerDiv.appendChild(messageH2);
        innerDiv.appendChild(messageP);
        outerDiv.appendChild(innerDiv);
        messageDiv.appendChild(outerDiv);
        
    }
    console.log(customer)

}



//Adding Event Handlers

document.addEventListener("DOMContentLoaded", pageLoad)


document.getElementById("applySubmit").addEventListener("click", validateForm);


//Radio buttons event listener
let prefButtons = document.querySelectorAll("input[name=contactPref]");
for(let prefButton of prefButtons){
    prefButton.addEventListener("change", requirementChange);
}
