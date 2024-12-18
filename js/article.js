document.addEventListener('DOMContentLoaded', () => {
    const articleContainer = document.getElementById('article-container');
    const relatedPostsContainer = document.getElementById('related-posts-container');

    // Extract post ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));
    async function loadArticle() {
        try {
            const response = await fetch('data/posts.json');
            const posts = await response.json();
            const article = posts.find(post => post.id === postId);

            if (!article) {
                articleContainer.innerHTML = '<p>Article not found</p>';
                return;
            }

            // Render Article Content
            articleContainer.innerHTML = `
                <div class="article-header">
                    <h1>${article.title}</h1>
                    <div class="article-meta">
                        <span>Category: ${article.category}</span>
                        <span>Published: ${new Date(article.date).toLocaleDateString()}</span>
                        <span>Author: ${article.author}</span>
                    </div>
                </div>
                <div class="article-content">
                    ${article.content}
                </div>
            `;

            loadRelatedPosts(article.category);
            setupShareButtons(article);
        } catch (error) {
            console.error('Error loading article:', error);
            articleContainer.innerHTML = '<p>Unable to load article</p>';
        }
    }

    function loadRelatedPosts(category) {
        fetch('data/posts.json')
            .then(response => response.json())
            .then(posts => {
                const relatedPosts = posts
                    .filter(post => post.category === category && post.id !== postId)
                    .slice(0, 3);

                relatedPostsContainer.innerHTML = relatedPosts.map(post => `
                    <div class="related-post">
                        <img src="${post.thumbnail}" alt="${post.title}">
                        <h3>${post.title}</h3>
                        <a href="article.html?id=${post.id}">Read More</a>
                    </div>
                `).join('');
            });
    }

    function setupShareButtons(article) {
        const shareUrl = encodeURIComponent(window.location.href);
        const shareTitle = encodeURIComponent(article.title);

        document.querySelector('.share-twitter').href = 
            `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`;
        
        document.querySelector('.share-linkedin').href = 
            `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        
        document.querySelector('.share-facebook').href = 
            `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    }

    // Load article when page loads
    loadArticle();
});
