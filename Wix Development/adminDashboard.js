//Written by James

import wixData from 'wix-data';
import { assignRole, removeRole } from 'backend/roleAssign';
import { currentMember } from 'wix-members-frontend';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();
        
        if (member) {
            $w("#assignButton").onClick(() => {
                const userId = $w('#assignInput').value;
                console.log(userId);
                if (!userId) {
                    $w("#errorText").text = "User ID cannot be empty.";
                    $w("#errorText").show();

                    return;
                }

                const roleID = 'a8a112cf-fb12-44eb-ba81-a7933fd36bfe';
                assignAdminRole(roleID, userId);
            });

            $w("#removeButton").onClick(() => {
                const userId = $w('#removeInput').value;
                console.log(userId);
                if (!userId) {
                    $w("#errorText2").text = "User ID cannot be empty.";
                    $w("#errorText2").show();

                    return;
                }

                const roleID = 'a8a112cf-fb12-44eb-ba81-a7933fd36bfe';
                removeAdminRole(roleID, userId);
            })
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

async function assignAdminRole(roleId, userId) {

    try {
        await assignRole(roleId, userId);
        const member = await currentMember.getMember();

        const memberData = await wixData.query("MainDatabase")
            .eq("email", member.loginEmail)
            .eq("isAdmin", true)
            .find();
        if (memberData.items.length > 0) {
            const itemId = memberData.items[0]._id;

            wixData.get("MainDatabase", itemId)
                .then((item) => {
                    item.isAdmin = true;
                    wixData.update("MainDatabase", item);
                    $w('#successText').text = "Success";
                    $w('#successText').show();

                })
                .catch((error) => {
                    console.log(error);
                })
        }

        console.log("Member successfully assigned as admin.");
    } catch (error) {
        console.error("Error assigning admin role:", error);
    }
}

async function removeAdminRole(roleId, userId) {
    try {
        await removeRole(roleId, userId);
        const member = await currentMember.getMember();

        const memberData = await wixData.query("MainDatabase")
            .eq("email", member.loginEmail)
            .eq("isAdmin", true)
            .find();
        if (memberData.items.length > 0) {
            const itemId = memberData.items[0]._id;

            wixData.get("MainDatabase", itemId)
                .then((item) => {
                    item.isAdmin = false;
                    wixData.update("MainDatabase", item);
                    $w('#successText2').text = "Success";
                    $w('#successText2').show();

                })
                .catch((error) => {
                    console.log(error);
                })
        }

        console.log("Member successfully removed as admin.");
    } catch (error) {
        console.error("Error removing admin role:", error);
    }
}