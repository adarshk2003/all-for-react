
async function adduser(event) {
    event.preventDefault();
    console.log("reached here...");

    let name = document.getElementById("name").value;
    console.log("name:", name);

    let email = document.getElementById("email").value;
    console.log("email:", email);

    // let pass = document.getElementById("pass").value;
    // console.log("password:", pass);

    let image = document.getElementById("dp").value;
    console.log("image :",image);

    let adminid = document.getElementById("adminid").value;
    console.log("adminid :",adminid)


    let nameerr = document.getElementById("name-err");
    let emailerr = document.getElementById("email-err");
    let passerr = document.getElementById("pass-err");


    let namereg = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
    let emailreg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passreg = /^.{6,}$/;

    nameerr.innerHTML = '';
    emailerr.innerHTML = '';
    // passerr.innerHTML = '';

    // validation at client side
    if (!name && !email) {
        nameerr.innerHTML = "name is required!";
        emailerr.innerHTML = "email is required!";
        // passerr.innerHTML = "password is required!"
    }

    if (!name) {
        nameerr.innerHTML = "name is required!";
        return;

    }
    else if (!namereg.test(name)) {
        nameerr.innerHTML = "invalid name!"
        return;


    }

    if (!email) {
        emailerr.innerHTML = 'email is required!';
        return;
    }
    else if (!emailreg.test(email)) {
        emailerr.innerHTML = "invalid email!";
        return;
    }

    // if (!pass) {
    //     passerr.innerHTML = 'password required!'
    //     return;
    // }
    // else if (!passreg.test(pass)) {
    //     passerr.innerHTML = "password must contain 6 characters!"
    //     return;
    // }

    let datas = {
        name,
        email,
        image

    };

    console.log("datas:", datas);
    let json_data = JSON.stringify(datas);
    console.log("json_data:", json_data);

    const authToken = localStorage.getItem('authToken');

    let response = await fetch("/users", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `bearer ${authToken}`
        },
        body: json_data
    });
    
    if(response.ok){
        window.location.href = "getallusers.html";
    }

    let parsed_response = await response.text();
    console.log("parsed response:", parsed_response);

    if (parsed_response) {
        alert(parsed_response);
       
    }
    else {
        alert("something went wrong");
    }

}

async function getallusers() {
    console.log("local storage :",localStorage)
    const authToken = localStorage.getItem("authToken");
    console.log("authtoken :",authToken);

    let response = await fetch ("http://localhost:3001/users",  {
        method: "GET",
        headers : {
            "Authorization" : `bearer ${authToken}`,
            "Content-Type" : "application/json"
        }
    })
        try{
            console.log("new response:", response);
            if(!response.ok){
                let parsed_response = await response.json();
                let message =  parsed_response.message;
                alert(message);    
                
            }
            else{

            let datas = await response.json();
            console.log("datassss", datas);
            let tbody = document.getElementById('tbody');
            let content = '';
            for (i = 0; i < datas.length; i++) {
                content = content + `
                <tr>
                <td>${datas[i].name}</td>
                <td>${datas[i].email}</td>
                <td>${datas[i].password}</td>
                <td><button class="btn" onclick="sendid('${datas[i]._id}')">view</button>
                <tr>`
    
    
            }
            tbody.innerHTML = content;
        }
        }
        catch(error){
            console.log("error :",error);
            
        }
}





function sendid(id) {
    console.log("button clicked..")
    console.log("id:", id);
    window.location.href = `getsingleuser.html?id=${id}`
}


