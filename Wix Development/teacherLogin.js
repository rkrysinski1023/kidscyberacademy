// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
//Written by James L.
import { authentication } from 'wix-members-frontend';
import wixLocation from 'wix-location';
import wixData from 'wix-data';

$w.onReady(function () {

    const loginMember = async () => {

        const email = $w("#email").value;
        const password = $w("#password").value;

        try {
            const teacherInfo = await wixData.query("MainDatabase").eq("email", email).find();

            if (teacherInfo.items.length > 0 && teacherInfo.items[0].isTeacher === true) {
                console.log("Teacher login success");
                const memberIsLoggedIn = await authentication.login(email, password);
                console.log(memberIsLoggedIn);
                console.log("Success");

                setTimeout(() => {
                    wixLocation.to("/teacherdashboard");
                }, 2000);
            } else {
                console.log("Teacher login unsuccessful");
                $w("#loginErrormessage").text = "There was an error, please try again";
                console.log("Before showing error message");
                $w("#loginErrormessage").show();
                console.log("After showing error message");
            }

        } catch (error) {
            console.log(error);
            $w("#loginErrormessage").text = "There was an error, please try again";            

        }
    }

    $w("#loginButton").onClick(loginMember);
});