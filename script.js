// Global State Management
class SneakerStore {
    constructor() {
        this.products = [];
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        this.user = JSON.parse(localStorage.getItem('user')) || null;
        this.filters = {
            brands: [],
            sizes: [],
            colors: [],
            priceMax: 500
        };
        this.currentSort = 'featured';
        this.currentPage = 1;
        this.productsPerPage = 12;
        
        this.init();
    }

    init() {
        this.loadProducts();
        this.setupEventListeners();
        this.updateCartCount();
        this.updateUserState();
        this.loadSocialFeed();
        this.hideLoadingScreen();
    }

    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 1500);
    }

    loadProducts() {
        // Sample product data - in a real app, this would come from an API
        this.products = [
            {
                id: 1,
                name: "Air Max Revolution",
                brand: "nike",
                price: 189.99,
                originalPrice: 219.99,
                image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
                images: [
                    "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800"
                ],
                colors: ["black", "white"],
                sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
                rating: 4.8,
                reviews: 124,
                description: "Revolutionary comfort meets iconic style. The Air Max Revolution features advanced cushioning technology and premium materials for all-day comfort.",
                badge: "Best Seller",
                stock: {
                    7: 5, 7.5: 3, 8: 8, 8.5: 12, 9: 15, 9.5: 7, 10: 10, 10.5: 4, 11: 2
                }
            },
            {
                id: 2,
                name: "Ultra Boost Elite",
                brand: "adidas",
                price: 220.00,
                image: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800",
                images: [
                    "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800"
                ],
                colors: ["white", "gray"],
                sizes: [7, 8, 9, 10, 11, 12],
                rating: 4.6,
                reviews: 89,
                description: "Experience unparalleled energy return with Boost technology. Perfect for running and lifestyle wear.",
                badge: "New",
                stock: {
                    7: 8, 8: 12, 9: 15, 10: 20, 11: 6, 12: 3
                }
            },
            {
                id: 3,
                name: "Jordan Legacy Pro",
                brand: "jordan",
                price: 159.99,
                originalPrice: 189.99,
                image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
                images: [
                    "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800"
                ],
                colors: ["red", "black"],
                sizes: [8, 8.5, 9, 9.5, 10, 11],
                rating: 4.9,
                reviews: 156,
                description: "Classic basketball heritage meets modern performance. Iconic design with premium leather construction.",
                badge: "Sale",
                stock: {
                    8: 4, 8.5: 7, 9: 10, 9.5: 8, 10: 12, 11: 5
                }
            },
            {
                id: 4,
                name: "Puma Thunder Pro",
                brand: "puma",
                price: 139.99,
                image: "https://images.pexels.com/photos/2048548/pexels-photo-2048548.jpeg?auto=compress&cs=tinysrgb&w=800",
                images: [
                    "https://images.pexels.com/photos/2048548/pexels-photo-2048548.jpeg?auto=compress&cs=tinysrgb&w=800"
                ],
                colors: ["blue", "white"],
                sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5],
                rating: 4.4,
                reviews: 67,
                description: "Bold design meets athletic performance. Thunder Pro delivers style and comfort for the modern athlete.",
                stock: {
                    7.5: 6, 8: 9, 8.5: 11, 9: 14, 9.5: 8, 10: 7, 10.5: 3
                }
            },
            {
                id: 5,
                name: "New Balance 990v5",
                brand: "newbalance",
                price: 199.99,
                image: "https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=800",
                images: [
                    "https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=800"
                ],
                colors: ["gray", "white"],
                sizes: [7, 8, 9, 10, 11, 12],
                rating: 4.7,
                reviews: 203,
                description: "Made in USA premium craftsmanship. The 990v5 represents the pinnacle of running shoe technology and style.",
                badge: "Premium",
                stock: {
                    7: 3, 8: 8, 9: 12, 10: 15, 11: 9, 12: 4
                }
            },
            {
                id: 6,
                name: "Classic Court Pro",
                brand: "nike",
                price: 119.99,
                image: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800",
                images: [
                    "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800"
                ],
                colors: ["white", "black"],
                sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 11],
                rating: 4.3,
                reviews: 45,
                description: "Timeless court style with modern comfort. Perfect for casual wear and light athletic activities.",
                stock: {
                    7: 7, 7.5: 5, 8: 10, 8.5: 13, 9: 16, 9.5: 11, 10: 8, 11: 6
                }
            }
        ];
        
        this.renderProducts();
    }

    setupEventListeners() {
        // Header interactions
        this.setupHeaderEvents();
        
        // Filter events
        this.setupFilterEvents();
        
        // Product events
        this.setupProductEvents();
        
        // Form events
        this.setupFormEvents();
        
        // Scroll events
        this.setupScrollEvents();
        
        // Mobile events
        this.setupMobileEvents();
    }

    setupHeaderEvents() {
        // Search toggle
        const searchToggle = document.getElementById('searchToggle');
        const searchOverlay = document.getElementById('searchOverlay');
        const searchClose = document.getElementById('searchClose');
        
        searchToggle?.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            document.body.classList.add('overlay-active');
        });
        
        searchClose?.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            document.body.classList.remove('overlay-active');
        });

        // User panel toggle
        const userToggle = document.getElementById('userToggle');
        const userPanel = document.getElementById('userPanel');
        
        userToggle?.addEventListener('click', () => {
            userPanel.classList.toggle('active');
        });

        // Cart toggle
        const cartToggle = document.getElementById('cartToggle');
        const cartSidebar = document.getElementById('cartSidebar');
        const cartClose = document.getElementById('cartClose');
        
        cartToggle?.addEventListener('click', () => {
            cartSidebar.classList.add('active');
        });
        
        cartClose?.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
        });

        // Close panels when clicking outside
        document.addEventListener('click', (e) => {
            if (!userPanel?.contains(e.target) && !userToggle?.contains(e.target)) {
                userPanel?.classList.remove('active');
            }
            if (!cartSidebar?.contains(e.target) && !cartToggle?.contains(e.target)) {
                cartSidebar?.classList.remove('active');
            }
        });
    }

    setupFilterEvents() {
        // Brand filters
        document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const brand = e.target.value;
                if (e.target.checked) {
                    this.filters.brands.push(brand);
                } else {
                    this.filters.brands = this.filters.brands.filter(b => b !== brand);
                }
                this.applyFilters();
            });
        });

        // Size filters
        document.querySelectorAll('.size-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const size = parseFloat(e.target.dataset.size);
                btn.classList.toggle('active');
                
                if (btn.classList.contains('active')) {
                    this.filters.sizes.push(size);
                } else {
                    this.filters.sizes = this.filters.sizes.filter(s => s !== size);
                }
                this.applyFilters();
            });
        });

        // Color filters
        document.querySelectorAll('.color-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const color = e.target.dataset.color;
                btn.classList.toggle('active');
                
                if (btn.classList.contains('active')) {
                    this.filters.colors.push(color);
                } else {
                    this.filters.colors = this.filters.colors.filter(c => c !== color);
                }
                this.applyFilters();
            });
        });

        // Price range
        const priceRange = document.getElementById('priceRange');
        const maxPrice = document.getElementById('maxPrice');
        
        priceRange?.addEventListener('input', (e) => {
            this.filters.priceMax = parseInt(e.target.value);
            maxPrice.textContent = `$${this.filters.priceMax}`;
            this.applyFilters();
        });

        // Clear filters
        document.querySelector('.clear-filters')?.addEventListener('click', () => {
            this.clearFilters();
        });

        // Sort
        const sortSelect = document.getElementById('sortSelect');
        sortSelect?.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.applyFilters();
        });

        // Mobile filters toggle
        const filtersToggle = document.getElementById('filtersToggle');
        const filtersContent = document.getElementById('filtersContent');
        
        filtersToggle?.addEventListener('click', () => {
            filtersContent.classList.toggle('active');
        });
    }

    setupProductEvents() {
        // Load more products
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        loadMoreBtn?.addEventListener('click', () => {
            this.currentPage++;
            this.renderProducts(true);
        });
    }

    setupFormEvents() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        loginForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin(e);
        });

        // Logout
        const logoutBtn = document.getElementById('logoutBtn');
        logoutBtn?.addEventListener('click', () => {
            this.handleLogout();
        });

        // Contact form
        const contactForm = document.getElementById('contactForm');
        contactForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactForm(e);
        });

        // Newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        newsletterForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNewsletterSignup(e);
        });
    }

    setupScrollEvents() {
        // Back to top button
        const backToTop = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop?.classList.add('visible');
            } else {
                backToTop?.classList.remove('visible');
            }
        });

        backToTop?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Header scroll effect
        const header = document.querySelector('.header-modern');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header?.style.setProperty('background', 'rgba(255, 255, 255, 0.98)');
            } else {
                header?.style.setProperty('background', 'rgba(255, 255, 255, 0.95)');
            }
        });
    }

    setupMobileEvents() {
        // Touch events for mobile optimization
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        });

        document.addEventListener('touchmove', (e) => {
            const touchY = e.touches[0].clientY;
            const touchDiff = touchStartY - touchY;
            
            // Add momentum scrolling effects here if needed
        });
    }

    renderProducts(append = false) {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;

        const filteredProducts = this.getFilteredProducts();
        const sortedProducts = this.getSortedProducts(filteredProducts);
        const paginatedProducts = sortedProducts.slice(0, this.currentPage * this.productsPerPage);

        if (!append) {
            grid.innerHTML = '';
        }

        const startIndex = append ? (this.currentPage - 1) * this.productsPerPage : 0;
        const productsToRender = paginatedProducts.slice(startIndex);

        productsToRender.forEach((product, index) => {
            const productCard = this.createProductCard(product);
            productCard.style.animationDelay = `${index * 0.1}s`;
            productCard.classList.add('fade-in-up');
            grid.appendChild(productCard);
        });

        // Update load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (paginatedProducts.length >= sortedProducts.length) {
            loadMoreBtn?.style.setProperty('display', 'none');
        } else {
            loadMoreBtn?.style.setProperty('display', 'block');
        }
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => this.openProductModal(product);

        const hasDiscount = product.originalPrice && product.originalPrice > product.price;
        const discountPercent = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <div class="product-actions">
                    <button class="action-btn" onclick="event.stopPropagation(); store.toggleWishlist(${product.id})" title="Add to Wishlist">
                        <i class="fas fa-heart ${this.wishlist.includes(product.id) ? 'text-danger' : ''}"></i>
                    </button>
                    <button class="action-btn" onclick="event.stopPropagation(); store.quickAddToCart(${product.id})" title="Quick Add">
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand.toUpperCase()}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">
                    $${product.price.toFixed(2)}
                    ${hasDiscount ? `<span style="text-decoration: line-through; color: var(--text-secondary); font-size: 0.9rem; margin-left: 0.5rem;">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    ${hasDiscount ? `<span style="color: var(--accent-color); font-size: 0.8rem; margin-left: 0.5rem;">${discountPercent}% OFF</span>` : ''}
                </div>
                <div class="product-rating">
                    <div class="stars">
                        ${this.generateStars(product.rating)}
                    </div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="size-selector">
                    ${product.sizes.slice(0, 6).map(size => 
                        `<button class="size-btn ${this.getSizeStock(product, size) === 0 ? 'unavailable' : ''}" 
                                onclick="event.stopPropagation(); this.classList.toggle('selected')" 
                                ${this.getSizeStock(product, size) === 0 ? 'disabled' : ''}>
                            ${size}
                        </button>`
                    ).join('')}
                </div>
                <button class="add-to-cart" onclick="event.stopPropagation(); store.addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;

        return card;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    getSizeStock(product, size) {
        return product.stock ? product.stock[size] || 0 : 10;
    }

    getFilteredProducts() {
        return this.products.filter(product => {
            // Brand filter
            if (this.filters.brands.length > 0 && !this.filters.brands.includes(product.brand)) {
                return false;
            }
            
            // Size filter
            if (this.filters.sizes.length > 0 && !this.filters.sizes.some(size => product.sizes.includes(size))) {
                return false;
            }
            
            // Color filter
            if (this.filters.colors.length > 0 && !this.filters.colors.some(color => product.colors.includes(color))) {
                return false;
            }
            
            // Price filter
            if (product.price > this.filters.priceMax) {
                return false;
            }
            
            return true;
        });
    }

    getSortedProducts(products) {
        const sorted = [...products];
        
        switch (this.currentSort) {
            case 'price-low':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sorted.sort((a, b) => b.price - a.price);
            case 'newest':
                return sorted.sort((a, b) => b.id - a.id);
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            default:
                return sorted;
        }
    }

    applyFilters() {
        this.currentPage = 1;
        this.renderProducts();
    }

    clearFilters() {
        this.filters = {
            brands: [],
            sizes: [],
            colors: [],
            priceMax: 500
        };
        
        // Reset UI
        document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('.size-option.active').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.color-option.active').forEach(btn => btn.classList.remove('active'));
        document.getElementById('priceRange').value = 500;
        document.getElementById('maxPrice').textContent = '$500';
        
        this.applyFilters();
    }

    openProductModal(product) {
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        const modalBody = document.getElementById('productModalBody');
        
        modalBody.innerHTML = this.createProductModalContent(product);
        modal.show();
        
        // Setup modal events
        this.setupProductModalEvents(product);
    }

    createProductModalContent(product) {
        const hasDiscount = product.originalPrice && product.originalPrice > product.price;
        const discountPercent = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

        return `
            <div class="product-modal-content">
                <div class="product-gallery">
                    <div class="main-image">
                        <img src="${product.images[0]}" alt="${product.name}" id="mainProductImage">
                    </div>
                    <div class="thumbnail-grid">
                        ${product.images.map((img, index) => `
                            <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="store.changeMainImage('${img}', this)">
                                <img src="${img}" alt="${product.name}">
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="product-details">
                    <div class="brand">${product.brand.toUpperCase()}</div>
                    <h1>${product.name}</h1>
                    <div class="price">
                        $${product.price.toFixed(2)}
                        ${hasDiscount ? `<span style="text-decoration: line-through; color: var(--text-secondary); font-size: 1rem; margin-left: 0.5rem;">$${product.originalPrice.toFixed(2)}</span>` : ''}
                        ${hasDiscount ? `<span style="color: var(--accent-color); font-size: 0.9rem; margin-left: 0.5rem;">${discountPercent}% OFF</span>` : ''}
                    </div>
                    <div class="product-rating">
                        <div class="stars">${this.generateStars(product.rating)}</div>
                        <span class="rating-count">${product.rating} (${product.reviews} reviews)</span>
                    </div>
                    <div class="product-description">
                        <p>${product.description}</p>
                    </div>
                    <div class="size-selection">
                        <h4>Select Size</h4>
                        <div class="modal-size-grid">
                            ${product.sizes.map(size => {
                                const stock = this.getSizeStock(product, size);
                                return `
                                    <button class="size-btn ${stock === 0 ? 'unavailable' : ''}" 
                                            data-size="${size}" 
                                            ${stock === 0 ? 'disabled' : ''}
                                            onclick="store.selectSize(this, ${size})">
                                        ${size}
                                    </button>
                                `;
                            }).join('')}
                        </div>
                        <div class="stock-info" id="stockInfo">
                            <span class="stock-available">✓ In Stock</span>
                        </div>
                    </div>
                    <div class="product-actions-modal">
                        <button class="btn-add-cart" onclick="store.addToCartFromModal(${product.id})">
                            Add to Cart
                        </button>
                        <button class="btn-wishlist" onclick="store.toggleWishlist(${product.id})">
                            <i class="fas fa-heart ${this.wishlist.includes(product.id) ? 'text-danger' : ''}"></i>
                        </button>
                    </div>
                    <div class="reviews-section">
                        <div class="reviews-header">
                            <h4>Customer Reviews</h4>
                            <button class="btn-secondary" onclick="store.showAllReviews(${product.id})">View All</button>
                        </div>
                        ${this.generateReviews(product)}
                    </div>
                </div>
            </div>
        `;
    }

    generateReviews(product) {
        const sampleReviews = [
            {
                name: "Alex M.",
                rating: 5,
                date: "2 days ago",
                text: "Amazing quality and comfort! Exactly what I was looking for."
            },
            {
                name: "Sarah K.",
                rating: 4,
                date: "1 week ago", 
                text: "Great sneakers, very stylish. Runs slightly small, order half size up."
            }
        ];

        return sampleReviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <div>
                        <div class="reviewer-name">${review.name}</div>
                        <div class="stars">${this.generateStars(review.rating)}</div>
                    </div>
                    <div class="review-date">${review.date}</div>
                </div>
                <div class="review-text">${review.text}</div>
            </div>
        `).join('');
    }

    setupProductModalEvents(product) {
        // Size selection in modal
        document.querySelectorAll('.modal-size-grid .size-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.modal-size-grid .size-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                
                const size = parseFloat(btn.dataset.size);
                const stock = this.getSizeStock(product, size);
                const stockInfo = document.getElementById('stockInfo');
                
                if (stock > 10) {
                    stockInfo.innerHTML = '<span class="stock-available">✓ In Stock</span>';
                } else if (stock > 0) {
                    stockInfo.innerHTML = `<span class="stock-low">⚠ Only ${stock} left</span>`;
                } else {
                    stockInfo.innerHTML = '<span class="stock-out">✗ Out of Stock</span>';
                }
            });
        });
    }

    changeMainImage(src, thumbnail) {
        document.getElementById('mainProductImage').src = src;
        document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        thumbnail.classList.add('active');
    }

    selectSize(btn, size) {
        document.querySelectorAll('.modal-size-grid .size-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
    }

    addToCart(productId, size = null) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        // If no size specified, try to get from selected size
        if (!size) {
            const selectedSize = document.querySelector('.size-btn.selected');
            size = selectedSize ? parseFloat(selectedSize.dataset.size) : product.sizes[0];
        }

        const cartItem = {
            id: productId,
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.image,
            size: size,
            quantity: 1
        };

        // Check if item already exists in cart
        const existingItem = this.cart.find(item => item.id === productId && item.size === size);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cart.push(cartItem);
        }

        this.saveCart();
        this.updateCartCount();
        this.showNotification(`${product.name} added to cart!`);
    }

    addToCartFromModal(productId) {
        const selectedSize = document.querySelector('.modal-size-grid .size-btn.selected');
        if (!selectedSize) {
            this.showNotification('Please select a size', 'error');
            return;
        }
        
        const size = parseFloat(selectedSize.dataset.size);
        this.addToCart(productId, size);
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
        modal.hide();
    }

    quickAddToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        const defaultSize = product.sizes[0]; // Use first available size
        this.addToCart(productId, defaultSize);
    }

    toggleWishlist(productId) {
        if (this.wishlist.includes(productId)) {
            this.wishlist = this.wishlist.filter(id => id !== productId);
            this.showNotification('Removed from wishlist');
        } else {
            this.wishlist.push(productId);
            this.showNotification('Added to wishlist!');
        }
        
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
        
        // Update heart icons
        document.querySelectorAll(`[onclick*="toggleWishlist(${productId})"] i`).forEach(icon => {
            icon.classList.toggle('text-danger', this.wishlist.includes(productId));
        });
    }

    updateCartCount() {
        const count = this.cart.reduce((total, item) => total + item.quantity, 0);
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    handleLogin(e) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simple validation (in real app, this would be server-side)
        if (email && password) {
            const user = {
                email: email,
                name: email.split('@')[0],
                loginTime: new Date().toISOString()
            };
            
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            this.updateUserState();
            this.showNotification(`Welcome back, ${user.name}!`);
            
            // Close user panel
            document.getElementById('userPanel').classList.remove('active');
        } else {
            this.showNotification('Please fill in all fields', 'error');
        }
    }

    handleLogout() {
        this.user = null;
        localStorage.removeItem('user');
        this.updateUserState();
        this.showNotification('Logged out successfully');
        
        // Close user panel
        document.getElementById('userPanel').classList.remove('active');
    }

    updateUserState() {
        const loginSection = document.getElementById('loginSection');
        const userProfile = document.getElementById('userProfile');
        const welcomeMessage = document.getElementById('welcomeMessage');

        if (this.user) {
            loginSection.style.display = 'none';
            userProfile.style.display = 'block';
            welcomeMessage.textContent = `Welcome, ${this.user.name}!`;
        } else {
            loginSection.style.display = 'block';
            userProfile.style.display = 'none';
        }
    }

    handleContactForm(e) {
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;
        const errors = document.getElementById('contactErrors');

        let errorMessages = [];

        if (!name.trim()) errorMessages.push('Name is required');
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errorMessages.push('Valid email is required');
        if (!subject.trim()) errorMessages.push('Subject is required');
        if (!message.trim()) errorMessages.push('Message is required');

        if (errorMessages.length > 0) {
            errors.innerHTML = errorMessages.join('<br>');
            return;
        }

        errors.innerHTML = '';
        this.showNotification('Message sent successfully! We\'ll get back to you soon.');
        e.target.reset();
    }

    handleNewsletterSignup(e) {
        const email = e.target.querySelector('input[type="email"]').value;
        
        if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            this.showNotification('Successfully subscribed to newsletter!');
            e.target.reset();
        } else {
            this.showNotification('Please enter a valid email address', 'error');
        }
    }

    loadSocialFeed() {
        const socialGrid = document.getElementById('socialGrid');
        if (!socialGrid) return;

        const socialPosts = [
            {
                image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
                username: "@sneaker_head",
                caption: "Fresh kicks for the weekend! 🔥"
            },
            {
                image: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=400",
                username: "@style_maven",
                caption: "Perfect for my morning runs ✨"
            },
            {
                image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400",
                username: "@urban_explorer",
                caption: "Street style on point 👟"
            },
            {
                image: "https://images.pexels.com/photos/2048548/pexels-photo-2048548.jpeg?auto=compress&cs=tinysrgb&w=400",
                username: "@fitness_first",
                caption: "Game day ready! 🏀"
            }
        ];

        socialGrid.innerHTML = socialPosts.map(post => `
            <div class="social-post">
                <img src="${post.image}" alt="Social post" loading="lazy">
                <div class="social-overlay">
                    <div class="social-info">
                        <div class="social-username">${post.username}</div>
                        <div class="social-caption">${post.caption}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#dc3545' : '#28a745'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-medium);
            z-index: 2000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    showAllReviews(productId) {
        this.showNotification('Reviews feature coming soon!');
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header-modern').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize Store
let store;

document.addEventListener('DOMContentLoaded', function() {
    store = new SneakerStore();
    
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header-modern').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.section-header, .product-card, .brand-item, .feature-item').forEach(el => {
        observer.observe(el);
    });

    // Performance optimization: Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        // ESC key closes overlays
        if (e.key === 'Escape') {
            document.getElementById('searchOverlay')?.classList.remove('active');
            document.getElementById('userPanel')?.classList.remove('active');
            document.getElementById('cartSidebar')?.classList.remove('active');
            document.body.classList.remove('overlay-active');
        }
        
        // Ctrl/Cmd + K opens search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('searchOverlay')?.classList.add('active');
            document.body.classList.add('overlay-active');
            document.getElementById('searchInput')?.focus();
        }
    });

    // Add service worker for offline functionality (if needed)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // Service worker registration would go here
        });
    }

    // Add error handling for images
    document.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG') {
            e.target.src = 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400';
        }
    }, true);
});

// Export for global access
window.store = store;