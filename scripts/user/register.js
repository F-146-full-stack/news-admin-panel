let registerForm = document.getElementById("registerForm")
let inputs = registerForm.querySelectorAll("input,select")
const registerBtn = document.getElementById('registerBtn')

let image = ""
const uploadImage = async (t) => {
    let formData = new FormData()
    console.log(t.files[0]);
    formData.append("file", t.files[0])
    registerBtn.innerHTML = `<div class="w-5 h-5 mx-auto border-4 border-dashed rounded-full animate-spin dark:border-blue-600"></div>`
    let res = await upload(formData)
    image = res.url
    registerBtn.innerHTML = 'Register'

}

registerForm.onsubmit = async (e) => {
    e.preventDefault()
    let [photoUrl, fullName, username, email, password, gender] = Array.from(inputs).map(item => {
        return item.value
    })
    let obj = {
        photoUrl: image,
        username,
        email,
        password,
        gender,
        fullName
    }
    registerBtn.innerHTML = `<div class="w-5 h-5 mx-auto border-4 border-dashed rounded-full animate-spin dark:border-blue-600"></div>`
    let res = await register(obj)
    registerBtn.innerHTML = 'Register'
    if (res.error) {
        Toastify({
            text: res.statusCode == 409 ? res.message : res.message[0],
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#FF0000",
            }
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
        }).showToast();
        setTimeout(() => {
            location.replace('login.htm')
        }, 1000)
    }
}

