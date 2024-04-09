// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
//Written by James L.
import { authentication } from 'wix-members-frontend';
import wixLocation from 'wix-location';

$w.onReady(function () {

    const loginMember = async () => {

        const email = $w("#email").value;
        const password = $w("#password").value;

        try {
            const memberIsLoggedIn = await authentication.login(email, password)
            console.log(memberIsLoggedIn);
			console.log("Success")

		setTimeout(() =>{
			wixLocation.to("/Home");
		}, 2000);

        } catch (error) {
		console.log(error);
		$w("#errorMessage").text = "There was an error, please try again";
		$w("#errorMessage").show;

        }
    }

	$w("#loginButton").onClick(loginMember);
});