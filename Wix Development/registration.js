//Written by James Looney
import { authentication } from 'wix-members';
import wixData from 'wix-data';

$w.onReady(function () {

const resetErrorMessage = () =>{
	$w("#errorMessage").hide();
}

const inputArray = [$w("#email"), $w("#password"), $w("#cPassword")];

inputArray.forEach((input) =>{
	input.onChange(resetErrorMessage);
});

const registerNewMember = () =>{

	//Variables to store
	const fName = $w("#fName").value;
	const lName = $w("#lName").value;
//	const sNumber = $w("#studentNumber").value;
	const email = $w("#email").value;
	const password = $w("#password").value;
	const cPassword = $w("#cPassword").value;
	const options = {
    "contactInfo": {
        "firstName": fName,
        "lastName": lName
        // "customFields": [
        //     {
        //         "fieldKey": "#studentNumber", // Replace with the actual field key for student number
        //         "fieldValue": sNumber
        //     }
        // ]
    }
	};

	const studentData = "StudentData";

	//Inserting into CMS
	let toInsert = {
		"firstName": $w('#fName').value,
		"lastName": $w('#lName').value,
		"email": $w('#email').value,
		"password":$w("#cPassword").value,
		"isStudent": true
	
	}

	if(password !== cPassword){
		$w("#errorMessage").text = "Passwords do not match";
		$w("#errorMessage").show();
		return;
	}



	authentication.register(email, password, options)
		.then((registrationResult) => {
			
			wixData.insert(studentData, toInsert)
			.then((item) => {
				console.log(item);
			})
			.catch((err) =>{
				console.log("CMS error");
			});

			console.log(registrationResult.member);
			$w("#successMessage").text = "Member registered";
			$w("#successMessage").show();
		})
		.catch((error) => {
		console.error(error);
		$w("#errorMessage").text ="There was an error, try again later";
		$w("#errorMessage").show();
		})
	}

	$w("#registerButton").onClick(registerNewMember);
});