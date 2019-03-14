var socket=io.connect('http://localhost:3000');

var message=document.getElementById('message');
var handle=document.getElementById('handle');
var btn=document.getElementById('send');
var output=document.getElementById('output');
var feedback=document.getElementById('feedback');



btn.addEventListener('click',function () {
    if(message.value.length>0 && handle.value.length>0)
    {
        socket.emit('chat',{
            message:message.value,
            handle:handle.value
        });
    }
    else
    {
        alert('gb');
    }


});

message.addEventListener('keypress',function () {

    socket.emit('typing',handle.value);
});

var list=[];
socket.on('chat',function (data) {
    output.innerHTML="";
    feedback.innerHTML="";


    list.push(data);
    console.log(list[0].message);

   var listoutput=[];

   if(list.length>=10) {
       for (var j = list.length - 10; j < list.length; j++) {
           listoutput.push(list[j]);
       }
   }
   else
   {
       listoutput=list;
   }


    for(var i=0;i<10;i++)
    {
        if(listoutput[i].handle=='krpiyush5')
        {

            output.innerHTML+='<p style="color: red; font-size: 155%"><strong>'+" ADMIN "+':</strong><b>'+listoutput[i].message+'</b></p>';
        }
        else{
            output.innerHTML+='<p><strong>'+listoutput[i].handle+':</strong>'+listoutput[i].message+'</p>';
        }

    }



});

socket.on('typing',function (data) {

    feedback.innerHTML='<p><em>'+data+' is typing...</em></p>';
});