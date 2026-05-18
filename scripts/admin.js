const list = document.querySelectorAll('#list li')
const pages = document.getElementsByClassName("page")



list.forEach((item, index) => {
    list[0].classList.add('bg-blue-200')
    item.onclick = () => {

        Array.from(pages).map(item => item.classList.add("hidden"))
        Array.from(list).map(item => item.classList.remove("bg-blue-200"))
        pages[index].classList.remove('hidden')
        item.classList.add('bg-blue-200')
    }
})
const logOut = () => {
    localStorage.clear()
    location.replace('auth.htm')
}

const loaderModal = document.getElementById('loaderModal')
function globalLoaderState(arg) {
    if (arg) loaderModal.classList.remove('hidden')
    else loaderModal.classList.add('hidden')
}
globalLoaderState(false)