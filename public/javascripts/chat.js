    $(function () {
      var socket = io();
      
      let nick = "Anonymous";

      $('#setNick').click(()=>{
          let n = $('#nick').val()
          if(n!==''){ //if user have entered something in the text field for nickname
            nick = n;// set nick to that value;
            $('#login').hide(); //hide the welcome/login screen
            $('#userInfo').append($('<h3>').text("Logged In As : " + n));
          }
      });

      $('form').submit(function(e){
      e.preventDefault(); // prevents page reloading
      if($('#m').val()=='') return; // prevent sending empty msg
      let msg = nick + " : " + $('#m').val();
      socket.emit('chat message', msg );
      $('#m').val('');
      return false;
      });

      socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
        //scroll to the last message using jquery
        //get the pixelvalue/position of the last li element of msg
        let bottom = $("#messages li:last-child").offset().top;
        //scroll to that element
        $(document).scrollTop(bottom);
      });

      $('#m').focus(function(e){
        //console.log('focus ma xa hai');
        $('#m').one("keyup",function(e){
          let msg = nick + " is typing";
          socket.emit('chat event',msg);
        });
      });

      $('#m').focusout(function(e){
        //console.log('focus hatyo');
        socket.emit('chat event','');
      });

      socket.on('chat event', function(msg){
        // console.log(msg);
        //$('#chat-event').value=msg;
        document.getElementById('chat-event').innerHTML = msg;
      })

});

