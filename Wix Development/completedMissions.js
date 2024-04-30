// The code in this file will load on every page of your site
//Written by James L.
import wixData from 'wix-data';
import { currentMember } from 'wix-members-frontend';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();

        if (member) {
            const query = wixData.query("MainDatabase").eq('userId', member._id);

            const result = await query.find();
            if (result.items.length > 0) {
                $w('#completedMissions').show();
            } else {
                $w('#completedMissions').hide();
            }
        }
    } catch (error) {
        console.error("Error:", error);
        $w('#completedMissions').hide()

    }
});