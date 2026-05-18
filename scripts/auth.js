const loginForm = document.getElementById('loginForm')
const inputs = loginForm.querySelectorAll('input')
const btn = document.getElementById('btn')
const toast = document.getElementById('toast')
loginForm.onsubmit = async (e) => {
    e.preventDefault()

    let [email, password] = Array.from(inputs).map(item => item.value)
    let obj = { email, password }

    btn.innerHTML = `<div class="w-6 h-6 border-4 mx-auto border-dashed rounded-full animate-spin dark:border-blue-600"></div>`
    btn.disabled = true
    let res = await login(obj)
    btn.innerHTML = "Login"
    btn.disabled = false

    if (res.error || res.user.role == "user") {
        let message = res.error ? res.message : "Access Denied"
        renderToast(true, message)
    }
    else {
        localStorage.setItem("token", res.token)
        localStorage.setItem('user', JSON.stringify(res.user))
        renderToast(false, res.message)
    }

}


function renderToast(error, message) {
    toast.innerHTML = `<div
            class="fixed top-5 right-5  z-50">

            <div
                class="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 min-w-[320px]">

                <div class="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    ${error ? `<svg xmlns="http://www.w3.org/2000/svg" 
                        class="w-6 h-6 text-red-400" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor">
                        <path stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="2" 
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>` : `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>`}
                </div>

                <!-- Text -->
                <div>
                    <h4 class="font-semibold text-sm">${error ? "Error" : "Succes"}</h4>
                    <p class="text-sm text-slate-300">${message}</p>
                </div>
            </div>
        </div>`

    setTimeout(() => {
        toast.innerHTML = ""
    }, 2000)
    if (!error) {
        setTimeout(() => {
            location.replace('admin.htm')
        }, 1000)
    }
}