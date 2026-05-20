let token = localStorage.getItem('token')
let user = JSON.parse(localStorage.getItem('user'))

const changeForm = document.getElementById('changeForm')
const editBtn = document.getElementById('editBtn')
const photoIcon = document.getElementById('photoIcon')
const toggleChange = (arg) => {
    editBtn.style.display = arg ? 'none' : "block"
    photoIcon.classList.toggle('hidden')
    changeForm.classList.toggle('hidden')
    if(!arg) {
        renderPage()
    }
}
// const closeChange = () => {
//     editBtn.style.display = "block"
//     saveBtn.classList.add('hidden')
//     changeForm.classList.add('hidden')
// }

const profileImage = document.getElementById('profileImage')
const userImage = document.getElementById('userImage')
const role = document.getElementById('role')
const email = document.getElementById('email')
const fullName = document.getElementById('fullName')
const userName = document.getElementById('userName')
function renderPage() {
    role.innerHTML = user.role
    email.innerHTML = user.email
    fullName.innerHTML = user.fullName
    userName.innerHTML = user.username
    profileImage.src = user.photoUrl
    userImage.src = user.photoUrl
}
renderPage()
const updateForm = document.getElementById('updateForm')
const inputs = updateForm.querySelectorAll('input , select')
function renderForm() {
    inputs[0].value = user.fullName
    inputs[1].value = user.username
    inputs[2].value = user.gender
}
renderForm()
let image = user.photoUrl
updateForm.onsubmit = async (e) => {
    e.preventDefault()
    let [fullName, username, gender] = Array.from(inputs).map(item => item.value)
    let obj = {
        photoUrl: image, username, fullName, gender
    }
    stateLoader(true)
    let res = await userMe(obj)
    stateLoader(false)
    if (res.error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.message,
            footer: "<a href=\"#\">Why do I have this issue?</a>"
        });
    }
    else {
        user.photoUrl = image
        user.username = username
        user.fullName = fullName
        user.gender = gender
        localStorage.setItem('user', JSON.stringify(user))
        Swal.fire({
            title: res.message,
            icon: "success",
            draggable: true
        });
        renderPage()
        toggleChange(false)
    }
}
const save_btn = document.getElementById('save_btn')
function stateLoader(arg) {
    save_btn.innerHTML = arg ? '<i class="fa-solid animate-spin fa-circle-notch"></i>' : '<i class="fa-regular fa-floppy-disk"></i>'
}

const openSheet = async () => {
    let input = document.createElement('input')
    input.type = 'file'
    input.click()
    input.onchange = async () => {
        let formData = new FormData()
        formData.append('file', input.files[0])
        stateLoader(true)
        let res = await upload(formData)
        stateLoader(false)
        profileImage.src = res.url
        image = res.url

    }
}