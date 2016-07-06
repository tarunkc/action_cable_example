// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).on("ready", function() {
  var notificationContainer = $("#notification-container"); 
  var notification = App.cable.subscriptions.create("NotificationChannel", {
  	connected: function(){},
  	disconnected: function(){},
  	received: function(data){
      notificationContainer.append(htmlContent(data));
  	},
  	speak: function(data){
  		this.perform("speak", data);
  	}

  })

  function htmlContent(data){
    return '<li>'+data.message+'</li>';
  }

  $("input[name=message]").on("keypress", function(event){
    console.log("i am here");
    var object = $(this);
    if(event.keyCode == 13 && object.val() != ""){
      notification.speak({content: object.val()});
      object.val("");
      event.preventDefault();  
    }
  })

});
