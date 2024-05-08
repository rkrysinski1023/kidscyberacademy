//Written by James Looney
//Student Registration

import { authentication } from 'wix-members';
import wixData from 'wix-data';
import wixLocation from 'wix-location';
import {assignRole} from 'backend/roleAssign';

$w.onReady(function () {

    const resetErrorMessage = () =>{
        $w("#errorMessage").hide();
    }

const passwordChecker = (passwordInput) =>{
	let hasDigit = /\d/.test(passwordInput);
	let hasSpecialChar =  /[!@#$%^&*]/.test(passwordInput);
	let hasLC = /[a-z]/.test(passwordInput);
	let hasUC = /[A-Z]/.test(passwordInput);
	let validLength = passwordInput.length >= 8;

	try{
		if(hasDigit && hasSpecialChar && hasLC && hasUC && validLength){
            console.log("Password valid");
			return true;
		}
		else{
			console.log("Password does not meet requirements");
			return false;
		}
	}catch(error){
		console.log("Error:", error);
	}
	
}


    const inputArray = [$w("#email"), $w("#password"), $w("#cPassword")];

    inputArray.forEach((input) =>{
        input.onChange(resetErrorMessage);
    });

    const registerNewMember = () =>{

        //Variables to store
        const fName = $w("#fName").value;
        const lName = $w("#lName").value;
        // const sNumber = $w("#studentNumber").value;
        const email = $w("#email").value;
        const password = $w("#password").value;
        const cPassword = $w("#cPassword").value;
        const school = $w("#schoolInput").value;
        const options = {
            "contactInfo": {
                "firstName": fName,
                "lastName": lName
                // "customFields": [
                //     {
                //         "fieldKey": "#studentNumber",
                //         "fieldValue": sNumber
                //     }
                // ]
            }
        };

        const mainData = "MainDatabase";
        //Password criterias

        //Inserting into CMS
        let toInsert = {
            "firstName": $w('#fName').value,
            "lastName": $w('#lName').value,
            "email": $w('#email').value,
            "password":$w("#cPassword").value,
            "isStudent": true,
            "school": $w("#schoolInput").value

        }

        //Password checking
        if(password !== cPassword){
            $w("#errorMessage").text = "Passwords do not match";
            $w("#errorMessage").show();
            return;
        }
        if(passwordChecker(password) == false){
            $w("#errorMessage").text = "Password must be at least 8 characters long and contain at least one digit, one uppercase letter, one lowercase letter, and one special character.";
            $w("#errorMessage").show();
            return;
        }


        authentication.register(email, password, options)
            .then((registrationResult) => {

            
                const memberIds =  registrationResult.member._id;
                const roleId = '49c0d991-78a6-4adc-875c-5a43a7d5aff1';
            

                console.log("Reached here before function call");

                assignRole(roleId, memberIds)
                    .then((roleAssigned) => {
                        console.log(roleAssigned);
                        console.log("Assigned")
                        wixData.insert(mainData, toInsert)
                            .then((item) => {
                                console.log(item);
                                console.log("CMS Success")
                            })
                            .catch((error) => {
                                console.log("CMS error");
                            });

                        console.log(registrationResult.member);
                        $w("#successMessage").text = "Member registered";
                        $w("#successMessage").show();
                        wixLocation.to("/home");
                    })
                    .catch((error) => {
                        console.log("Role assignment Error:", error);
                    })

            })
            .catch((error) => {
                console.error(error);
                $w("#errorMessage").text = "There was an error, try again later";
                $w("#errorMessage").show();
            })
    }

    $w("#registerButton").onClick(registerNewMember);
});
