"use strict";

// || PAGE LOAD ||

function pageLoad(){
    document.querySelector("form").reset();
}

// || FORM HANDLING ||

//FUNCTION TO VALIDATE FORM
function validateForm(event){
    event.preventDefault();

    let customer = {}; //Object that will store the info put into the form

    //Input values
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let comments = document.getElementById("comments").value;

    //Error Messages
    let nameError = document.getElementById("name-error");
    let emailError = document.getElementById("email-error");
    let phoneError = document.getElementById("phone-error");
    let positionError = document.getElementById("pos-error");
    let commentError = document.getElementById("comm-error");

    //Regular Expressions
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/; 

    // Validation Status
    let isValid = true;

    //Checks if input is blank for name and displays error message
    if(name === ""){ 
        nameError.textContent = "Field cannot be left blank.";
        nameError.classList.remove("hidden"); //makes the message visible
        isValid = false;
    }
    else{ //hides error message if the input is valid and adds input value to the customer object
        nameError.classList.add("hidden");
        customer.name = name;
    }

    if(email === ""){ 
        emailError.textContent = "Field cannot be left blank.";
        emailError.classList.remove("hidden"); //makes the message visible
        isValid = false;
    }
    else if(!emailRegex.test(email)){
        emailError.textContent = "Please enter a valid email";
        emailError.classList.remove("hidden"); //makes the message visible
        isValid = false; 
    }
    else{ //hides error message if the input is valid and adds input value to the customer object
        emailError.classList.add("hidden");
        customer.email = email;
    }

    if(comments === ""){ 
        commentError.textContent = "Field cannot be left blank.";
        commentError.classList.remove("hidden"); //makes the message visible
        isValid = false;
    }
    else{ //hides error message if the input is valid and adds input value to the customer object
        commentError.classList.add("hidden");
        customer.comments = comments;
    }

    if(isValid){
        //Resets the form
        let form = document.querySelector("form");
        form.reset(); 

        //Removes form from contact section
        let contact = document.getElementById("contact");
        contact.removeChild(form);

        //Adds Section informing user of sucessful submission
        let messageDiv = document.getElementById("sucessful-contact-submit");
        let outerDiv = document.createElement("div");
        let innerDiv = document.createElement("div");
        let messageH2 = document.createElement("h2");
        let messageP = document.createElement("p");

        //Adds text and classes to created elements
        messageH2.textContent = "Thank you for your message"
        messageP.textContent = `We have recieved your message, ${customer.name} and will be in contact with you soon.`
        innerDiv.classList.add("inner-box", "padding-m")
        outerDiv.classList.add("outer-box")

        //Appends section to page
        innerDiv.appendChild(messageH2);
        innerDiv.appendChild(messageP);
        outerDiv.appendChild(innerDiv);
        messageDiv.appendChild(outerDiv);
        
        //Removes image
        let img = document.getElementById("contact-img-container");
        contact.removeChild(img);
    }
}



//Adding Event Handlers

document.addEventListener("DOMContentLoaded", pageLoad)


document.getElementById("contactSubmit").addEventListener("click", validateForm);
