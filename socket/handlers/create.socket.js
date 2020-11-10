const {
  createClass,
  getClassId,
  getClasses,
  setClassStart,
  setClassEnd,
  createTeacher,
  getTeachers
} = require(root_path('/services/class.service'))

exports.create = (io, socket) => {

  socket.on('createClass', ({ teacherIdC, classNameC }) => {

    console.log('createClass', teacherIdC, classNameC)

    let result = createClass(teacherIdC, classNameC, socket.id)

    socket.emit('classAdded', result);
  });
  socket.on('createTeacher', ({ userNameT }) => {

    console.log('userNameT', userNameT)

    let result = createTeacher(userNameT, socket.id)

    socket.emit('teacherAdded', result);
  });
  socket.on('getClass', ({id, by}) => {

    console.log('getClass', id)

    let result = getClassId(id)
    if ('teacher' == by) {
      socket.emit('receiveTeacherClass', result);
      console.log('receiveTeacherClass', result)
    }
    else {
      socket.emit('receiveStudentClass', result);
      console.log('receiveStudentClass', result)
    }
  });
  socket.on('startClass', (id) => {

    console.log('startClass', id)

    let result = setClassStart(id)

    socket.emit('receiveClass', result);
  });
  socket.on('endClass', (id) => {

    console.log('endClass', id)

    let result = setClassEnd(id)

    socket.emit('receiveClass', result);
  });
}