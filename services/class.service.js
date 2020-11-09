const { nanoid } = require('nanoid');
const _ = require('lodash');
const Classes = {}
const students = {}
const Teachers = {}

const createTeacher = (teacherName, socketId) => {
  const id = nanoid(6)
  Teachers[id] = {
    id,
    teacherName,
    createdId: socketId,
    isJoined: false,
  }
  return Teachers[id]
}

const getTeachers = _ => Teachers

const getTeacherById = id => {
  if (id) {
    if (_.has(Teachers, id)) return Teachers[id]
    else return null
  }
  else
    return null
}

const createClass = (teacherId, className, socketId) => {
  if (getTeacherById(teacherId)) {
    if (!Teachers[teacherId].isJoined) {
      const id = nanoid(6)
      Classes[id] = {
        id,
        teacherId,
        className,
        createdId: socketId,
        studentsJoined: {},
        startTime: 0,
        endTime: 0,
        isStarted: 0,
        isEnded: 0
      }
      Teachers[teacherId].classId = id
      Teachers[teacherId].isJoined = true
      return Classes[id]
    }
    return { error: 'teacher already joined in another class'}
  }
  return { error: 'teacher not found' }

}

const getClasses = _ => Classes

const getClassId = id => {
  if (id) {
    if (_.has(Classes, id)) {
      Classes[id].teacherId = getTeacherById(Classes[id].teacherId)
      return Classes[id]
    }
    else
      return { error: 'class not found' }
  }
  else
    return { error: 'class not found' }
}
const setClassStart = id => {
  if (id) {
    if (_.has(Classes, id)) {
      Classes[id].startTime = +new Date
      Classes[id].isStarted = true
      return Classes[id]
    }
    else
      return { error: 'class not found' }
  }
  else
    return { error: 'class not found' }
}
const setClassEnd = id => {
  if (id) {
    if (_.has(Classes, id)) {
      Classes[id].endTime = +new Date
      Classes[id].isEnded = true
      return Classes[id]
    }
    else
      return { error: 'class not found' }
  }
  else
    return { error: 'class not found' }
}

const joinClassByTeacher = (teacherId, classId, socketId) => {
  console.log('joinClass service', studentName, classId, socketId)
  if (classId) {
    if (_.has(Teachers, teacherId)) {
      console.log('Classes.classId', Classes[classId])
      if (Classes[classId].isEnded)
        return { error: 'class already over' }
      if (Classes[classId].isJoined && Classes[classId][teacherId] != teacherId)
        return { error: 'class already joined by another teacher' }
      Teachers[teacherId].classId = classId
      Teachers[teacherId].isJoined = true
      Classes[classId].teacherId = teacherId
      const newClasses = JSON.parse(JSON.stringify(Classes))
      newClasses[classId].teacherId = getTeacherById(teacherId)
      return newClasses[classId]
    }
    else
      return { error: 'teacher not exists' }
  }
  else
    return { error: 'teacherId is required' }
}
const joinClassByStudent = (studentName, classId, socketId) => {
  console.log('joinClass service', studentName, classId, socketId)
  if (classId) {
    const id = nanoid(6)
    if (_.has(Classes, classId)) {
      console.log('Classes.classId', Classes[classId])
      if (Classes[classId].isStarted && !_.has(Classes[classId].studentsJoined, id))
        return { error: 'already started' }
      if (!Classes[classId].isStarted && !_.has(Classes[classId].studentsJoined, id)) {
        return Classes[classId].studentsJoined[id] = {
          studentName,
          createdId: socketId
        }
      }
      return Classes[classId]
    }
    else
      return { error: 'class not exists' }
  }
  else
    return { error: 'classId is required' }
}

const listJoinedUsers = classId => {
  if (classId && classId.id) {
    if (_.has(Classes, classId.id)) {
      Classes[classId.id].teacherId = getTeacherById(Classes[classId.id].teacherId)
      return Classes[classId.id]
    }
    else return { error: 'classId is required' }
  }
  for (let eachClass in Classes) {
    console.log('eachClass', eachClass)
    Classes[eachClass].teacherId = getTeacherById(Classes[eachClass].teacherId)
  }
  return Classes
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports = {
  createTeacher,
  getTeachers,
  getTeacherById,
  createClass,
  getClasses,
  getClassId,
  setClassStart,
  setClassEnd,
  listJoinedUsers
  // getCurrentUser,
  // userLeave,
  // getRoomUsers
};
