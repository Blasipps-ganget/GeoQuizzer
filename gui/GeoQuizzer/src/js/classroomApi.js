const classroomEndpoint = "http://localhost:8080/classroom/";


export const getClassroomData = async () => {
    /* const students = [];
       return fetch(classroomEndpoint + 'getClassroom')
           .then(response => {
               if (response.ok) {
                   return response.json();
               }
           }).then((classroom) => {
           console.log('classroom is ',classroom)
               classroom.students.map((student) =>{
                   students.push({
                       image: '../assets/images/icons/user.png',
                       name: student.userName,
                       countries: student.maxCountryPoints,
                       flags: student.maxFlagPoints,
                       capitals: student.maxCapitalPoints
                   })
               })

               console.log('students are', students)
               console.log('owner is ', classroom.currentClassRoom)

               return {students: students,
               owner: classroom.currentClassRoom}
       });
      */

    return {
        owner: 'Mikael', students: [{
            userId: 1,
            name: 'Mikael',
            regionName: 'europe',
            flags: 10,
            capitals: 23,
            countries: 15
        }, {
            userId: 1,
            name: 'Anton',
            regionName: 'europe',
            flags: 40,
            capitals: 20,
            countries: 15
        }, {
            userId: 1,
            name: 'Anton',
            regionName: 'europe',
            flags: 2,
            capitals: 11,
            countries: 15
        }, {
            userId: 1,
            name: 'Jonathan',
            regionName: 'europe',
            flags: 30,
            capitals: 23,
            countries: 15
        }]
    }


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
            const text = await response.text();
            console.log("Response:", text)
            return text;
            // return response.text();
        } else {
            throw new Error('Failed to get the invitelink')
        }
    } catch (error) {

        console.error('Error:', error);

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

