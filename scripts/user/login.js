const loginForm = document.getElementById('loginForm')
const email = document.getElementById('email')
const password = document.getElementById('password')
const loginBtn = document.getElementById('loginBtn')
loginForm.onsubmit = async (e) => {
    e.preventDefault()
    loginBtn.innerHTML = `<div class="flex justify-center"><i class="fa-solid fa-spinner animate-spin"></i></div>`
    let params = {
        email: email.value,
        password: password.value
    }
    let res = await login(params)
    console.log(res);

    loginBtn.innerHTML = 'Log In'
    if (res.error) {
        Toastify({
            text: res.message,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#FF0000",
            },
            onClick: function () { } // Callback after click
        }).showToast();
    }
    else {
        Toastify({
            text: res.message,
            duration: 3000,
            newWindow: true,
            close: false,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "green",
            },
            onClick: function () { } // Callback after click
        }).showToast();
        localStorage.setItem('token', res.token)
        localStorage.setItem('user', JSON.stringify(res.user))
        setTimeout(() => {
            location.replace('index.htm')
        }, 1000)
    }

}