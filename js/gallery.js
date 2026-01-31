// Gallery Management with RESTful Table API
let currentFilter = 'all';
let currentPage = 1;
const itemsPerPage = 9;

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', function() {
    loadGallery();
    setupFilters();
    setupLightbox();
});

// Load gallery items from API
async function loadGallery(filter = 'all', page = 1) {
    try {
        // Build API URL
        let apiUrl = `tables/gallery?page=${page}&limit=${itemsPerPage}&sort=-created_at`;
        
        // Add category filter if not 'all'
        if (filter !== 'all') {
            // Capitalize first letter to match schema options (Sapphires, Rubies, Emeralds)
            const capitalizedFilter = filter.charAt(0).toUpperCase() + filter.slice(1);
            apiUrl += `&search=${capitalizedFilter}`;
        }

        // Show loading state
        const grid = document.getElementById('gallery-grid');
        grid.innerHTML = '<div class="loading">Loading gallery...</div>';

        // Fetch data from API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Render gallery items
        renderGallery(data.data);
        
        // Update pagination if needed
        if (data.total > itemsPerPage) {
            renderPagination(data.total, data.page, data.limit);
        }

    } catch (error) {
        console.error('Error loading gallery:', error);
        document.getElementById('gallery-grid').innerHTML = 
            '<div class="error">Failed to load gallery. Please try again later.</div>';
    }
}

// Render gallery items in grid
function renderGallery(items) {
    const grid = document.getElementById('gallery-grid');
    
    if (!items || items.length === 0) {
        grid.innerHTML = '<div class="no-items">No gemstones found in this category.</div>';
        return;
    }

    grid.innerHTML = items.map(item => `
        <div class="gallery-item" data-category="${item.category}">
            <div class="gallery-image-container">
                <img 
                    src="${item.image_url}" 
                    alt="${item.title}"
                    loading="lazy"
                    onclick="openLightbox('${item.image_url}', '${item.title}', '${item.description}', '${item.status}')"
                >
                <div class="gallery-overlay">
                    <h3>${item.title}</h3>
                    <p class="category">${formatCategory(item.category)}</p>
                </div>
            </div>
            <div class="gallery-info">
                <h4>${item.title}</h4>
                <p class="status-badge status-${item.status.toLowerCase()}">${item.status}</p>
                <p class="description">${truncateText(item.description, 80)}</p>
            </div>
        </div>
    `).join('');
}

// Setup category filters
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            currentFilter = filter;
            currentPage = 1;
            
            // Load filtered gallery
            loadGallery(filter, currentPage);
        });
    });
}

// Lightbox functionality
function openLightbox(imageUrl, title, description, status) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxStatus = document.getElementById('lightbox-status');
    
    lightboxImg.src = imageUrl;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = description;
    lightboxStatus.textContent = status;
    lightboxStatus.className = `lightbox-status status-${status.toLowerCase()}`;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
}

function setupLightbox() {
    // Close on X button
    document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
    
    // Close on background click
    document.getElementById('lightbox')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// Pagination rendering
function renderPagination(total, currentPage, itemsPerPage) {
    const totalPages = Math.ceil(total / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');
    
    if (!paginationContainer || totalPages <= 1) return;
    
    let paginationHTML = '<div class="pagination-controls">';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<button onclick="changePage(${currentPage - 1})" class="pagination-btn">Previous</button>`;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `<button class="pagination-btn active">${i}</button>`;
        } else if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `<button onclick="changePage(${i})" class="pagination-btn">${i}</button>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `<span class="pagination-dots">...</span>`;
        }
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<button onclick="changePage(${currentPage + 1})" class="pagination-btn">Next</button>`;
    }
    
    paginationHTML += '</div>';
    paginationContainer.innerHTML = paginationHTML;
}

function changePage(page) {
    currentPage = page;
    loadGallery(currentFilter, currentPage);
    
    // Scroll to top of gallery
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
}

// Utility functions
function formatCategory(category) {
    return category
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Request availability for specific gemstone
function requestGemstone(title) {
    // Pre-fill the contact form with gemstone title
    const modal = document.getElementById('contact-modal');
    const messageField = document.getElementById('contact-message');
    
    if (messageField) {
        messageField.value = `I am interested in: ${title}\n\nPlease provide availability and pricing details.`;
    }
    
    // Open contact modal
    modal?.classList.add('active');
}
