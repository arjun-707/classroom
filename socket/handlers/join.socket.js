const {
  joinClassByTeacher,
  joinClassByStudent,
  listJoinedUsers,
  getClasses
} = require(root_path('/services/class.service'))

exports.join = (io, socket) => {

  socket.on('joinClassByTeacher', ({ teacherIdT, classIdT }) => {

    console.log('joinClassByTeacher', teacherIdT, classIdT)

    let result = joinClassByTeacher(classIdT, socket.id)

    socket.emit('classAdded', getClasses());
    socket.emit('teacherAdded', getTeachers());
  });

  socket.on('joinClassByStudent', ({ userNameJ, classIdJ }) => {

    console.log('joinClassByStudent', userNameJ, classIdJ)

    let result = joinClassByStudent(userNameJ, classIdJ, socket.id)

    // socket.emit('classJoined', result.error ? result : listJoinedUsers());
    socket.emit('classAdded', getClasses());
    socket.emit('teacherAdded', getTeachers());
  });

  socket.on('listJoinedUsers', (id) => {

    console.log('id', id)
    
    let result = listJoinedUsers(id)
    console.log('result', result)

    // socket.emit('joinedUsers', result.error ? result : listJoinedUsers());
  });
}