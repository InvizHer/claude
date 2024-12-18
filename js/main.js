document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Featured Posts Population
    const featuredPostsContainer = document.getElementById('featured-posts');
    
    // Sample posts data (replace with your actual data or fetch from JSON)
    const featuredPosts = [
        {
            id: 1,
            title: "Introduction to Modern Web Development",
            summary: "Exploring the latest trends and technologies in web development",
            category: "Web Development",
            date: "2024-02-15",
            image: "https://via.placeholder.com/400x250"
        },
        {
            id: 2,
            title: "Understanding React Hooks",
            summary: "A deep dive into React Hooks and their practical applications",
            category: "React",
            date: "2024-03-20",
            image: "https://via.placeholder.com/400x250"
        },
        {
            id: 3,
            title: "Design Patterns in JavaScript",
            summary: "Implementing common design patterns to write cleaner code",
            category: "JavaScript",
            date: "2024-04-10",
            image: "https://via.placeholder.com/400x250"
        }
    ];

    // Populate Featured Posts
    if (featuredPostsContainer) {
        featuredPosts.forEach(post => {
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

            featuredPostsContainer.appendChild(postElement);
        });
    }
});
