const newsArea = document.getElementById('newsArea')
const pagination = document.getElementById('pagination')
async function renderNews(page = 1) {
  let res = await getAllNews(page)
  renderCards(res.items)
  renderPagination(res.meta.totalPages, res.meta.page);
}
renderCards([])
renderNews()
async function changePage(index) {
  await renderNews(index)
}
function renderPagination(pageCount, activePage) {
  let empty = ''
  for (let i = 0; i < pageCount; i++) {
    empty += `<button onclick='changePage(${i + 1})' class="join-item ${activePage == (i + 1) ? 'btn-active' : ""} btn">${i + 1}</button>`
  }
  pagination.innerHTML = empty
}
function sendDetailPage(id) {
  location.replace(`detail.htm?id=${id}`)
}
function navigateLogin() {
  location.replace('login.htm')
}

async function getCategories() {
  let res = await getAllCategory()
  renderCategories(false, res)
}

getCategories()

const categories = document.getElementById('categories')
function renderCategories(loader, arr) {

  let empty = ''
  if (loader) {
    empty = `<div class="flex justify-center"><span class="loading loading-bars loading-xl"></span></div>`
  }
  else {
    arr.map(item => empty += `<li>
                              <button class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
  
                                  <span class="is-drawer-close:hidden">${item.title}</span>
                              </button>
                          </li>`)
  }
  categories.innerHTML = empty
}

renderCategories(true)


const login_btn = document.getElementById('login_btn')
const profile = document.getElementById("profile")
const userImage = document.getElementById('userImage')
function checkUser() {
  let token = localStorage.getItem('token')
  let user = JSON.parse(localStorage.getItem('user'))
  if (token) {
    login_btn.classList.add('hidden')
    profile.classList.remove('hidden')
    userImage.src = user.photoUrl
  }
  else {
    profile.classList.add('hidden')
    login_btn.classList.remove('hidden')

  }
}
checkUser()
const logOut = () => {
  localStorage.clear()
  checkUser()
}


function renderCards(arr) {
  let empty = ''
  if (arr.length == 0) {
    newsArea.classList.remove('grid')
    empty = `<div class="flex items-center justify-center"><span class="loading  loading-ring w-25 h-25"></span></div>`
  }
  else {
    newsArea.classList.add('grid')
    arr.map(item => empty += `
      <div class="max-w-sm bg-white rounded-xl shadow-md overflow-hidden">

    <!-- Image -->
    <img class="w-full h-56 object-cover" src="${item.thumbnail}" alt="oil">

    <!-- Content -->
    <div class="p-4">

      <!-- Meta -->
      <div class="flex items-center justify-between text-gray-500 text-sm mb-3">
        <div class="flex items-center gap-2">
          <i class="fa-regular fa-calendar"></i>
          <span>BU GÜN / 21:30</span>
        </div>

        <div class="flex items-center gap-1">
          <i class="fa-regular fa-eye"></i>
          <span>41</span>
        </div>
      </div>

      <!-- Title -->
      <h2 class="text-lg font-semibold text-gray-900 leading-snug mb-4">
        ${item.title}
      </h2>

      <!-- Footer -->
      <div class="flex items-center justify-between">
        <span class="text-teal-600 font-semibold text-sm uppercase">
          ${item.category.title}
        </span>

        <div class="flex items-center gap-4 text-gray-600">
          <div class="flex items-center gap-1">
            <i class="fa-regular fa-thumbs-up"></i>
            <span>4</span>
          </div>

          <div class="flex items-center gap-1">
            <i class="fa-regular fa-thumbs-down"></i>
            <span>0</span>
          </div>
        </div>
      </div>
          <div class="pt-2"><button onclick="sendDetailPage(${item.id})" class="btn w-full btn-primary">Ətraflı Bax</button></div>
    </div>
  </div>`)
  }
  newsArea.innerHTML = empty
}
