//Written by James
import { currentMember, authentication } from 'wix-members-frontend';
import wixLocation from 'wix-location';

// When the page is ready
$w.onReady(async function () {
    try {
        // Check if the user is logged in
        const isLoggedIn = await authentication.loggedIn();

        if (isLoggedIn) {
            console.log('Member is logged in');

			const member = await currentMember.getMember();
			$w("#agentName").text = member.profile.nickname;

        } else {
            console.log('Member is not logged in');
            // Redirect the user to the login page
            wixLocation.to('/login');
        }
    } catch (error) {
        console.error('Error checking if member is logged in:', error);
    }
});
