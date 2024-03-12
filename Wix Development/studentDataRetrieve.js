//Written by James L.

import wixData from 'wix-data';

export async function getStudentInfo(){

try{
    const results = await wixData.query("StudentData")
    .eq("isStudent", true)
    .find();
    return results.items;
} catch(error){
    
        console.error(new Error(error.message))
        return {items: null};
}
}