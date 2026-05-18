const newsTable = document.getElementById('newsTable')
const addNewsForm = document.getElementById('addNewsForm')
const inputs = addNewsForm.querySelectorAll('input , textarea , select')
addNewsForm.onsubmit = async (e) => {
    e.preventDefault()
    let [title, content, slug, categoryId, thumbnail] = Array.from(inputs).map(item => item.value)
    let news = { title, content, slug, categoryId: +categoryId, thumbnail }
    globalLoaderState(true)
    let res = await createNews(news)
    globalLoaderState(false)
    if (res.error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.message[0],
            customClass: {
                container: 'swal-high-z'
            }
        });
    }
    else {
        Swal.fire({
            title: res.message,
            icon: "success",
            draggable: true
        });
    }
    getNews()
    my_modal_1.close()
}
const deleteNews = async (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            let res = await deleteNewsById(id)
            await getNews()
            Swal.fire({
                title: "Deleted!",
                text: res.message,
                icon: "success"
            })
        };
    });
}


const getNews = async (page = 1, limit = 5) => {
    let res = await getAllNews(page, limit)
    renderTable(res.items)
    renderPagination(res.meta.page, res.meta.totalPages)
}
getNews()

const pagination = document.getElementById('pagination')

function renderPagination(activePage, totalPage) {
    let empty = ''
    for (let i = 1; i <= totalPage; i++) {
        empty += `<button onclick='changePage(${i})' class="join-item ${i == activePage && "btn-active"} btn">${i}</button>`
    }
    pagination.innerHTML = empty
}

async function changePage(page) {
    await getNews(page)
}

const categorySelect = document.getElementById('categorySelect')
const updateCategorySelect = document.getElementById('updateCategorySelect')
async function getCategory() {
    let data = await getAllCategory()
    renderCategorySelect(data)
    updateCategorySelect(data)
}
getCategory()
function renderCategorySelect(arr) {
    let empty = ''
    arr.map(item => empty += `<option value=${item.id} >${item.title}</option>`)
    categorySelect.innerHTML += empty
    updateCategorySelect.innerHTML += empty
}
const updateTitle = document.getElementById('updateTitle')
const updateContent = document.getElementById('updateContent')
const updateSlug = document.getElementById('updateSlug')
const updateUrl = document.getElementById('updateUrl')
let globalNewsId = 0
const openNewsUpdateModal = async (id) => {
    my_modal_7.showModal()
    globalNewsId = id
    let { news } = await getNewsById(id)
    updateTitle.value = news.title
    updateContent.value = news.content
    updateCategorySelect.value = news.category.id
    updateSlug.value = news.slug
    updateUrl.value = news.thumbnail
}

const updateNewsForm = document.getElementById('updateNewsForm')

updateNewsForm.onsubmit = async (e) => {
    e.preventDefault()
    let newsObj = {
        title: updateTitle.value,
        content: updateContent.value,
        slug: updateSlug.value,
        categoryId: +updateCategorySelect.value,
        thumbnail: updateUrl.value
    }
    let res = await updateNewsById(newsObj, globalNewsId)
    if (res.error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.message[0],
            customClass: {
                container: 'swal-high-z'
            }
        });
    }
    else {
        Swal.fire({
            title: res.message,
            icon: "success",
            draggable: true
        });
    }
    my_modal_7.close()
    await getNews()
}

function renderTable(arr) {
    let empty = ""
    globalLoaderState(false)
    arr.map((item, index) => empty += `<tr>
                                    <th>${index + 1}</th>
                                    <td><img class="w-20 h-10 object-contain" src=${item.thumbnail}/></td>
                                    <td>${item.title}</td>
                                    <td>${item.slug}</td>
                                    <td>${item.like}</td>
                                    <td>${item.dislike}</td>
                                    <td>${item.views}</td>
                                    <td>${item.category.title}</td>
                                    <td class="whitespace-nowrap">${item.createdAt.split('T')[0]}</td>
                                    <td>${item.isPin ? '<i class="fa-solid fa-thumbtack-slash"></i>' : '<i class="fa-solid fa-thumbtack"></i>'}</td>
                                    
                                    <td>
                                        <button onclick="openNewsUpdateModal(${item.id})">Edit</button>
                                        <button onclick="deleteNews(${item.id})">Delete</button>
                                    </td>
                                </tr>`)
    newsTable.innerHTML = empty
}

renderTable([])
