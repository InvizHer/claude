document.addEventListener('DOMContentLoaded', () => {
    // Sample posts data (replace with your actual data or fetch from JSON)
    const allPosts = [
        {
            id: 1,
            title: "Introduction to Modern Web Development",
            summary: "Exploring the latest trends and technologies in web development",
            category: "Web Development",
            date: "2024-02-15",
            author: "Your Name",
            image: "https://via.placeholder.com/1200x600",
            content: `
                <p>Web development has evolved significantly in recent years, with new technologies and frameworks emerging constantly. This article explores the current landscape of modern web development.</p>
                
                <h2>Key Trends in Web Development</h2>
                <ul>
                    <li>Progressive Web Applications (PWAs)</li>
                    <li>Single Page Applications (SPAs)</li>
                    <li>Serverless Architecture</li>
                </ul>
                
                <p>Each of these trends represents a significant shift in how we approach web development, offering improved performance and user experience.</p>
            `
        },
        // Add more posts here
    ];

    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1]);
    }

    // Load Article Details
    function loadArticleDetails() {
        const postId = parseInt(getUrlParameter('id'));
        const post = allPosts.find(p => p.id === postId);

        if (post) {
            // Set article details
            document.getElementById('article-title').textContent = post.title;
            document.getElementById('article-category').textContent = post.category;
            document.getElementById('article-author').textContent = `By ${post.author}`;
            document.getElementById('article-date').textContent = post.date;
            document.getElementById('article-image').src = post.image;
            document.getElementById('article-content').innerHTML = post.content;
        }
    }

    // Render Related Posts
    function renderRelatedPosts() {
        const relatedPostsContainer = document.getElementById('related-posts');
        const currentPostId = parseInt(getUrlParameter('id'));

        // Filter related posts (same category, excluding current post)
        const relatedPosts = allPosts
            .filter(post => 
                post.id !== currentPostId && 
                post.category === allPosts.find(p => p.id === currentPostId)?.category
            )
            .slice(0, 3);

        relatedPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'overflow-hidden');
            
            postElement.innerHTML = `
                <img src="${post.image}" alt="${post.title}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h4 class="text-lg font-semibold mb-2">${post.title}</h4>
                    <a href="article.html?id=${post.id}" class="text-blue-600 hover:underline">
                        Read More
                    </a>
                </div>
            `;

            relatedPostsContainer.appendChild(postElement);
        });
    }

    // Share Article Function
    function setupShareButtons() {
        const shareButtons = document.querySelectorAll('button');
        shareButtons.forEach(button => {
            button.addEventListener('click', () => {
                const url = window.location.href;
                const title = document.getElementById('article-title').textContent;
                
                // Placeholder share logic
                switch(button.textContent.trim()) {
                    case 'Facebook':
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, 'facebook-share-dialog');
                        break;
                    case 'Twitter':
                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, 'twitter-share-dialog');
                        break;
                    case 'LinkedIn':
                        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, 'linkedin-share-dialog');
                        break;
                }
            });
        });
    }

    // Initialize page
    loadArticleDetails();
    renderRelatedPosts();
    setupShareButtons();
});
