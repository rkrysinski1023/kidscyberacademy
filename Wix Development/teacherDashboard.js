//Written by James L.
import wixData from 'wix-data';

$w.onReady(async function () {
    try {
        const student = await wixData.query("MainDatabase").eq("isStudent", true).find();
        if (student.items.length > 0) {
            console.log(student);
        } else {
            console.log("No students found");

        }
    } catch (error) {
        console.log("Error:", error);

    }

});