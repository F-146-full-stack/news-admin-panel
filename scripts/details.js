let query = new URLSearchParams(location.search)
let id = query.get("id")

const pageContent = document.getElementById('pageContent')

async function getNews() {
    let res = await getNewsById(id)
    console.log(res);
    renderPage(res.news)
}
getNews()

function renderPage(arg) {
    pageContent.innerHTML = `<div>
                        <div class="relative h-[80vh] rounded-2xl overflow-hidden">
                            <img src=${arg.thumbnail}
                                class="w-full h-full object-cover" alt="">
                                <span class="absolute top-3 left-3 z-3 bg-white text-black px-4 font-semibold  rounded-[5px]">Category</span>
                            </div>
                        <p class="mt-1 text-end ">Tarix : 2026-03-07</p>
                        <h1 class="font-semibold pt-5 pb-5 text-5xl font-serif">${arg.title}</h1>
                        <p class="text-[#808080] italic first-letter:text-5xl">${arg.content}</p>
                        <div class="stats shadow w-full mt-10">
                            <div class="stat">
                                <div class="stat-figure text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        class="inline-block h-8 w-8 stroke-current">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                                        </path>
                                    </svg>
                                </div>
                                <div class="stat-title">Total Likes</div>
                                <div class="stat-value text-primary">25.6K</div>
                            </div>

                            <div class="stat">
                                <div class="stat-figure text-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        class="inline-block h-8 w-8 stroke-current">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                </div>
                                <div class="stat-title">Page Views</div>
                                <div class="stat-value text-secondary">2.6M</div>
                            </div>
                            <div class="stat">
                                <div class="stat-figure text-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        class="inline-block h-8 w-8 stroke-current">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                </div>
                                <div class="stat-title">DisLike</div>
                                <div class="stat-value text-secondary">2.6M</div>
                            </div>

                        </div>
                    </div>`

}
renderPage([])