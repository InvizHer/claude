document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Load Recent Posts on Home Page
    async function loadRecentPosts() {
        const postsContainer = document.getElementById('recent-posts-container');
        
        if (!postsContainer) return;

        try {
            const response = await fetch('data/posts.json');
            const posts = await response.json();

            // Sort posts by date and take first 3
            const recentPosts = posts
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 3);

            postsContainer.innerHTML = recentPosts.map(post => `
                <div class="post-card">
                    <img src="${post.thumbnail}" alt="${post.title}">
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <div class="post-meta">
                        <span>${new Date(post.date).toLocaleDateString()}</span>
                        <a href="article.html?id=${post.id}">Read More</a>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading posts:', error);
            postsContainer.innerHTML = '<p>Unable to load posts</p>';
        }
    }

    // Smooth Scrolling for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Initialize functions
    loadRecentPosts();
});
