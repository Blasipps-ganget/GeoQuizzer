



const classroomEndpoint = "http://localhost:8080/classroom/";




export const getClassroomData = async () => {

    return fetch(classroomEndpoint + 'getClassroom')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then((classroom) => {
            return classroom;
        });





}

// export const createClassroomData = async (data) => {
//
//     return fetch(classroomEndpoint + 'createClassroom', {
//     method: 'POST',
//         headers: {
//
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//         .then(response => {
//             if (response.ok) {
//                 return response;
//             } else {
//
//                 throw new Error('Error')
//             }
//         }).then((classroom) => {
//             return classroom;
//         })
//         .catch(error => {
//
//                 console.error('Error creating classroom', error)
//
//         });
//
//
// }




    export const getInviteLink = async () => {

    try {

        const response = await fetch(classroomEndpoint + `getClassroomInvite`)

                if (response.ok) {
                    const text = await  response.text();
                    console.log("Response:", text)
                    return text;
                   // return response.text();
                } else {
                    throw new Error('Failed to get the invitelink')
                }
    }   catch (error) {

        console.error('Error:', error);

        throw error;
    }

    };



