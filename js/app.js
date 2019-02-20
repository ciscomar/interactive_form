//Start page with name input focus and hide payment info
$(document).ready(function () {
    $("#name").focus();
    $("p").hide();
    $("#other-title").hide();
    $("#colors-js-puns").hide();
    $('select option[value="credit card"]').attr('selected',true);
});

//Show other job input if other is selected
$("#title").on("change", function (e) {

    if (this.value === "other") {
        $("#other-title").show();
        $("#other-title").focus();
    } else {
        $("#other-title").hide();
    }

});

//T shirt filter dropdown
$("#design").on("change", function (e) {

    var newOption = $('<option value="select_theme">Please Select a T shirt theme</option>');
    $('#color').prepend(newOption);

    if (this.value === "js puns") {
        $("#colors-js-puns").show();
        $("#color option:contains(♥)").css("display", "none");
        $("#color option:not(:contains(♥))").css("display", "block");
        $('select option[value="select_theme"]').attr('selected',true);
    } else if (this.value === "heart js") {
        $("#colors-js-puns").show();
        $("#color option:contains(♥)").css("display", "block");
        $("#color option:not(:contains(♥))").css("display", "none");
        $('select option[value="select_theme"]').attr('selected',true);

    } else {
        $("#colors-js-puns").hide();
    }
});

//Register activities 
let total=0;
$( ".activities" ).append('<div><label for="total"></label></div>')
$("input[type='checkbox']").on("change", function (e) {
   
    $('.activities').children('legend:first').css('color','green');

    if (this.name === 'all') {
        if (this.checked) {
            displayTotal(total += 200);
        } else {
            total= total- 200;
            displayTotal(total);
        }
    } else {
        if (this.checked) {
            let name = this.name;
            displayTotal(total += 100);
            switch (name) {
                case 'js-frameworks':
                    change('express', 'disable');
                    break;
                case 'js-libs':
                    change('node', 'disable');
                    break;
                case 'express':
                    change('js-frameworks', 'disable');
                    break;
                case 'node':
                    change('js-libs', 'disable');
                    break;
            }
        } else {
            let name = this.name;
            total= total-100;
            displayTotal(total);
            switch (name) {
                case 'js-frameworks':
                    change('express', 'enable');
                    break;
                case 'js-libs':
                    change('node', 'enable');
                    break;
                case 'express':
                    change('js-frameworks', 'enable');
                    break;
                case 'node':
                    change('js-libs', 'enable');
                    break;
            }
        }
    }
});

//Function to show total
function displayTotal(value){
    
    return $('label[for="total"]').text('Total: $'+value).css('color','green');

}
//Function to change chechbox properties to disable checkbox
function change(event, status) {

    if (status === 'disable') {
        $(".activities input[name='" + event + "']").prop('disabled', true).parent().css('text-decoration', 'line-through');
    } else {
        $(".activities input[name='" + event + "']").removeAttr('disabled').parent().css('text-decoration', 'none');
    }
}

//Show Selected payment info
$("#payment").on("change", function (e) {

    $("html, body").animate({ scrollTop: $(document).height() }, 1000);

    if (e.currentTarget.value === "paypal") {
        $("p").first().show().css('color','green');
        $("p").last().hide();
        $("#credit-card").hide();
    }
    else if (e.currentTarget.value === "credit card") {
        $("p").hide();
        $("#credit-card").show();
        $("#cc-num").focus();

    } else if (e.currentTarget.value === "bitcoin") {
        $("p").first().hide();
        $("p").last().show().css('color','green');
        $("#credit-card").hide();
    } else {
        $("p").hide();
        $("#credit-card").hide();
    }
});

//Change email input color if right or wrong
  $("#mail").on("change keyup", function(e) {
      
    if(!isEmail(this.value)){
        $('#mail').addClass('has-error');
        $('#mail').removeClass('no-error');
        $('label[for="mail"]').text('Email: Insert a valid Email address').css('color','red');
      }else{
        $('#mail').addClass('no-error');
        $('#mail').removeClass('has-error');
        $('label[for="mail"]').text('Email:').css('color','green');
      }
});

