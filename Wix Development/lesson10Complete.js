// The code in this file will load on every page of your site
//Written by James L.
import wixData from 'wix-data';
import { currentMember } from 'wix-members-frontend';

$w.onReady(async function () {
    try {
        const member = await currentMember.getMember();

        if (member) {
            $w('#missionComplete').onClick(async () => {
                try {
                    const student = await wixData.query("MainDatabase")
                        .eq("email", member.loginEmail)
                        .eq("isStudent", true)
                        .find();

                    if (student.items.length > 0) {
                        const itemId = student.items[0]._id;
                        wixData.get("MainDatabase", itemId)
                            .then((item) => {

                                item.l10Complete = true;
								
                                wixData.update("MainDatabase", item);
                                console.log("Item updated successfully");

                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    } else {
                        console.error("Student not found");
                    }
                } catch (error) {
                    console.error("Error updating item:", error);
                }
            });
        }
    } catch (error) {
        console.error("Error:", error);
    }
});