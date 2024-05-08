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

            const student = await wixData.query("MainDatabase").eq("email", member.loginEmail).eq("isStudent", true).find();
            const teacher = await wixData.query("MainDatabase").eq("email", member.loginEmail).eq("isTeacher", true).find();
            const admin = await wixData.query("MainDatabase").eq("email", member.loginEmail).eq("isAdmin", true).find();

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

            if (student.items.length > 0 && student.items[0].l1Complete && student.items[0].l2Complete) {

                const badgeId = "f416c2cf-9269-48e5-948a-6f16b980900e"; //Seasoned agent

                badgeAssign(badgeId, member._id);
                console.log("Badge assigned");
            }

            if (student.items.length > 0 && student.items[0].l1Complete && student.items[0].l2Complete && student.items[0].l3Complete &&
                student.items[0].l4Complete && student.items[0].l5Complete && student.items[0].l6Complete) {

                const badgeId = "5c39ce0f-c9f0-4be2-ab54-89fb6f07478b"; //Special agent

                badgeAssign(badgeId, member._id);
                console.log("Badge assigned");
            }

            if (student.items.length > 0 && student.items[0].l1Complete && student.items[0].l2Complete && student.items[0].l3Complete &&
                student.items[0].l4Complete && student.items[0].l5Complete && student.items[0].l6Complete && student.items[0].l7Complete && student.items[0].l8Complete && student.items[0].l9Complete) {

                const badgeId = "7a8aceca-0a1c-4562-a491-01355c7ce3ec"; //Elite agent

                badgeAssign(badgeId, member._id);
                console.log("Badge assigned");
            }

            if (student.items.length > 0 && (student.items[0].l1Complete && student.items[0].l2Complete && student.items[0].l3Complete &&
                    student.items[0].l4Complete && student.items[0].l5Complete && student.items[0].l6Complete && student.items[0].l7Complete &&
                    student.items[0].l8Complete && student.items[0].l9Complete && student.items[0].l10Complete && student.items[0].l11Complete && student.items[0].l12Complete)) {

                const badgeId = "b65b2b0b-37e3-4a8f-b3e5-10edf2af733"; //Top agent

                badgeAssign(badgeId, member._id);
                console.log("Badge assigned");
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