//Function to test email
function isEmail(email) {

    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

//Allow only letters in name input
$('#name').keyup(function () {
    this.value = this.value.replace(/[^a-z]/g, '');
});

//Check Name
$('#name').keyup(function () {
    if (this.value.length < 1) {
        $('#name').addClass('has-error');
        $('#name').removeClass('no-error');
        $('label[for="name"]').text('Name:').css('color','red')

    } else {
        $('#name').addClass('no-error');
        $('#name').removeClass('has-error');
        $('label[for="name"]').text('Name:').css('color','green');
    }
});
//Check other Job role
$('#title').keyup(function () {
    if (this.value.length > 0 ) {
        $('#cc-num').removeClass('has-error');
        $('#cc-num').addClass('no-error')
        $('label[for="cc-num"]').text('Card Number: Between 13 and 16 digits').css('color','red')
    } else {
        $('#cc-num').addClass('no-error');
        $('#cc-num').removeClass('has-error');
        $('label[for="cc-num"]').text('Card Number:').css('color','green');
    }
});

//Allow only numbers in credit card info
$('#cc-num, #zip, #cvv').keyup(function () {
    this.value = this.value.replace(/[^0-9\.]/g, '');
});

//Check credit card info length, colors and text change
$('#cc-num').keyup(function () {
    if (this.value.length < 13 || this.value.length > 16) {
        $('#cc-num').addClass('has-error');
        $('#cc-num').removeClass('no-error')
        $('label[for="cc-num"]').text('Card Number: Between 13 and 16 digits').css('color','red')
    } else {
        $('#cc-num').addClass('no-error');
        $('#cc-num').removeClass('has-error');
        $('label[for="cc-num"]').text('Card Number:').css('color','green');
    }
});

$('#zip').keyup(function () {
    if (this.value.length < 5 || this.value.length > 5) {
        $('#zip').addClass('has-error');
        $('#zip').removeClass('no-error');
        $('label[for="zip"]').text('Zip Code: Invalid').css('color','red')
    } else {
        $('#zip').addClass('no-error');
        $('#zip').removeClass('has-error');
        $('label[for="zip"]').text('Zip Code:').css('color','green')
    }
});

$('#cvv').keyup(function () {
    if (this.value.length < 3 || this.value.length > 3) {
        $('#cvv').addClass('has-error');
        $('#cvv').removeClass('no-error');
        $('label[for="cvv"]').text('CVV: Invalid').css('color','red')
    } else {
        $('#cvv').addClass('no-error');
        $('#cvv').removeClass('has-error');
        $('label[for="cvv"]').text('CVV:').css('color','green')
    }
});

//Submit form check for errors
$("button[type='submit']").on("click", function (e) {
    e.preventDefault();
    
    if ($('#name').hasClass('has-error') || $('#name').val().length === 0) {
        $('#name').addClass('has-error')
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }
    if ($('#mail').hasClass('has-error') || $('#mail').val().length === 0) {
        $('#mail').addClass('has-error')
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }
    if (total == 0) {
        $('.activities').children('legend:first').css('color', 'red');
    }
    if ($('select option[value="credit card"]').attr('selected', true)) {

        if ($('#cvv').hasClass('has-error') || $('#cvv').val().length == 0) {
            $('#cvv').addClass('has-error')
        } if ($('#zip').hasClass('has-error') || $('#zip').val().length == 0) {
            $('#zip').addClass('has-error')
        } if ($('#cc-num').hasClass('has-error') || $('#cc-num').val().length == 0) {
            $('#cc-num').addClass('has-error')
        }
    }

    if ($('#payment').val()=='credit card' && $('#name').hasClass('no-error')
        && $('#mail').hasClass('no-error') && $('#cc-num').hasClass('no-error')
        && $('#zip').hasClass('no-error') && $('#cvv').hasClass('no-error') && total != 0) {
        location.reload();

    } else if (($('#payment').val()=='paypal' || $('#payment').val()=='bitcoin')
        && $('#name').hasClass('no-error') && $('#mail').hasClass('no-error') && total != 0) {
        location.reload();
    }
    
});
















