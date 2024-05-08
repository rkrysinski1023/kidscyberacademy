// The code in this file will load on every page of your site
//Written by James L.
import wixData from 'wix-data';
import { currentMember } from 'wix-members-frontend';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();

        if (member) {
            const student = await wixData.query("MainDatabase")
                .eq("accId", member._id)
                .eq("firstName", member.contactDetails.firstName)
                .eq("lastName", member.contactDetails.lastName)
                .eq("email", member.loginEmail)
                //.eq("isStudent", true)
                .find();

            console.log(student.items[0])

            if (student.items.length > 0) {
                const data = student.items[0];
                const missionCompletes = {};
                for (const x in data) {
                    if ((x.startsWith('l1') || x.startsWith('l2') || x.startsWith('l3') || x.startsWith('l4') || x.startsWith('l5') ||
                            x.startsWith('l6') || x.startsWith('l7') || x.startsWith('l8') || x.startsWith('l9')) && x in data) {
                        missionCompletes[x] = data[x];
                    }
                }
                const filteredData = JSON.stringify(missionCompletes, null, 2);
                console.log(filteredData);

                const missionCompleteJson = filteredData;
                const missionCompletedArray = JSON.parse(missionCompleteJson);

                if (missionCompletedArray.l1Complete === true) {
                    $w('#lesson1').show();
                    $w('#penguin').hide();
                }
                if (missionCompletedArray.l2Complete === true) {
                    $w('#lesson2').show();
                }
                if (missionCompletedArray.l3Complete === true) {
                    $w('#lesson3').show();
                }
                if (missionCompletedArray.l4Complete === true) {
                    $w('#lesson4').show();
                }
                if (missionCompletedArray.l5Complete === true) {
                    $w('#lesson5').show();
                }
                if (missionCompletedArray.l6Complete === true) {
                    $w('#lesson6').show();
                }
                if (missionCompletedArray.l7Complete === true) {
                    $w('#lesson7').show();
                }
                if (missionCompletedArray.l8Complete === true) {
                    $w('#lesson8').show();
                }
                if (missionCompletedArray.l9Complete === true) {
                    $w('#lesson9').show();
                }

            }

        }
    } catch (error) {
        console.error("Error:", error);

    }
});