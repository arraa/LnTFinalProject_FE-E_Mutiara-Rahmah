const firebaseConfig = {
    apiKey: "AIzaSyBz4auEIVXKW7bDjt1dqdkVOKNKupCHvdQ",
    authDomain: "final-project-574dd.firebaseapp.com",
    databaseURL: "https://final-project-574dd-default-rtdb.firebaseio.com",
    projectId: "final-project-574dd",
    storageBucket: "final-project-574dd.appspot.com",
    messagingSenderId: "290732395507",
    appId: "1:290732395507:web:435cb145a2173ccb8ae086",
    measurementId: "G-J07NES8MXV"
  };

  firebase.initializeApp(firebaseConfig);
  let database = firebase.database().ref("Register");

  
  
  $( "#btn-submit" ).click(function() {
    $( "#form" ).submit();
});

$("#form").submit(function (e) {
    e.preventDefault();
    var name = $('#name').val();    
    var email = $('#email').val();
    var whatsapp = $('#whatsapp').val();    
    var event = $('#event').find(":selected").text();
    console.log(event)


    let newRegister = database.push();
    newRegister.set({
      name: name,
      email: email,
      number: whatsapp,
      event:event,
    });
    jsonObject = {
        name: '',
        email: '',
        number: '',
        event:'',
      };
    
      jsonObject. name= name,
      jsonObject.email = email;
      jsonObject.number = whatsapp;
      jsonObject.event = event;
    
      $.post("http://localhost:3000/register", jsonObject, function () {
        alert("your register is success!! thankyou for your registration");
      });
});


$('#webinar-btn').click(function(){
    $("#webinar").removeClass('hidden')
    $("#webinar").animate({right:0, opacity:"1"}, 1500);
    $("#workshop").animate({right:200, opacity:"0"},)
    $("#hackathon").animate({right:200, opacity:"0"},)
    $("#workshop").addClass('hidden')
    $("#hackathon").addClass('hidden')
});

$('#workshop-btn').click(function(){
    $("#workshop").removeClass('hidden')
    $("#workshop").animate({right:200,right:0, opacity:"1"}, 1500);
    $("#webinar").animate({right:200, opacity:"0"}, );
    $("#hackathon").animate({right:200, opacity:"0"},)
    $("#webinar").addClass('hidden')
    $("#hackathon").addClass('hidden')
});

$('#hackathon-btn').click(function(){
    $("#hackathon").removeClass('hidden')
    $("#hackathon").animate({right:200,right:0, opacity:"1"}, 1500);
    $("#webinar").animate({right:200, opacity:"0"},);
    $("#workshop").animate({right:200, opacity:"0"},);
    $("#webinar").addClass('hidden')
    $("#workshop").addClass('hidden')
});

      var counter = 1;
      setInterval(function(){
        document.getElementById('radio' + counter).checked = true;
        counter++;
        if(counter > 4){
          counter = 1;
        }
      }, 5000);
      
      $('.open-modals').click(function(){
        $('.open-modals').fadeIn(function(){
            $('.modals').fadeIn("slow");
        });
        $(".btn-close").click(function(e){
            $(this).parent().parent().parent().fadeOut('slow')
            //   console.log($(this).addClass('hidden'))
            })
    
          });
     
$(".btn-event").click(function(e) {
    $(".btn-event").each(function(){
      $(this).removeClass("active");
    });
    $(this).addClass("active");
})

$.validator.addMethod(
    "strong_email",
    function (value, element) {
        let password = value;
        if (!/^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i.test(password)) {
            return false;
       }
        return true;
    }
);
$.validator.addMethod(
    "strong_number",
    function (value, element) {
        let whatsapp = value;
        const regex = /(\()?(\+62|62|0)(\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}/g;
        const validateEmail = regex.test($('#whatsapp').val())
        if (!validateEmail) {
            return false;
       }else{
           return true
       }
    }
);
$.validator.addMethod(
    "valueNotEquals", 
    function(value, element, arg){
    return arg !== value;
   }
);
  

var messages = {
    name: {
        required:  "Please input this field",
        minlength : "number must > 3"
    },

    email: {
        required :  "Please input this field",
        strong_email:"Please enter valid email address",
    },
    whatsapp: {
        required:  "Please input this field",
        maxlength:  "the first 2 digits must be '08' and not more than 14 digits",
        strong_number: "the first 2 digits must be '08' and not more than 14 digits"
    },
    event: {
        required:  "Please input this field",
        valueNotEquals :  "Please input this field"
    },


};

$(document).ready(function () {
    $("form").each(function() {
        $(this).validate({
        // debug:true,
        onkeyup: false,
        onfocusout: function(element) {
            this.element(element);
         },
        messages:messages,
        
        rules: {
            name : {
                required : true,
                minlength: 3,
            },
            email: {
                strong_email : true,
                required : true
            },

            whatsapp: {
                required: true,
                maxlength: 14,
                strong_number: true,
            },
            event : {
                required : true,
                valueNotEquals: "default"
            },
        },
       
        errorPlacement: function(error, element) {
            var name = element.attr('name');
            console.log("Failed", name)
            var errorSelector = '.error-msg[for="' + name + '"]';
            var $element = $(errorSelector);


            if ($element.length) { 
                $(errorSelector).html(error.html());
            } else {
                error.insertAfter(element);
            }
        },

        success: function(label){ 
            var name = $(label).attr("for");
            console.log('Success ',name)

        },  
        });
    });
});
