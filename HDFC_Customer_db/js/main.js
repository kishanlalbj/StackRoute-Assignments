'user scrict';
var totalRecords = 0;
$(function(){
    $.ajax({
        type:'GET',
        url:'http://localhost:8080/customers/',
        success:function(item){
            totalRecords=item.length;
            console.log(totalRecords);
        },
        error:function(){
            alert('Error Occurred');
        }

    });
});
$('#heading').hide();
$('#previous').hide();
$('#next').hide();
var template = $('#temp').html();

function addCustomer(newCustomer) {

    $('#tbl').append(Mustache.render(template,newCustomer));
}

function viewAll(records) {
    $('#heading').show();
    $('#previous').show();
    $('#next').show();
    $('#tbl').append(Mustache.render(template,records));
}

function search(records) {
    $('#heading').show();   
    $('#tbl').append(Mustache.render(template,records));
}

$('#submit').on('click',function() {

    $('#tbl').empty();
    var name = $('#name').val(),
    customerID = $('#customerID').val(),
    gender = $('#gender').val(),
    accountType = $('#accountType').val(),
    balance = $('#balance').val();
    $('#heading').show();
    $('#register').modal('toggle');

    var customer={
        name : name,
        customer_id : customerID,
        gender : gender,
        account_type : accountType,
        balance : balance,
    };

    $.ajax({
        type:'POST',
        url:'http://localhost:8080/customers',
        data:customer,
        success:function(newCustomer){
            addCustomer(newCustomer);
        },
        error:function(){
            alert('Error Adding Customer');
        }
    });
});
var page=1;
$('#viewAll').on('click',function() {
    $('#tbl').empty();
    $('#previous').prop('disabled',true);
    $.ajax({
        type:'GET',
        url:'http://localhost:8080/customers/?&_page=1&_limit=100',
        success:function(item) {
            // totalRecords=item.length;
            $.each(item,function(i,records) {
                viewAll(records); 
                console.log(page);
            });           
        },
        error:function() {
            alert('ERROR on loading Server');
        }
    });             
});

$('#mybutton').on('click',function() {

    $('#tbl').empty();
    var input=$('#search').val();
    $('#previous').toggle();
    $('#next').toggle();
    $.ajax({

        type:'GET',
        // http://localhost:8080/customers/?account_type=Savings&_page=2&_limit=10
        url:'http://localhost:8080/customers/?name='+input+'&page=1&_limit=10',
        success:function(item){
            
            $.each(item,function(i,records){
                search(records);
            });
        },
        error:function(){
            alert('ERROR on loading Server');
        }
    });
});

$('#tbl').delegate('#delete','click',function() {
    var $tr=$(this).closest('tr');
    $.ajax({
        type:'DELETE',
        url:'http://localhost:8080/customers/'+$(this).attr('data-id'),
        success:function() {
            $tr.fadeOut(300,function() {
                $(this).remove();   
            });
        },
        error:function(){
            alert('ERROR on delete');
        }
    });
});


$('#tbl').delegate('#update','click',function() {
var $tr = $(this).closest('tr');
    console.log("Clicked");
    $tr.find('input.cid').val($tr.find('span.cid').html() );
    $tr.find('input.name').val($tr.find('span.name').html() );
    $tr.find('select.gender').val($tr.find('span.gender').html() );
    $tr.find('select.account_type').val($tr.find('span.account_type').html() );
    $tr.find('input.balance').val($tr.find('span.balance').html() );
    $tr.find('td').addClass('edit');
});

$('#tbl').delegate('.cancelCustomer','click',function() {
    $(this).closest('tr').find('td').removeClass('edit');

});

$('#tbl').delegate('#save','click',function() {
    console.log("Clicked");
    var $tr = $(this).closest('tr');
    var updateCustomer = {
        customer_id  : $tr.find('input.cid').val(),
        name         : $tr.find('input.name').val(),
        gender       : $tr.find('select.gender').val(),
        account_type : $tr.find('select.account_type').val(),
        balance      : $tr.find('input.balance').val(),
        };
    $.ajax({

        type:'PUT',
        url:'http://localhost:8080/customers/'+$tr.attr('data-id'),
        data:updateCustomer,
        success:function(newCustomer){
            $tr.find('span.cid').html(updateCustomer.customer_id);
            $tr.find('span.name').html(updateCustomer.name);
            $tr.find('span.gender').html(updateCustomer.gender);
            $tr.find('span.account_type').html(updateCustomer.account_type);
            $tr.find('span.balance').html(updateCustomer.balance);
            $tr.find('td').removeClass('edit');
            console.log("Right");

        },
        error:function(){
            alert('Error Adding Customer');
        }
    });

});

$('#previous').on('click',function(){
    $('#tbl').empty();
    if(page<=totalRecords)
    {
        page = page-1;
        $('#next').prop("disabled",false);
        
        $.ajax({

            type:'GET',
        // http://localhost:8080/customers/?&_page=2&_limit=10
        url:'http://localhost:8080/customers/?&_page='+page+'&_limit=100', 
        success:function(item) {
            $.each(item,function(i,records){
                viewAll(records);
            });
            
        },
        error:function() {
            alert('ERROR on loading Server');
        }
    });
    }
    if(page==1){
        $('#previous').prop("disabled",true);
    }

});


$('#next').on('click',function() {
    $('#tbl').empty();
    if(page<totalRecords)
    {        
        page=page+1;
        $('#previous').prop("disabled",false);
        $.ajax({

            type:'GET',
        // http://localhost:8080/customers/?&_page=2&_limit=10
        url:'http://localhost:8080/customers/?&_page='+page+'&_limit=100', 
        success:function(item) {
            $.each(item,function(i,records){
                viewAll(records);
            });         
        },
        error:function() {
            alert('ERROR on loading Server');
        }
    });
    }
    if(page==totalRecords)
    {
        $('#next').prop("disabled",true);
    }
});
