var domain = "EasyFile/";

var logswitch = 0;

function LogSwitch()
{
    if(logswitch === 0)
    {
        document.getElementById("login-form").style.display = "inline";
        document.getElementById("signup-form").style.display = "none";
        logswitch = 1;
    }
    else if (logswitch === 1)
    {
        document.getElementById("login-form").style.display = "none";
        document.getElementById("signup-form").style.display = "inline";
        logswitch = 0;
    }
}

function newCabinet()
{
    swal({
      title: 'Please tell us the name of New Drawer.',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: function (text) {
        return new Promise(function (resolve, reject) {
                $.post('php/newcabinet.php', { name: text }, 
                function(returnedData){
                    if(returnedData === "Drawer with that name already exists!")
                    {
                            swal({
                            type: 'error',
                            title: 'Drawer with that name already exists!',
                            html: 'Please chose another name.'
                          }).then(function () { newCabinet(); })
                    }
                    if(returnedData === "Success!")
                    {
                        swal({
                            type: 'success',
                            title: 'Drawer Successfully Created!'
                          }).then(function () { location.reload(); })
                    }
                    if(returnedData === "Drawer name must not be shorter than 3 characters!")
                    {
                        swal({
                            type: 'error',
                            title: 'Drawer name must not be shorter than 3 characters!',
                            html: 'Please chose another name.'
                          }).then(function () { newCabinet(); })
                    }
                    
                     console.log(returnedData);
            }).fail(function(){
                  console.log("error");
            });
          resolve();
        })
      },
      allowOutsideClick: false
    });
}

function newDrawer()
{
    var cab = name;
    swal({
      title: 'Please tell us the name of New Folder.',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: function (text) {
        return new Promise(function (resolve, reject) {
              
                    $.post('php/newdrawer.php', { name: cab+text }, 
                    function(returnedData){
                        if(returnedData === "Folder with that name already exists!")
                        {
                                swal({
                                type: 'error',
                                title: 'Folder with that name already exists!',
                                html: 'Please chose another name.'
                              }).then(function () { newCabinet(); })
                        }
                        if(returnedData === "Success!")
                        {
                            swal({
                                type: 'success',
                                title: 'Folder Successfully Created!'
                              }).then(function () { location.reload(); })
                        }
                        if(returnedData === "Folder name must not be shorter than 3 characters!")
                        {
                            swal({
                                type: 'error',
                                title: 'Folder name must not be shorter than 3 characters!',
                                html: 'Please chose another name.'
                              }).then(function () { newDrawer(); })
                        }
                        
                         console.log(returnedData);
                }).fail(function(){
                      console.log("error");
                });
              resolve();
        })
      },
      allowOutsideClick: false
    });
}

function getFile(names)
{
    window.location.href="php/getfile.php?name="+names;
}

var emailOK = 1;
var passOK = 1;

function validate(property)
{
    if(property === "email")
    {
        if(!validateEmail(document.getElementById("email").value))
        {
            emailOK = 0;
        }
        else
        {
            emailOK = 1;
        }
        showErrors("email");
    }
    else if(property === "password")
    {
        if(document.getElementById("pass1").value === document.getElementById("pass2").value)
        {
            passOK = 1;
            showErrors("pass");
        }
        else if(document.getElementById("pass1").value.length < 6 && document.getElementById("pass1").value.length > 25)
        {
            passOK = 0;
            showErrors("pass1");
        }
        else
        {
            passOK = 0;
            showErrors("pass");
        }
    }
}

function showErrors(property)
{
    if(property === "email")
    {
        document.getElementById("email").style.borderColor = "#ccc";
        document.getElementById("emailErrLabel").style.display = "none";
        document.getElementById("submitForm").disabled = false;
        if(emailOK === 0)
        {
            document.getElementById("email").style.borderColor = "red";
            document.getElementById("emailErrLabel").style.display = "block";
            document.getElementById("submitForm").disabled = true;
        }
    }
    if(property === "pass")
    {
        document.getElementById("pass2").style.borderColor = "#ccc";
        document.getElementById("passErrLabel").style.display = "none";
        document.getElementById("submitForm").disabled = false;
        if(passOK === 0)
        {
            document.getElementById("pass2").style.borderColor = "red";
            document.getElementById("passErrLabel").style.display = "block";
            document.getElementById("submitForm").disabled = true;
        }
    }
    if(property === "pass1")
    {
        document.getElementById("pass2").style.borderColor = "#ccc";
        document.getElementById("passErrLabel1").style.display = "none";
        document.getElementById("submitForm").disabled = false;
        if(passOK === 0)
        {
            document.getElementById("pass2").style.borderColor = "red";
            document.getElementById("passErrLabel1").style.display = "block";
            document.getElementById("submitForm").disabled = true;
        }
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function searchWord()
{
    var word = document.getElementById("search-bar").value;
    
    var items = document.getElementsByClassName("search-item");
    
    for(var i=0; i<items.length; i++)
    {
        if(items[i].getElementsByClassName("search-text")[0].innerHTML.toLowerCase().indexOf(word) == -1)
        {
            items[i].style.display = "none";
        }
        else
        {
            items[i].style.display = "block";
        }
    }
}

function trashThis(name1)
{
    swal.queue([{
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
  preConfirm: function () {
    return new Promise(function (resolve) {
      $.post( "php/delete.php", { name: name1 })
      .done(function( data ) {
        if(data.indexOf("Object deleted.") != -1)
        {
            swal(
                'Deleted!',
                'Object named '+name1+' was deleted.',
                'success'
                ).then(function () { location.reload(); } );
        }
        else
        {
            swal(
                'Error!',
                data,
                'error'
                )
        }
      });
    })
  }
}])
}