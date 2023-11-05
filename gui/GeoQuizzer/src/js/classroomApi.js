import {getName, handleToken} from "@/js/userApi";
const classroomEndpoint = "http://localhost:8080/classroom/";

export const getClassroomData = async () => {
    const name = getName()
    return fetch((classroomEndpoint + "getStudentsInClassRoom/" + name)).then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch the list of strings');
        }
        return response.json();
    })
        .then(stringList => {
            const stringsArray = stringList;
            const restCalls = stringsArray.students.map((student) => {
                console.log(student)
                return fetch(classroomEndpoint + "getClassroom/" + student.name)
                    .then(response => {
                        if (!response.ok) {
                            console.log("Error")
                        }
                        return response.json();
                    })
                    .catch(() => {
                        return null;
                    });
            });
            return Promise.all(restCalls)
                .then(results => {
                    console.log(results)
                    return {
                        owner: stringsArray.owner,
                        students: results
                    }
                })
                .catch(() => {
                    console.log("Error")
                });
        })
        .catch(() => {
            console.log("Error")
        });
}

export const getInviteLink = async () => {
    try {
        const name = getName();
        const response = await fetch(classroomEndpoint + `getClassroomInvite/` + name)
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

export const removeStudent = async (userName) => {
    const accessToken = await handleToken();
    return fetch(classroomEndpoint + 'removeStudent', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}`},
        body: JSON.stringify({userName: userName})
    })
}
