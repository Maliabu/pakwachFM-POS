export const preloader = () => {
    document.getElementById("successMessage").innerHTML = "processing..."
}
export const dismissPreloader = () => {
    document.getElementById("successMessage").innerHTML = "Next"
}
export const preloaderCheckout = () => {
    document.getElementById("checkout").innerHTML = "Redirecting please wait..."
    setTimeout(() => {
        document.getElementById("checkout").style.display = 'none'
    }, 3000);
}
export const preloaderCheckouts = () => {
    document.getElementById("checkouts").innerHTML = "Redirecting please wait..."
    setTimeout(() => {
        document.getElementById("checkouts").style.display = 'none'
    }, 3000);
}
export const preloaderCartDelete = (name) => {
    document.getElementById("deleteMessage").style.display = "block"
    document.getElementById("deleteMessage").innerHTML = "Deleting product..."+name
}
export const success = (message, redirect, successMessage) => {
    document.getElementById("successMessage").innerHTML = successMessage
    document.getElementById("successMessage").style.backgroundColor = "black"
    document.getElementById("successMessage").style.color = "white"
    document.getElementById("infoMessage").style.display = 'block'
    document.getElementById("infoMessage").style.color = "black"
    document.getElementById("infoMessage").style.border = '1px solid black'
    document.getElementById("infoMessage").innerText = message
    setTimeout(() => {
        document.getElementById("infoMessage").style.display = 'none'
    }, 2000);
    setTimeout(() => {
        window.location.pathname = redirect
    }, 2000);
}
export const success1 = (message, successMessage) => {
    document.getElementById("successMessage").innerHTML = successMessage
    document.getElementById("successMessage").style.backgroundColor = "black"
    document.getElementById("successMessage").style.color = "white"
    document.getElementById("infoMessage").style.display = 'block'
    document.getElementById("infoMessage").style.color = "black"
    document.getElementById("infoMessage").innerText = message
    setTimeout(() => {
        document.getElementById("infoMessage").style.display = 'none'
    }, 5000);
}
export const success2 = (redirect) => {
    setTimeout(() => {
        window.location.pathname = redirect
    }, 2000);
}
export const fail = (error, type) => {
    if(type){
        document.getElementById("successMessage").innerHTML = "Unsuccessful"
        document.getElementById("successMessage").style.backgroundColor = "red"
        document.getElementById("successMessage").style.color = "white"
        document.getElementById("errorMessage").innerText = error+": "+type
        document.getElementById("errorMessage").style.display = 'block'
        document.getElementById("errorMessage").style.color = "red"
        document.getElementById("errorMessage").style.backgroundColor = '#ff353535'
        setTimeout(() => {
            document.getElementById("errorMessage").style.display = 'none'
        }, 5000);
        setTimeout(() => {
            document.getElementById("successMessage").innerHTML = "Submit"
            // document.getElementById("successMessage").style.backgroundColor = "black"
            document.getElementById("successMessage").style.color = "white"
        }, 6000);
    } else{
        document.getElementById("successMessage").innerHTML = "Unsuccessful"
        document.getElementById("successMessage").style.backgroundColor = "red"
        document.getElementById("successMessage").style.color = "white"
        document.getElementById("errorMessage").innerText = error
        document.getElementById("errorMessage").style.display = 'block'
        document.getElementById("errorMessage").style.color = "red"
        document.getElementById("errorMessage").style.backgroundColor = '#ff353535'
        setTimeout(() => {
            document.getElementById("errorMessage").style.display = 'none'
        }, 5000);
        setTimeout(() => {
            document.getElementById("successMessage").innerHTML = "Submit"
            // document.getElementById("successMessage").style.backgroundColor = "black"
            document.getElementById("successMessage").style.color = "white"
        }, 6000);
    }
}
export const catch_errors = (error) => {
    if (error.response) {
        if (error.response.status === 403) {
            fail("Server Error")
        } else if (error.response.status === 500) {
            fail("Your connection reset, try agin later")
        } else if (error.response.status === 404) {
            fail("We cant find what you are looking for")
        }
    } else if (error.request) {
        // The request was made but no response was received
        fail("Server Error")
    } else {
        // Something happened in setting up the request that triggered an Error
        fail("Server Error")
    }
}
export const togglePasswordVisibility = ()=>{
    if(document.getElementById('password').type === "password"){
        document.getElementById('password').type = "text"
    } else{
        document.getElementById('password').type = "password"
    }
}
export const autoClickable = () =>{
    document.getElementById("errorMessage").style.display = 'block'
    document.getElementById("errorMessage").style.color = "red"
    document.getElementById("errorMessage").style.backgroundColor = '#ff353535'
    document.getElementById("errorMessage").innerText = "Please make payment before submission..."
    setTimeout(() => {
        document.getElementById("errorMessage").style.display = 'none'
    }, 2000);
}

// subscription modal popup on login success
export const subscriptionPopup = () => {
    setTimeout(() => {
        document.getElementById("subscription-popup").style.display = 'block'
    }, 7000);
}
export const ValidateForms = (name) => {
    let field = document.getElementsByName(name)
    let value = field[0].value
    return value
}
export const checkUser = (username) => {
    let user = ""
    let todo = ""
    if(username === undefined){
        user = "Guest"
        todo = "Please login"
    }else {
        user = username
        todo = "Lets Get Started"
    }
    return [user, todo]
}