async function loaddata() {

    let location = window.location;
    console.log("location :", location);

    let querystring = location.search;
    console.log("querystring :", querystring);

    let queryparams = new URLSearchParams(querystring);
    console.log("queryparams :", queryparams);

    let id = queryparams.get("id");
    console.log("id :", id);

    const authToken = localStorage.getItem("authToken");

    let response = await fetch(`http://localhost:3001/users/${id}`, {
        method: "GET",
        headers: {
            'Authorization' : `bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
    
    })
    console.log("response:", response);

    let parsed_response = await response.text();
    console.log("parsed response:", parsed_response);
    let json_response = JSON.parse(parsed_response);
    console.log("name:", json_response.name);

    let viewuser = document.getElementById("viewuser");
    let content = `
 <div class="img-div"><img src="${json_response.image}" alt=""></div>
 <div class="line"></div>
 <div class="text-div"><h4>${json_response.name}</h4></div>
 <div class="text-div"><h4>${json_response.email}</h4></div>
 <div class="btn-div"><span><button class="btn1" onclick = 'senduserdata("${json_response._id}")'><ion-icon name="create-outline"></ion-icon></button></span>
 <span><button  class="btn1" onclick ='deletedata("${json_response._id}")'><ion-icon name="trash-outline"></ion-icon></button></span></div>`

    viewuser.innerHTML = content;



}

function senduserdata(id) {
    console.log("editdata button clicked...")
    console.log("id:", id);
    window.location.href = `edituser.html?id=${id}`

}

async function edituser() {
    let location = window.location;
    console.log("location :", location);

    let querystring = location.search;
    console.log("querystring :", querystring);

    let queryparams = new URLSearchParams(querystring);
    console.log("queryparams :", queryparams);

    let id = queryparams.get("id");
    console.log("id :", id);

    let response = await fetch(`http://localhost:3001/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'

        },
        
    })
    console.log("response:", response);

    let parsed_response = await response.text();
    console.log("parsed response:", parsed_response);
    let json_response = JSON.parse(parsed_response);
    console.log("json_response", json_response);

    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('pass');
    name.value = json_response.name;
    email.value = json_response.email;
    password.value = json_response.password;


}

async function edituser() {
    let location = window.location;
    console.log("location :", location);

    let querystring = location.search;
    console.log("querystring :", querystring);

    let queryparams = new URLSearchParams(querystring);
    console.log("queryparams :", queryparams);

    let id = queryparams.get("id");
    console.log("id :", id);

    const authToken = localStorage.getItem("authToken");

    let response = await fetch(`http://localhost:3001/users/${id}`, {
        method: "GET",
        headers: {
            'Authorization' : `bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
    
    })
    console.log("response:", response);

    let parsed_response = await response.text();
    console.log("parsed response:", parsed_response);
    let json_response = JSON.parse(parsed_response);
    console.log("json_response", json_response);

    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('pass');
    name.value = json_response.name;
    email.value = json_response.email;
    password.value = json_response.password;


}
async function updateuser(event) {
    event.preventDefault();
    console.log("reached here...");

    let location = window.location;
    console.log("location :", location);

    let querystring = location.search;
    console.log("querystring :", querystring);

    let queryparams = new URLSearchParams(querystring);
    console.log("queryparams :", queryparams);

    let id = queryparams.get("id");
    console.log("id :", id);

    let name = document.getElementById("name").value;
    console.log("name:", name);

    let email = document.getElementById("email").value;
    console.log("email:", email);

    // let pass = document.getElementById("pass").value;
    // console.log("password:", pass);


    let nameerr = document.getElementById("name-err");
    let emailerr = document.getElementById("email-err");
    // let passerr = document.getElementById("pass-err");


    let namereg = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
    let emailreg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passreg = /^.{6,}$/;

    nameerr.innerHTML = '';
    emailerr.innerHTML = '';
    // passerr.innerHTML = '';

    // validation at client side
    if (!name && !email) {
        nameerr.innerHTML = "name is required!";
        emailerr.innerHTML = "email is required!";
        // passerr.innerHTML = "password is required!"
    }

    if (!name) {
        nameerr.innerHTML = "name is required!";
        return;

    }
    else if (!namereg.test(name)) {
        nameerr.innerHTML = "invalid name!"
        return;


    }

    if (!email) {
        emailerr.innerHTML = 'email is required!';
        return;
    }
    else if (!emailreg.test(email)) {
        emailerr.innerHTML = "invalid email!";
        return;
    }

    // if (!pass) {
    //     passerr.innerHTML = 'password required!'
    //     return;
    // }
    // else if (!passreg.test(pass)) {
    //     passerr.innerHTML = "password must contain 6 characters!"
    //     return;
    // }




    let datas = {
        id,
        name,
        email,

    };

    console.log("datas:", datas);
    let json_data = JSON.stringify(datas);
    console.log("json_data:", json_data);

    const authToken = localStorage.getItem("authToken");

    let response = await fetch("http://localhost:3001/users", {
        method: "PUT",
        headers: {
            'Authorization' : `bearer ${authToken}`,
            'Content-Type': 'application/json'

        },
        body: json_data
    })
    console.log("response:", response);

    text_response = await response.text();
    console.log("text_response:", text_response);

    if (text_response) {
        alert(text_response);
        return;
    }
    else {
        alert('something went wrong');
    }

}

// delete data
async function deletedata(id) {

    console.log("id:", id);

    let authToken = localStorage.getItem("authToken")
    let response = await fetch(`http://localhost:3001/users/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `bearer ${authToken}`
        },
        
    })
    console.log("response:", response);

    let text_response = await response.text();

    if(response.ok){
        window.location.href = "index.html";
    }

    if (text_response) {
        alert(text_response);
        return;
    }
    else {
        alert('something went wrong');
    }



}


