# simpleWebChatApplication
simple chatting application (stateless/temporary )

> Deployed Here : [Go to the site to test](https://kurakani1.herokuapp.com/)

Its a simple group chat application which has a special feature of not storing any message history maintaining the anonymity 
among the people chatting in the group.

Current state of the application:

Single Common chat room where people join, set their nickname and then start talking.
This application was build during the learning phase but its got a lot of potential. Many ideas will be implemented hopefully
in the near future to make this app great for chatting among small groups :_.

> The messages is not stored on the server. Thus all the past messages is gone once user refreshes the browser. Its good for
anonymous chatting where u dont want the history to persist.

## New Features Added
Now there is two options/place to chat
1. Public room where u get connected to everyone who is in that room. Everyone in this room can see every others message.
2. Private room where u can create new rooms or join existing rooms to chat with specific group of people privately.
(If there is problem creating or joining room, check the browser console. Will implement it soon :) )

>Also Private rooms are now encrypted with AES encryption. So all the messages of the room is encrypted with room password before sending to every members in the room. So your messages are secure. They are not persistent though, i.e if u refresh your browser all messages are lost :) .. No server logs ..no chat history.

>Disclaimer: This application is just made for learning these technologies and for fun.

The site is already deployed. You can go 
[here](https://kurakani1.herokuapp.com "Simple Group Chat App | Stateless chatting application")
to see for yourselves and learn more about it. 

> For testing it, you can open multiple instances in new tabs new windows
or different devices like mobile, pc ,tabs.
