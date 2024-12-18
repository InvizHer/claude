document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    let allPosts = [];
    let currentPage = 1;
    const postsPerPage = 6;

    async function loadPosts() {
        try {
            const response = await fetch('data/posts.json');
            allPosts = await response.json();
            renderPosts();
        } catch (error) {
            console.error('Error loading posts:', error);
            postsContainer.innerHTML = '<p>Unable to load posts</p>';
        }
    }

    function renderPosts(filteredPosts = allPosts) {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

        postsContainer.innerHTML = paginatedPosts.map(post => `
            <div class="post-card">
                <img src="${post.thumbnail}" alt="${post.title}">
                <div class="post-card-content">
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <div class="post-meta">
                        <span>${new Date(post.date).toLocaleDateString()}</span>
                        <span class="category">${post.category}</span>
                        <a href="article.html?id=${post.id}">Read More</a>
                    </div>
                </div>
            </div>
        `).join('');

        updatePagination(filteredPosts);
    }

    function updatePagination(filteredPosts) {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    }

    function filterPosts() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        const filteredPosts = allPosts.filter(post => 
            (searchTerm === '' || post.title.toLowerCase().includes(searchTerm)) &&
            (selectedCategory === '' || post.category.toLowerCase() === selectedCategory)
        );

        currentPage = 1;
        renderPosts(filteredPosts);
    }

    searchInput.addEventListener('input', filterPosts);
    categoryFilter.addEventListener('change', filterPosts);

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderPosts();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(allPosts.length / postsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderPosts();
        }
    });

    loadPosts();
});
