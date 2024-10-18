const postsPerPage = 5; // Number of posts to display per page
let currentPage = 1;
let allPosts = [];

// Function to fetch blog posts
async function fetchBlogPosts() {
    const blogUrl = 'https://omkarjyotish.blogspot.com/feeds/posts/default?alt=json-in-script&callback=handleBlogPosts';

    const script = document.createElement('script');
    script.src = blogUrl;
    document.body.appendChild(script);
}

// Function to handle the fetched blog posts
function handleBlogPosts(data) {
    const entries = data.feed.entry;
    allPosts = entries.map(entry => ({
        title: entry.title.$t,
        link: entry.link.find(link => link.rel === 'alternate').href,
        published: entry.published.$t,
        content: entry.content.$t,
        image: entry.media$thumbnail ? entry.media$thumbnail.url : null // Set to null if no image
    }));

    displayPosts();
}

// Function to display posts based on the current page
function displayPosts() {
    const blogPostsDiv = document.getElementById('blog-posts');
    blogPostsDiv.innerHTML = ''; // Clear previous posts

    // Calculate start and end index for the current page
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const postsToDisplay = allPosts.slice(start, end);

    // Create each post card
    postsToDisplay.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post', 'theme-card-class'); // Replace 'theme-card-class' with your theme's card class

        postDiv.innerHTML = `
            <div class="item-content">
                <header class="entry-header">
                    <h2 class="gujarati-text">
                        <a href="${post.link}" target="_blank">${post.title}</a>
                    </h2>
                    <div class="entry-meta gujarati-text">
                        <span>Published on: ${new Date(post.published).toLocaleDateString()}</span>
                    </div>
                </header>
                <div class="entry-content">
                    ${post.image ? `<div class="item-media post-thumbnail"><img src="${post.image}" alt="Post image" class="img-fluid"></div>` : ''}
                    <p class="gujarati-text">${post.content}</p>
                </div>
            </div>
        `;
        blogPostsDiv.appendChild(postDiv);
    });

    // Create pagination
    createPagination();
}

// Function to create pagination
function createPagination() {
    const paginationDiv = document.createElement('nav');
    paginationDiv.className = 'woocommerce-pagination';
    const ul = document.createElement('ul');
    ul.className = 'page-numbers';

    const totalPages = Math.ceil(allPosts.length / postsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.innerText = i;
        link.className = (i === currentPage) ? 'current' : ''; // Use 'current' class for current page
        link.style.margin = '0 5px';
        link.style.cursor = 'pointer';

        link.onclick = (event) => {
            event.preventDefault();
            currentPage = i;
            displayPosts();
        };

        pageLink.appendChild(link);
        ul.appendChild(pageLink);
    }

    paginationDiv.appendChild(ul);
    document.getElementById('blog-posts').appendChild(paginationDiv);
}

// Fetch blog posts on page load
document.addEventListener('DOMContentLoaded', fetchBlogPosts);
