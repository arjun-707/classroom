
const socket = io();
const {
  protocol,
  hostName,
  pathname
} = window.location
console.log(protocol, hostName, pathname)

if (pathname == '/' || pathname.indexOf('index.html') > -1) {

  $(function () {
    // socket.emit('message', 'arjun')


    socket.on('message', function (msg) {
      alert(JSON.stringify(msg))
      // let id = getUrlParameter('userId')
      // if (msg) {
      //   let parsedMsg = JSON.parse(msg)
      //   console.log(parsedMsg)
      //   let li = $('<li style = "text-align:left">').text(parsedMsg.msg)
      //   if (parsedMsg.id != id)
      //     li = $('<li style = "text-align:right">').text(parsedMsg.msg)
      //   $('#messages').append(li);
      // }
    });
    socket.on('teacherAdded', function (msg) {
      console.log(JSON.stringify(msg))
      if (msg.error) {
        alert(msg.error)
      }
      else {
        let table = document.createElement("table")
        let header = Object.keys(msg)
        let tr = document.createElement("tr")
        for (let e of header) {
          let th = document.createElement("th")
          th.innerText = e
          tr.appendChild(th)
        }
        table.appendChild(tr)
        tr = document.createElement("tr")
        for (let c in msg) {
          let td = document.createElement("td")
          if (c != 'createdId')
            td.innerText = msg[c]
          tr.appendChild(td)
        }
        table.appendChild(tr)
        console.log(table)
        $('#teacherList').html(table);
        $('.main-teacher-list').show();
      }
    });
    socket.on('classAdded', function (msg) {
      console.log(JSON.stringify(msg))
      if (msg.error) {
        alert(msg.error)
      }
      else {
        window.location.href = `teacher.html?classId=${msg.id}`
        // let isFirst = true
        // let table = document.createElement("table")
        // for (let c in msg) {
        //   if (isFirst) {
        //     let header = Object.keys(msg[c])
        //     let tr = document.createElement("tr")
        //     for (let e of header) {
        //       let th = document.createElement("th")
        //       th.innerText = e
        //       tr.appendChild(th)
        //     }
        //     table.appendChild(tr)
        //     isFirst = false
        //   }
        //   let tr = document.createElement("tr")
        //   for (let ic in msg[c]) {
        //     let td = document.createElement("td")
        //     if (ic != 'createdId') {
        //       if (ic == 'id')
        //         td.innerText = c
        //       else if (ic == 'studentsJoined')
        //         td.innerText = Object.keys(msg[c][ic]).length
        //       else
        //         td.innerText = msg[c][ic]
        //     }
        //     tr.appendChild(td)
        //   }
        //   table.appendChild(tr)
        // }
        // console.log(table)
        // $('#classList').html(table);
        // $('.main-class-list').show();
      }
    });
    socket.on('classJoined', function (msg) {
      console.log(JSON.stringify(msg))
      if (msg.error) {
        alert(msg.error)
      }
      else {
        window.location.href = `${window.location.protocol}://${window.location.hostname}/student.html?classId=${msg.id}`
        let isFirst = true
        let table = document.createElement("table")
        for (let c in msg) {
          if (isFirst) {
            let header = Object.keys(msg[c])
            let tr = document.createElement("tr")
            for (let e of header) {
              let th = document.createElement("th")
              th.innerText = e
              tr.appendChild(th)
            }
            table.appendChild(tr)
            isFirst = false
          }
          let tr = document.createElement("tr")
          for (let ic in msg[c]) {
            let td = document.createElement("td")
            if (ic == 'id')
              td.innerText = c
            else if (ic == 'studentsJoined')
              td.innerText = Object.keys(msg[c][ic]).length
            else
              td.innerText = msg[c][ic]
            tr.appendChild(td)
          }
          table.appendChild(tr)
        }
        console.log(table)
        $('#teacherList').html(table);
        $('.main-teacher-list').show();
      }
    });
  });
  $(document).ready(function () {
    $('#createTeacher').click(function () {
      $('.main-class').hide()
      $('.main-join-teacher').hide()
      $('.main-join-student').hide()
      $('.main-teacher').show()
    })
    $('#createClass').click(function () {
      $('.main-teacher').hide()
      $('.main-join-teacher').hide()
      $('.main-join-student').hide()
      $('.main-class').show()
    })
    $('#joinTeacher').click(function () {
      $('.main-class').hide()
      $('.main-join-student').hide()
      $('.main-teacher').hide()
      $('.main-join-teacher').show()
    })
    $('#joinStudent').click(function () {
      $('.main-class').hide()
      $('.main-join-teacher').hide()
      $('.main-teacher').hide()
      $('.main-join-student').show()
    })
    $('#createTeacherBtn').click(function () {
      const userNameT = $('#userNameT').val()
      let error = false
      if (!userNameT)
        error = `invalid userName ${userNameT}`
      if (error) {
        alert(error);
        return false;
      }
      socket.emit('createTeacher', {
        userNameT
      })
    })
    $('#createClassBtn').click(function () {
      const teacherIdC = $('#teacherIdC').val()
      const classNameC = $('#classNameC').val()
      let error = false
      if (!teacherIdC)
        error = `invalid teacherId ${teacherIdC}`
      if (!classNameC)
        error = `invalid className ${classNameC}`
      if (error) {
        alert(error);
        return false;
      }
      socket.emit('createClass', {
        teacherIdC,
        classNameC
      })
    })
    $('#joinTeacherClassBtn').click(function () {
      const teacherIdT = $('#teacherIdT').val()
      const classIdT = $('#classIdT').val()
      let error = false
      if (!teacherIdT)
        error = `invalid teacherId ${teacherIdT}`
      if (!classIdT)
        error = `invalid classId ${classIdT}`
      if (error) {
        alert(error);
        return false;
      }
      socket.emit('joinClassByTeacher', {
        teacherIdT,
        classIdT
      })
    })
    $('#joinStudentClassBtn').click(function () {
      const userNameJ = $('#userNameJ').val()
      const classIdJ = $('#classIdJ').val()
      let error = false
      if (!userNameJ)
        error = `invalid userName ${userNameJ}`
      if (!classIdJ)
        error = `invalid classId ${classIdJ}`
      if (error) {
        alert(error);
        return false;
      }
      socket.emit('joinClassByStudent', {
        userNameJ,
        classIdJ
      })
    })
  })
  // $('#m').keydown(function (e) {
  //   if (e.keyCode == 13) {
  //     let id = getUrlParameter('userId')
  //     e.preventDefault();
  //     let data = { }
  //     data.msg = $(this).val()
  //     if (id != -1)
  //       data.id = id
  //     else {
  //       alert('id required')
  //       return;
  //     }
  //     socket.emit('message', JSON.stringify(data));
  //     $(this).val('');
  //   }
  //   else {
  //     $('#typing').html('<i>typing</i>')
  //   }
  // });
  // $('#m').keyup((e) => {
  //   $('#typing').html('')
  // });
  /* $.ajax({
    method: 'GET',
    url: '/user',
    success: function(s) {
      console.log(s.users)
      for (let u in s.users) {

      }
    },
    error: function(e) {
      console.error(e)
    }
  }) */
}
else if (pathname.indexOf('teacher.html') > -1) {
  let id = getUrlParameter('classId')
  console.log('classId', id)
  if (id) {
    socket.emit('getClass', id)
    socket.on('receiveClass', (msg) => {
      console.log('receiveClass', JSON.stringify(msg))
      if (msg && msg.id && !msg.isEnded) {
        $(document).ready(function () {
          let span = document.createElement("span")
          span.innerText = Object.keys(msg.studentsJoined).length
          $('#stuCount').append(span)
          let table = document.createElement("table")
          for (let c in msg.studentsJoined) {
            let tr = document.createElement("tr")
            for (let ic in msg[c]) {
              let td = document.createElement("td")
              if (ic == 'id')
                td.innerText = c
              else if (ic == 'studentsJoined')
                td.innerText = Object.keys(msg[c][ic]).length
              else
                td.innerText = msg[c][ic]
              tr.appendChild(td)
            }
            table.appendChild(tr)
          }
          console.log(table)
          let div = document.createElement("div")
          let b = document.createElement("b")
          b.innerText = 'Teacher Name:'
          div.appendChild(b)
          span = document.createElement("span")
          span.innerText = msg.teacherId.teacherName
          div.appendChild(span)

          $('#teacherName').html(div);
          $('#joinList').html(table);
          $('.main-join-list').show();
          if (msg.isStarted) {
            div = document.createElement('div')
            b = document.createElement("b")
            b.innerText = 'Started At:'
            div.appendChild(b)
            span = document.createElement("span")
            span.innerText = new Date(msg.startTime).toLocaleTimeString()
            div.appendChild(span)

            $('#teacherName').append(div)
            $('#startClass').prop('disabled', true);
          }
          else {
            $('#startClass').click(function () {
              socket.emit('startClass', id)
            })
          }
          $('#endClass').click(function () {
            socket.emit('endClass', id)
          })
        })
      }
      else
        window.location.href = `/`
    })
  }
  else
    window.location.href = `/`
}
else if (pathname.indexOf('student.html') > -1) {
  socket.emit('listJoinedUsers')

}
else if (pathname.indexOf('admin.html') > -1) {
  $(function () {
    socket.on('joinedUsers', function (msg) {
      console.log(JSON.stringify(msg))
      if (msg.error) {
        alert(msg.error)
      }
      else {
        let isFirst = true
        let table = document.createElement("table")
        for (let c in msg) {
          if (isFirst) {
            let header = Object.keys(msg[c])
            let tr = document.createElement("tr")
            for (let e of header) {
              let th = document.createElement("th")
              th.innerText = e
              tr.appendChild(th)
            }
            table.appendChild(tr)
            isFirst = false
          }
          let tr = document.createElement("tr")
          for (let ic in msg[c]) {
            let td = document.createElement("td")
            if (ic == 'id')
              td.innerText = c
            else if (ic == 'studentsJoined')
              td.innerText = Object.keys(msg[c][ic]).length
            else
              td.innerText = msg[c][ic]
            tr.appendChild(td)
          }
          table.appendChild(tr)
        }
        console.log(table)
        $('#teacherList').html(table);
        $('.main-teacher-list').show();
      }
    });
  })
}


function getUrlParameter(sParam) {
  let sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
  return -1
}