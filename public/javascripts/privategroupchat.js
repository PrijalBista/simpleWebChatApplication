    $(function () {
      var socket = io();
      
      let nick = "Anonymous";
      let group_name="";
      let password = "";
      let crypter = null;
      //createChatRoom
      $('#createChatRoom').click(()=>{
          let g_name = $('#group_name').val()
          let pwd = $('#password').val()
          let n = $('#nick').val()
          if(n!=='' && g_name!=='' && pwd!==''){ //if all fields are non empty
            nick = n;
            group_name = g_name;
            password = pwd;

            socket.emit('create room', { group_name:group_name, password:password });

          }
      });

      socket.on('chat room err', msg => {
        if(msg.status == false){
          console.log(msg.msg);
          return;
        }
        //if no errors hide the login screen and show message screen
        crypter = Crypt(password) //set the password(room password) for encryption and decryption of messages
        $('#login').hide(); //hide the welcome/login screen
        $('#userInfo').append($('<h3>').text("Logged In As : " + nick + " In  Group Name :"+group_name));
      });

      //JoinChatRoom
      $('#joinChatRoom').click(()=>{
          let g_name = $('#group_name').val()
          let pwd = $('#password').val()
          let n = $('#nick').val()
          if(n!=='' && g_name!=='' && pwd!==''){ //if all fields are non empty
            nick = n;
            group_name = g_name;
            password = pwd;

            socket.emit('join room', { group_name:group_name, password:password });
                       
          }
      });


      $('form').submit(function(e){
      e.preventDefault(); // prevents page reloading
      if($('#m').val()=='') return; // prevent sending empty msg
      let msg = nick + " : " + $('#m').val();

      let encryptedmsg = crypter.encrypt(msg); //encrypt the msg with AES using room password

      socket.emit('chat room message', {group_name: group_name, password: password, message: encryptedmsg} );
      $('#m').val('');
      return false;
      });

      socket.on('chat room message', function(encryptedmsg){

        let dec = crypter.decrypt(encryptedmsg); //decrypt the msg 
        let msg = dec.toString(CryptoJS.enc.Utf8); //decode the msg 
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
          socket.emit('chat room event', {group_name: group_name, password: password, message: msg} );
        });
      });

      $('#m').focusout(function(e){
        //console.log('focus hatyo');
        socket.emit('chat room event', {group_name: group_name, password: password, message: ''});
      });

      socket.on('chat room event', function(msg){
        // console.log(msg);
        //$('#chat-event').value=msg;
        document.getElementById('chat-event').innerHTML = msg;
      })

});