async function login(event) {
    event.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById("pass").value;

    let datas = {
        email,
        password
    }

    console.log("datas from login :",datas);
    let json_data = JSON.stringify(datas);

    let response = await fetch ("http://localhost:3001/login",{
        method : 'POST',
        headers :{
            "Content-Type" : "application/json", 
        },
        body : json_data
    })


    
    if(response.ok){
        let parsed_response = await  response.json();
        console.log("parsed_response 1:",parsed_response);
        let data = parsed_response.data;
        console.log("data :",data);
        console.log("type of data:",typeof(data));
        alert(parsed_response.message)

        // saving token into browsers local storage
        localStorage.setItem('authToken',parsed_response.data.token);
        let id = data._id;
        console.log('ID from login :',id);
        console.log(localStorage);
        let user_type = data.user_type;
        console.log("user_type :",user_type);
        let is_password_reset = data.is_password_reset;
        if(user_type === "66f420a7384f7819814abf1a"){
            if(is_password_reset === false){
                alert("Reset password to continue");
                window.location.href = "ResetPassword.html"
            }
            else{
                window.location.href = `usershomepage.html?id=${id}`
            }

        }
        else{
            window.location.href = "getallusers.html"
        }

    }
    else{
        let parsed_response = await  response.json();
        console.log("message :",parsed_response.message);
        alert(parsed_response.message);
    }



    
}

function logout() {
    const token = localStorage.getItem("authToken");
    if (token) {
        localStorage.removeItem("authToken");
        alert("Logged out successfully");
        window.location.href = "index.html"
    } else {
        alert("Token not available");
    }
}


async function resetpass(event){
    event.preventDefault();

    let passresetdata = document.getElementById("passresetdata")

    let formdata = new FormData(passresetdata);

    console.log("formdata from passreset :",formdata);

    let current_password = formdata.get("current_password");
    let new_password = formdata.get("new_password");
    let data = {
        current_password,
        new_password
    }
    let json_data = JSON.stringify(data);
    const authToken = localStorage.getItem("authToken")
    let response = await fetch("http://localhost:3001/user",{
        method : 'PUT',
        headers :{
            'Content-Type' : 'application/json',
            'Authorization': `bearer ${authToken}`
        },
        body : json_data
    })
    if(response.ok){
        console.log("response :",response);
        let json_response = await response.json();
        alert(json_response.message);
        let id = json_response.data;
        console.log("id :",id);
        window.location.href = "usershomepage.html";
    }
    else{
        let json_response = await response.json();
        alert(json_response.message);
    }

    







}