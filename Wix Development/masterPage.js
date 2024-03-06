// The code in this file will load on every page of your site
//Written by James L.
import wixLocation from 'wix-location';

import { currentMember, authentication } from 'wix-members-frontend';

$w.onReady(async function () {
    // Write your code here

    const member = await currentMember.getMember();
	if(member){
		$w("#masterButton").text = "Log Out"
	}

    $w("#masterButton").onClick(() => {
        if (member) {
            authentication.logout();
        } else {
            wixLocation.to("/register");
        }

    })
});