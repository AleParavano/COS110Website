// COS110 OOP STUDY WEBSITE - MAIN JAVASCRIPT WITH DARK THEME

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark theme from localStorage
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    if (isDarkTheme) {
        document.body.classList.add('dark-theme');
        updateThemeButton(true);
    }

    // Dark Theme Toggle
    const themeToggle = document.querySelector('.navbar-menu .menu-toggle:first-child');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('darkTheme', isDark);
            updateThemeButton(isDark);
        });
    }

    function updateThemeButton(isDark) {
        const themeToggle = document.querySelector('.navbar-menu .menu-toggle:first-child');
        if (themeToggle) {
            themeToggle.textContent = isDark ? '☀️' : '🌙';
        }
    }

    // Code Tab Switching
    document.querySelectorAll('.code-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const codeExample = this.closest('.code-example');
            if (!codeExample) return;

            codeExample.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            codeExample.querySelectorAll('[data-tab-content]').forEach(content => {
                content.style.display = 'none';
            });

            const tabName = this.getAttribute('data-tab');
            if (tabName) {
                const content = codeExample.querySelector(`[data-tab-content="${tabName}"]`);
                if (content) content.style.display = 'block';
            }
        });
    });

    // Collapsible Solutions
    document.querySelectorAll('.collapsible').forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (content && content.classList.contains('collapsible-content')) {
                content.classList.toggle('show');
                this.textContent = content.classList.contains('show') ? 
                    '▼ Hide Solution' : '▼ Show Solution';
            }
        });
    });

    // Sidebar Active State
    const currentPage = window.location.pathname;
    document.querySelectorAll('.sidebar-item').forEach(item => {
        if (item.href && currentPage.includes(item.href)) {
            item.classList.add('active');
        }
    });

    // Search functionality
    const searchInput = document.querySelector('.navbar-search input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            const query = e.target.value.toLowerCase();
            if (query.length < 2) {
                document.querySelectorAll('.sidebar-item').forEach(item => {
                    item.style.display = 'block';
                });
                return;
            }
            
            document.querySelectorAll('.sidebar-item').forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? 'block' : 'none';
            });
        }, 300));
    }
});

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Export for use
window.COS110 = {
    scrollToSection: scrollToSection,
    debounce: debounce
};