import {getName} from "@/js/userApi";
const classroomEndpoint = "http://localhost:8080/classroom/";

export const getClassroomData = async () => {
    const name = getName()
    return fetch(classroomEndpoint + "getStudentsInClassRoom/" + name)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch the list of strings');
            }
            return response.json();
        })
        .then(stringList => {
            const stringsArray = stringList;
            const restCalls = stringsArray.students.map((string) => {
                return fetch(classroomEndpoint + "getClassroom/" + string.name)
                    .then(response => {
                        if (!response.ok) {
                            console.log("ERROR")
                        }
                        return response.json();
                    })
                    .catch(() => {
                        return null;
                    });
            });
           return Promise.all(restCalls)
                .then(results => {
                    return {
                        owner: stringsArray.owner,
                        students: results
                    }
                })
                .catch(() => {
                    console.log("catch err")
                });
        })
        .catch(() => {
            console.log("catch err")
        });

}
export const getInviteLink = async () => {
    try {
        const response = await fetch(classroomEndpoint + `getClassroomInvite`)
        if (response.ok) {
            const text = await response.text();
            return text;
        } else {
            throw new Error('Failed to get the invitelink')
        }
    } catch (error) {
        throw error;
    }
};

export const removeStudent = (userName) =>{
    return fetch(classroomEndpoint + 'removeStudent', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userName: userName})
    })

}

