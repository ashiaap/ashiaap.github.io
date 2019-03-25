
(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).addClass('active');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).removeClass('active');
            showPass = 0;
        }
        
    });


})(jQuery);
Notification.requestPermission(function(status){
    console.log('Notification permission status : ',status);
});
function displayNotification(){
    if(Notification.permission === 'granted'){
        navigator.serviceWorker.getRegistration()
            .then(function(reg){
                var options = {
                    body : 'Ini body notifikasi',
                    icon : 'images/mu.png',
                    vibrate : [100,50,200],
                    data : {
                        dateOfArrival : Date.now(),
                        primaryKey : 1
                    },
                    actions : [
                        {action : 'explosure', title: 'Kunjungi Situs'},
                        {action : 'close', title: 'Tutup'}
                    ]
                }
                reg.showNotification('Judul Notifikasi',options);
            })
    }
}
$('#btn-notification').on('click', function(){
    displayNotification();
})    

if('serviceWorker' in navigator){
    window.addEventListener('load',function(){
        navigator.serviceWorker.register('/serviceworker.js').then(function(reg){
            console.log('SW regis sukses dengan skop',reg.scope)
            }, 
                function(err){
                console.log('sw regis failed',err);
        })
    })
} 
