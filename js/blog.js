document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const paginationContainer = document.getElementById('pagination');

    // Sample posts data (replace with your actual data or fetch from JSON)
    const allPosts = [
        {
            id: 1,
            title: "Introduction to Modern Web Development",
            summary: "Exploring the latest trends and technologies in web development",
            category: "Web Development",
            date: "2024-02-15",
            image: "https://via.placeholder.com/400x250",
            content: "Full article content would go here..."
        },
        {
            id: 2,
            title: "Understanding React Hooks",
            summary: "A deep dive into React Hooks and their practical applications",
            category: "React",
            date: "2024-03-20",
            image: "https://via.placeholder.com/400x250",
            content: "Comprehensive explanation of React Hooks..."
        },
        // Add more posts here
    ];

    const POSTS_PER_PAGE = 6;
    let currentPage = 1;

    function renderPosts(posts) {
        postsContainer.innerHTML = '';
        
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;
        const paginatedPosts = posts.slice(startIndex, endIndex);

        paginatedPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'overflow-hidden', 'hover:shadow-xl', 'transition-shadow', 'duration-300');
            
            postElement.innerHTML = `
                <img src="${post.image}" alt="${post.title}" class="w-full h-48 object-cover">
                <div class="p-5">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            ${post.category}
                        </span>
                        <span class="text-sm text-gray-500">
                            ${post.date}
                        </span>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">
                        ${post.title}
                    </h3>
                    <p class="text-gray-600 mb-4">
                        ${post.summary}
                    </p>
                    <a 
                        href="article.html?id=${post.id}" 
                        class="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Read More →
                    </a>
                </div>
            `;

            postsContainer.appendChild(postElement);
        });
    }

    function renderPagination(totalPosts) {
        const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE);
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.add(
                'px-4', 
                'py-2', 
                'border', 
                'rounded', 
                currentPage === i ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
            );
            
            pageButton.addEventListener('click', () => {
                currentPage = i;
                filterPosts();
            });

            paginationContainer.appendChild(pageButton);
        }
    }

    function filterPosts() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        const filteredPosts = allPosts.filter(post => 
            (selectedCategory === '' || post.category === selectedCategory) &&
            (post.title.toLowerCase().includes(searchTerm) || 
             post.summary.toLowerCase().includes(searchTerm))
        );

        renderPosts(filteredPosts);
        renderPagination(filteredPosts);
    }

    // Event Listeners
    searchInput.addEventListener('input', filterPosts);
    categoryFilter.addEventListener('change', filterPosts);

    // Initial render
    filterPosts();
});
