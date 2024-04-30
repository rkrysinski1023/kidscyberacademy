// The code in this file will load on every page of your site
//Written by James L.
import wixLocation from 'wix-location';
import wixData from 'wix-data';

import { currentMember, authentication } from 'wix-members-frontend';

$w.onReady(async function () {
    let member;
    try {
        member = await currentMember.getMember();

        if (member) {
            $w("#masterButton").text = "Log Out"
            $w("#missionButton").show();

            const student = await wixData.query("MainDatabase").eq("email",member.loginEmail).eq("isStudent", true).find();
            const teacher = await wixData.query("MainDatabase").eq("email",member.loginEmail).eq("isTeacher", true).find();

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