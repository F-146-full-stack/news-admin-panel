const categoryTable = document.getElementById('categoryTable')
const categoryForm = document.getElementById('categoryForm')
const categoryInputs = categoryForm.querySelectorAll('input')
const titleInput = document.getElementById('titleInput')
const slugInput = document.getElementById('slugInput')
categoryForm.onsubmit = async (e) => {
    e.preventDefault()
    let [title, slug] = Array.from(categoryInputs).map(item => item.value)
    let category = { title, slug }
    let res = await createCategory(category)
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
    getCategory()
    my_modal_3.close()
    Array.from(categoryInputs).map(item => item.value = '')
}

const deleteCategory = async (id) => {
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
            let res = await deleteCategoryById(id)
            await getCategory()
            Swal.fire({
                title: "Deleted!",
                text: res.message,
                icon: "success"
            });
        }
    });

}

const updateCategoryForm = document.getElementById('updateCategoryForm')

let categoryId = 0
const openEditModal = async (id, title, slug) => {
    categoryId = id
    my_modal_6.showModal()
    titleInput.value = title
    slugInput.value = slug
}

updateCategoryForm.onsubmit = async (e) => {
    e.preventDefault()
    let category = {
        title: titleInput.value,
        slug: slugInput.value
    }
    let data = await updateCategoryById(category, categoryId)
    if (data.error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.message[0],
            customClass: {
                container: 'swal-high-z'
            }
        });
    }
    else {
        Swal.fire({
            title: data.message,
            icon: "success",
            draggable: true
        });
    }
    getCategory()
    my_modal_6.close()
}

async function getCategory() {
    let data = await getAllCategory()
    renderCategory(data)
}
getCategory()

function renderCategory(arr) {
    let empty = ""
    arr.map((item, index) => empty += `
                                        <tr class="">
                                            <td class="px-6 py-4 font-medium">${index + 1}</td>
                                            <td class="px-6 py-4">${item.title}</td>
                                            <td class="px-6 py-4 text-blue-400">${item.slug}</td>
                                            <td class="px-6 py-4 text-gray-400">${item.createdAt.split('T')[0]}</td>
                                            <td class="px-6 py-4 text-gray-400">${item.updatedAd.split('T')[0]}</td>
                                            <td class="px-6 py-4">
                                                <div class="flex items-center justify-center gap-3">
                                                    <button
                                                        onclick="openEditModal(${item.id},'${item.title}' , '${item.slug}')"
                                                        class="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                                                        Edit
                                                    </button>
                                                    <button
                                                        onclick='deleteCategory(${item.id})'
                                                        class="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 rounded-lg transition">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>`)
    categoryTable.innerHTML = empty
}