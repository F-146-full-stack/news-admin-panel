const userTable = document.getElementById('userTable')

async function getUsers() {
    let res = await getAllUser()
    renderUserTable(res)
}
getUsers()
function renderUserTable(arr) {
    let empty = ''
    arr.map((item) => {
        let { photoUrl, username, email, gender, role } = item
        empty += ` <tr class="transition">

                                            <!-- USER -->
                                            <td class="px-6 py-4 flex items-center gap-3">
                                                <img src="${photoUrl}"
                                                    class="w-10 h-10 rounded-full border border-gray-700" />
                                                <div>
                                                    <p class="font-medium">${username}</p>
                                                </div>
                                            </td>

                                            <!-- EMAIL -->
                                            <td class="px-6 py-4 text-gray-300">
                                                ${email}
                                            </td>

                                            <!-- ROLE -->
                                            <td class="px-6 py-4">
                                                <span
                                                    class="px-3 py-1 text-xs rounded-full bg-blue-600/20 text-blue-400 border border-blue-600">
                                                    ${role}
                                                </span>
                                            </td>

                                            <!-- GENDER -->
                                            <td class="px-6 py-4">
                                                <span
                                                    class="px-3 py-1 text-xs rounded-full bg-pink-600/20 text-pink-400 border border-pink-600">
                                                    ${gender}
                                                </span>
                                            </td>
                                        </tr>
                                        `})
    userTable.innerHTML = empty
}
renderUserTable([])