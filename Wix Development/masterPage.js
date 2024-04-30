// The code in this file will load on every page of your site
//Written by James L.
import wixLocation from 'wix-location';
import wixData from 'wix-data';

import { currentMember, authentication } from 'wix-members-frontend';
import { badgeAssign } from 'backend/badgeAssign';

$w.onReady(async function () {
    let member;
    try {
        member = await currentMember.getMember();

        if (member) {
            $w("#masterButton").text = "Log Out"
            $w("#missionButton").show();

            

            const student = await wixData.query("MainDatabase").eq("email",member.loginEmail).eq("isStudent", true).find();
            const teacher = await wixData.query("MainDatabase").eq("email",member.loginEmail).eq("isTeacher", true).find();
            const admin = await wixData.query("MainDatabase").eq("email",member.loginEmail).eq("isAdmin", true).find();

            if (student.items.length > 0) {

                $w("#yourProgressButton").show();

            } else {
                $w("#yourProgressButton").hide();

            }

            if (teacher.items.length > 0) {
                $w("#teacherDashboard").show();
            } else {
                $w("#teacherDashboard").hide();
            }

                if (admin.items.length > 0) {

                $w("#adminDashboard").show();

            } else {
                $w("#adminDashboard").hide();

            }

            if(student.items.length > 0 && student.items[0].l1Complete && student.items[0].l2Complete){

                const badgeId = "f416c2cf-9269-48e5-948a-6f16b980900e";

                badgeAssign(badgeId, member._id);
            }

        } else {
            wixLocation.to("/register");
        }
    } catch (error) {
        console.log("Error:", error);
    }

    $w("#masterButton").onClick(() => {
        if (member) {
            authentication.logout();
        } else {
            wixLocation.to("/register");
        }

    });
});