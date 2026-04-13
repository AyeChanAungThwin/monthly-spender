document.addEventListener('DOMContentLoaded', function() {
    // Language configuration
    let currentLanguage = localStorage.getItem('language') || 'en';

    // Available languages mapping - easily extensible for future languages
    const languages = {
        'en': English,
        'my': Myanmar,
        'zh': Chinese,
        'th': Thailand,
        'ja': Japan,
        'vi': Vietnam,
        'km': Cambodia,
        'fil': Philippines,
        'lo': Laos,
        'bn': Bangladesh,
        'ko': Korea
    };

    // Apply language on load
    applyLanguage(currentLanguage);

    // Currency configuration based on country code
    const currencyConfig = {
        'MM': { symbol: 'Ks', code: 'MMK', name: 'Kyats', locale: 'en-MM' },
        'TH': { symbol: '฿', code: 'THB', name: 'Baht', locale: 'th-TH' },
        'US': { symbol: '$', code: 'USD', name: 'Dollar', locale: 'en-US' },
        'GB': { symbol: '£', code: 'GBP', name: 'Pound', locale: 'en-GB' },
        'EU': { symbol: '€', code: 'EUR', name: 'Euro', locale: 'de-DE' },
        'JP': { symbol: '¥', code: 'JPY', name: 'Yen', locale: 'ja-JP' },
        'CN': { symbol: '¥', code: 'CNY', name: 'Yuan', locale: 'zh-CN' },
        'IN': { symbol: '₹', code: 'INR', name: 'Rupee', locale: 'en-IN' },
        'SG': { symbol: 'S$', code: 'SGD', name: 'Dollar', locale: 'en-SG' },
        'MY': { symbol: 'RM', code: 'MYR', name: 'Ringgit', locale: 'en-MY' },
        'ID': { symbol: 'Rp', code: 'IDR', name: 'Rupiah', locale: 'id-ID' },
        'PH': { symbol: '₱', code: 'PHP', name: 'Peso', locale: 'en-PH' },
        'VN': { symbol: '₫', code: 'VND', name: 'Dong', locale: 'vi-VN' },
        'KR': { symbol: '₩', code: 'KRW', name: 'Won', locale: 'ko-KR' },
        'AU': { symbol: 'A$', code: 'AUD', name: 'Dollar', locale: 'en-AU' },
        'CA': { symbol: 'C$', code: 'CAD', name: 'Dollar', locale: 'en-CA' },
        'CH': { symbol: 'Fr', code: 'CHF', name: 'Franc', locale: 'de-CH' },
        'NZ': { symbol: 'NZ$', code: 'NZD', name: 'Dollar', locale: 'en-NZ' },
        'ZA': { symbol: 'R', code: 'ZAR', name: 'Rand', locale: 'en-ZA' },
        'BR': { symbol: 'R$', code: 'BRL', name: 'Real', locale: 'pt-BR' },
        'MX': { symbol: '$', code: 'MXN', name: 'Peso', locale: 'es-MX' },
        'RU': { symbol: '₽', code: 'RUB', name: 'Ruble', locale: 'ru-RU' },
        'AE': { symbol: 'د.إ', code: 'AED', name: 'Dirham', locale: 'ar-AE' },
        'SA': { symbol: '﷼', code: 'SAR', name: 'Riyal', locale: 'ar-SA' }
    };

    // Default currency (USD)
    let currentCurrency = currencyConfig['US'];

    // Load saved currency from localStorage on init
    const savedCurrency = JSON.parse(localStorage.getItem('currency'));
    if (savedCurrency) {
        currentCurrency = savedCurrency;
    }

    // Get nested value from language object by dot notation key
    function getNestedValue(obj, key) {
        return key.split('.').reduce((prev, curr) => prev ? prev[curr] : null, obj);
    }

    // Get current translations using the languages object
    function getTranslations() {
        return languages[currentLanguage] || English;
    }

    // Apply language translations to all elements with data-i18n attribute
    function applyLanguage(lang) {
        currentLanguage = lang;
        const translations = getTranslations();

        // Translate all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            const key = el.getAttribute('data-i18n');
            const value = getNestedValue(translations, key);
            if (value) {
                el.textContent = value;
            }
        });

        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
            const key = el.getAttribute('data-i18n-placeholder');
            const value = getNestedValue(translations, key);
            if (value) {
                el.placeholder = value;
            }
        });

        // Translate title attributes
        document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
            const key = el.getAttribute('data-i18n-title');
            const value = getNestedValue(translations, key);
            if (value) {
                el.title = value;
            }
        });

        // Update html lang attribute
        document.documentElement.lang = lang;
    }

    // Initialize title bar
    updateTitleBar();
    setInterval(updateTitleBarTimeOnly, 1000);

    // Load location only once on page load
    loadLocationOnce();

    const menuItems = document.querySelectorAll('.menu-item');
    const contentSections = document.querySelectorAll('.content-section');

    menuItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const menuName = this.getAttribute('data-menu');

            // Remove active class from all menu items
            menuItems.forEach(function(mi) {
                mi.classList.remove('active');
            });

            // Add active class to clicked menu item
            this.classList.add('active');

            // Hide all content sections
            contentSections.forEach(function(section) {
                section.classList.remove('active');
            });

            // Show selected content section
            const activeSection = document.getElementById(menuName);
            if (activeSection) {
                activeSection.classList.add('active');

                // Refresh Income/Expense summary when navigating to that page
                if (menuName === 'income-expense' && typeof renderIncomeExpenseSummary === 'function') {
                    renderIncomeExpenseSummary();
                }

                // Refresh wallets list when navigating to wallets page
                if (menuName === 'wallets' && typeof renderWallets === 'function') {
                    renderWallets();
                }

                // Refresh categories list when navigating to categories page
                if (menuName === 'categories' && typeof renderCategories === 'function') {
                    renderCategories();
                }
            }
        });
    });

    // Format currency based on current location
    function formatCurrency(amount) {
        const amountStr = parseFloat(amount).toFixed(2);
        // For Myanmar Kyats, use "Ks" prefix
        if (currentCurrency.code === 'MMK') {
            return 'Ks ' + amountStr;
        }
        // For other currencies, use symbol directly
        return currentCurrency.symbol + amountStr;
    }

    // Precise addition to avoid floating-point errors
    // Converts to integer cents, performs operation, converts back
    function preciseAdd(a, b) {
        const aCents = Math.round(parseFloat(a) * 100);
        const bCents = Math.round(parseFloat(b) * 100);
        return (aCents + bCents) / 100;
    }

    // Precise subtraction to avoid floating-point errors
    function preciseSubtract(a, b) {
        const aCents = Math.round(parseFloat(a) * 100);
        const bCents = Math.round(parseFloat(b) * 100);
        return (aCents - bCents) / 100;
    }

    // Sanitize user-entered amount to avoid floating-point errors
    // Converts to integer cents, then back to dollars
    function sanitizeAmount(amountStr) {
        const num = parseFloat(amountStr);
        if (isNaN(num)) return 0;
        // Convert to cents (integer), then back to avoid floating-point issues
        const cents = Math.round(num * 100);
        return cents / 100;
    }

    // Get country code from coordinates using reverse geocoding
    function getCountryFromCoords(lat, lon, callback) {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
            .then(response => response.json())
            .then(data => {
                const countryCode = data.address?.country_code?.toUpperCase();
                callback(countryCode);
            })
            .catch(error => {
                console.error('Error getting country:', error);
                callback(null);
            });
    }

    // Update currency based on country code
    function updateCurrency(countryCode) {
        if (countryCode && currencyConfig[countryCode]) {
            currentCurrency = currencyConfig[countryCode];
            localStorage.setItem('currency', JSON.stringify(currentCurrency));
        }
        // Refresh UI with new currency
        renderWallets();
        renderTransactions();
        renderIncomeExpenseSummary();
    }

    // Render all currency displays with current currency
    function updateAllCurrencyDisplays() {
        renderWallets();
        renderTransactions();
        renderIncomeExpenseSummary();
    }

    function updateTitleBar() {
        const now = new Date();

        // Update date
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', dateOptions);

        // Update time (HH:mm:ss format)
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('currentTime').textContent = `${hours}:${minutes}:${seconds}`;

        // Update timezone
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        document.getElementById('timezone').textContent = timezone;
    }

    // Update only time in title bar (for setInterval)
    function updateTitleBarTimeOnly() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('currentTime').textContent = `${hours}:${minutes}:${seconds}`;
    }

    // Load location only once
    function loadLocationOnce() {
        const locationEl = document.getElementById('location');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const lat = position.coords.latitude.toFixed(2);
                    const lon = position.coords.longitude.toFixed(2);
                    locationEl.textContent = `${lat}°N, ${lon}°E`;

                    // Get country and update currency
                    getCountryFromCoords(lat, lon, function(countryCode) {
                        if (countryCode) {
                            updateCurrency(countryCode);
                            locationEl.textContent += ` (${countryCode})`;
                        }
                    });
                },
                function(error) {
                    locationEl.textContent = 'Location unavailable';
                    // Currency already loaded from localStorage on init
                }
            );
        } else {
            locationEl.textContent = 'Geolocation not supported';
            // Currency already loaded from localStorage on init
        }
    }

    // Language selector functionality
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
        languageSelector.value = currentLanguage;
        languageSelector.addEventListener('change', function() {
            currentLanguage = this.value;
            localStorage.setItem('language', currentLanguage);
            applyLanguage(currentLanguage);
            // Re-render dynamic content with new language
            renderTransactions();
            renderWallets();
            renderCategories();
        });
    }

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const lightIcon = themeToggle.querySelector('.light-icon');
    const darkIcon = themeToggle.querySelector('.dark-icon');

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'block';
    } else {
        lightIcon.style.display = 'block';
        darkIcon.style.display = 'none';
    }

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');

        // Toggle icon visibility
        if (document.body.classList.contains('dark-mode')) {
            lightIcon.style.display = 'none';
            darkIcon.style.display = 'block';
            localStorage.setItem('theme', 'dark');
        } else {
            lightIcon.style.display = 'block';
            darkIcon.style.display = 'none';
            localStorage.setItem('theme', 'light');
        }

        // Re-render charts with updated theme
        if (typeof renderIncomeExpenseSummary === 'function') {
            renderIncomeExpenseSummary();
        }
    });

    // Wallets functionality
    const addWalletBtn = document.getElementById('addWalletBtn');
    const walletModal = document.getElementById('walletModal');
    const modalClose = document.getElementById('modalClose');
    const btnCancel = document.getElementById('btnCancel');
    const addWalletForm = document.getElementById('addWalletForm');
    const iconSelection = document.getElementById('iconSelection');
    const selectedIconInput = document.getElementById('selectedIcon');
    const walletsList = document.getElementById('walletsList');

    // Load wallets from localStorage
    let wallets = JSON.parse(localStorage.getItem('wallets') || '[]');

    // Auto-populate default wallets if none exist
    function populateDefaultWallets() {
        if (wallets.length === 0) {
            wallets = [
                { name: 'Banking', icon: 'images/wallets/banking.png', amount: '0.00' },
                { name: 'Cash', icon: 'images/wallets/money.png', amount: '0.00' },
                { name: 'Digital Cash', icon: 'images/wallets/wallet.png', amount: '0.00' },
                { name: 'Coins', icon: 'images/wallets/coins.png', amount: '0.00' }
            ];
            localStorage.setItem('wallets', JSON.stringify(wallets));
        }
    }

    // Render wallets
    function renderWallets() {
        walletsList.innerHTML = '';
        const translations = getTranslations();
        if (wallets.length === 0) {
            const noWalletsMsg = getNestedValue(translations, 'noData.noWallets') || 'No wallets added yet. Click the + button to add one.';
            walletsList.innerHTML = '<p style="color: #888; text-align: center; grid-column: 1/-1;">' + noWalletsMsg + '</p>';
            return;
        }

        // Get transactions to check which wallets are in use
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');

        wallets.forEach(function(wallet, index) {
            const usedInTransactions = transactions.some(t => t.walletName === wallet.name);
            const walletItem = document.createElement('div');
            walletItem.className = 'wallet-item';

            if (usedInTransactions) {
                walletItem.classList.add('wallet-item-used');
            }

            walletItem.innerHTML = `
                <button class="wallet-edit-btn" data-index="${index}">
                    <img src="images/edit.png" alt="Edit">
                </button>
                <button class="wallet-delete-btn" data-index="${index}">
                    <img src="images/trash.png" alt="Delete">
                </button>
                <img src="${wallet.icon}" alt="${wallet.name}">
                <div class="wallet-item-info">
                    <div class="wallet-item-name">${wallet.name}</div>
                    <div class="wallet-item-amount">${formatCurrency(wallet.amount)}</div>
                </div>
            `;
            walletsList.appendChild(walletItem);
        });

        // Add delete functionality
        document.querySelectorAll('.wallet-delete-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const walletName = wallets[index].name;
                const translations = getTranslations();

                // Check if wallet is used in any transaction
                const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
                const usedInTransactions = transactions.some(t => t.walletName === walletName);

                if (usedInTransactions) {
                    const cannotDeleteMsg = getNestedValue(translations, 'validation.cannotDeleteWallet').replace('{0}', walletName) || `Cannot delete wallet "${walletName}" because it is used in one or more transactions. Please delete or update those transactions first.`;
                    alert(cannotDeleteMsg);
                    return;
                }

                const deleteConfirmMsg = getNestedValue(translations, 'validation.deleteWalletConfirm').replace('{0}', walletName) || `Are you sure you want to delete "${walletName}"? This action cannot be undone.`;
                const confirmed = confirm(deleteConfirmMsg);
                if (!confirmed) {
                    return;
                }

                wallets.splice(index, 1);
                localStorage.setItem('wallets', JSON.stringify(wallets));
                renderWallets();
            });
        });

        // Add edit functionality
        document.querySelectorAll('.wallet-edit-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const walletName = wallets[index].name;

                // Check if wallet is used in any transaction
                const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
                const usedInTransactions = transactions.some(t => t.walletName === walletName);

                openEditModal(index, usedInTransactions);
            });
        });
    }

    // Edit wallet modal
    let editingIndex = null;

    function openEditModal(index, usedInTransactions = false) {
        editingIndex = index;
        const wallet = wallets[index];

        document.getElementById('walletName').value = wallet.name;
        document.getElementById('walletAmount').value = wallet.amount;
        const translations = getTranslations();
        document.querySelector('#walletModal .modal-content h3').textContent = translations.modals.editWallet;

        // Disable name and icon selection if wallet is used in transactions
        document.getElementById('walletName').disabled = usedInTransactions;
        document.getElementById('walletName').style.cursor = usedInTransactions ? 'not-allowed' : 'text';
        document.getElementById('walletName').style.backgroundColor = usedInTransactions ? '#f5f5f5' : '';

        // Disable icon selection if wallet is used in transactions
        const iconOptions = iconSelection.querySelectorAll('.icon-option');
        iconOptions.forEach(opt => {
            opt.style.pointerEvents = usedInTransactions ? 'none' : 'auto';
            opt.style.opacity = usedInTransactions ? '0.5' : '1';
        });

        loadWalletIcons(wallet.icon);
        walletModal.classList.add('active');
    }

    // Load icons from wallets/ folder
    function loadWalletIcons(selectedIconPath = null) {
        // Clear existing icons
        iconSelection.innerHTML = '';

        // Available wallet icons with display names
        const iconFiles = [
            { file: 'banking.png', name: 'Banking' },
            { file: 'wallet.png', name: 'Digital Cash' },
            { file: 'money.png', name: 'Cash' },
            { file: 'coins.png', name: 'Coins' }
        ];

        if (iconFiles.length === 0) {
            iconSelection.innerHTML = '<p style="color: #888; grid-column: 1/-1; text-align: center;">No icons found in images/wallets/</p>';
            return;
        }

        iconFiles.forEach(function(icon) {
            const iconPath = 'images/wallets/' + icon.file;
            const iconOption = document.createElement('div');
            iconOption.className = 'icon-option';
            iconOption.setAttribute('data-icon', iconPath);
            iconOption.setAttribute('title', icon.name);
            iconOption.innerHTML = `<img src="${iconPath}" alt="${icon.name}">`;

            // Select the current icon if editing
            if (selectedIconPath && iconPath === selectedIconPath) {
                iconOption.classList.add('selected');
                selectedIconInput.value = iconPath;
            }

            iconOption.addEventListener('click', function() {
                iconSelection.querySelectorAll('.icon-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                selectedIconInput.value = iconPath;
            });
            iconSelection.appendChild(iconOption);
        });
    }

    // Open modal
    addWalletBtn.addEventListener('click', function() {
        // Reset form state before opening
        addWalletForm.reset();
        selectedIconInput.value = '';
        document.querySelectorAll('#iconSelection .icon-option').forEach(opt => opt.classList.remove('selected'));
        const translations = getTranslations();
        document.querySelector('#walletModal .modal-content h3').textContent = translations.modals.addWallet;
        document.getElementById('walletName').disabled = false;
        document.getElementById('walletName').style.cursor = 'text';
        document.getElementById('walletName').style.backgroundColor = '';
        const iconOptions = iconSelection.querySelectorAll('.icon-option');
        iconOptions.forEach(opt => {
            opt.style.pointerEvents = 'auto';
            opt.style.opacity = '1';
        });
        editingIndex = null;
        walletModal.classList.add('active');
        loadWalletIcons();
    });

    // Close modal
    function closeModal() {
        walletModal.classList.remove('active');
        addWalletForm.reset();
        selectedIconInput.value = '';
        document.querySelectorAll('#iconSelection .icon-option').forEach(opt => opt.classList.remove('selected'));
        const translations = getTranslations();
        document.querySelector('#walletModal .modal-content h3').textContent = translations.modals.addWallet;
        editingIndex = null;
    }

    modalClose.addEventListener('click', closeModal);
    btnCancel.addEventListener('click', closeModal);

    // Close modal when clicking outside
    walletModal.addEventListener('click', function(e) {
        if (e.target === walletModal) {
            closeModal();
        }
    });

    // Prevent floating-point errors on input - allow free input, just prevent invalid chars
    const walletAmountInput = document.getElementById('walletAmount');
    walletAmountInput.addEventListener('input', function() {
        let value = this.value;
        // Remove any non-numeric characters except decimal point
        value = value.replace(/[^0-9.]/g, '');
        // Allow only one decimal point
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }
        // Limit to 2 decimal places (but don't force formatting)
        if (parts.length === 2 && parts[1].length > 2) {
            value = parts[0] + '.' + parts[1].substring(0, 2);
        }
        this.value = value;
    });

    // Form submission
    addWalletForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nameInput = document.getElementById('walletName');
        const icon = selectedIconInput.value;
        const amount = document.getElementById('walletAmount').value;
        const name = nameInput.value.trim();

        // Validation
        if (!name) {
            const enterWalletNameMsg = getNestedValue(translations, 'validation.enterWalletName') || 'Please enter a wallet name';
            alert(enterWalletNameMsg);
            return;
        }
        if (!icon) {
            const selectIconMsg = getNestedValue(translations, 'validation.selectIcon') || 'Please select an icon';
            alert(selectIconMsg);
            return;
        }
        if (!amount || parseFloat(amount) < 0) {
            const enterValidAmountMsg = getNestedValue(translations, 'validation.enterValidAmount') || 'Please enter a valid amount';
            alert(enterValidAmountMsg);
            return;
        }

        const sanitizedAmount = sanitizeAmount(amount);

        if (editingIndex !== null) {
            // Check if wallet is used in transactions (name field is disabled)
            const walletName = wallets[editingIndex].name;
            const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
            const usedInTransactions = transactions.some(t => t.walletName === walletName);

            if (usedInTransactions) {
                // Only update amount when wallet is used in transactions
                wallets[editingIndex].amount = sanitizedAmount.toFixed(2);
            } else {
                const name = nameInput.value.trim();
                // Check if another wallet already has this name (excluding current wallet)
                const duplicateName = wallets.some((wallet, idx) =>
                    idx !== editingIndex && wallet.name.toLowerCase() === name.toLowerCase()
                );
                if (duplicateName) {
                    const duplicateWalletMsg = getNestedValue(translations, 'validation.duplicateWalletName') || 'A wallet with this name already exists. Please use a different name.';
                    alert(duplicateWalletMsg);
                    return;
                }
                // Update all fields for wallets not used in transactions
                wallets[editingIndex] = {
                    name: name,
                    icon: icon,
                    amount: sanitizedAmount.toFixed(2)
                };
            }
        } else {
            // Check if wallet name already exists
            const duplicateName = wallets.some(wallet => wallet.name.toLowerCase() === name.toLowerCase());
            if (duplicateName) {
                const duplicateWalletMsg = getNestedValue(translations, 'validation.duplicateWalletName') || 'A wallet with this name already exists. Please use a different name.';
                alert(duplicateWalletMsg);
                return;
            }
            // Add new wallet
            wallets.push({
                name: name,
                icon: icon,
                amount: sanitizedAmount.toFixed(2)
            });
        }

        // Save to localStorage
        localStorage.setItem('wallets', JSON.stringify(wallets));

        // Re-render wallets
        renderWallets();

        // Close modal
        closeModal();
    });

    // Initial render
    populateDefaultWallets();
    renderWallets();

    // Categories functionality
    const addCategoryBtn = document.getElementById('addCategoryBtn');
    const categoryModal = document.getElementById('categoryModal');
    const categoryModalClose = document.getElementById('categoryModalClose');
    const categoryBtnCancel = document.getElementById('categoryBtnCancel');
    const addCategoryForm = document.getElementById('addCategoryForm');
    const categoryIconSelection = document.getElementById('categoryIconSelection');
    const selectedCategoryIconInput = document.getElementById('selectedCategoryIcon');
    const categoriesList = document.getElementById('categoriesList');

    // Load categories from localStorage
    let categories = JSON.parse(localStorage.getItem('categories') || '[]');

    // Auto-populate default categories if none exist
    function populateDefaultCategories() {
        if (categories.length === 0) {
            categories = [
                { name: 'Eating out', icon: 'images/categories/food.png' },
                { name: 'Taxi', icon: 'images/categories/transportation.png' },
                { name: 'Shopping', icon: 'images/categories/shopping.png' },
                { name: 'Apartment Rental', icon: 'images/categories/rent.png' },
                { name: 'Electricity Bill', icon: 'images/categories/bill.png' },
                { name: 'Fuel', icon: 'images/categories/fuel.png' },
                { name: 'Gift', icon: 'images/categories/gift.png' },
                { name: 'Kids', icon: 'images/categories/kids.png' },
                { name: 'Medical', icon: 'images/categories/health.png' },
                { name: 'Trip', icon: 'images/categories/travel.png' },
                { name: 'Drinks', icon: 'images/categories/beverage.png' }
            ];
            localStorage.setItem('categories', JSON.stringify(categories));
        }
    }

    // Render categories
    function renderCategories() {
        categoriesList.innerHTML = '';
        const translations = getTranslations();
        if (categories.length === 0) {
            const noCategoriesMsg = getNestedValue(translations, 'noData.noCategories') || 'No categories added yet. Click the + button to add one.';
            categoriesList.innerHTML = '<p style="color: #888; text-align: center; grid-column: 1/-1;">' + noCategoriesMsg + '</p>';
            return;
        }

        // Get transactions to check which categories are in use
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');

        categories.forEach(function(category, index) {
            const usedInTransactions = transactions.some(t => t.description === category.name);
            const categoryItem = document.createElement('div');
            categoryItem.className = 'category-item';

            if (usedInTransactions) {
                categoryItem.classList.add('category-item-used');
            }

            categoryItem.innerHTML = `
                <button class="category-edit-btn" data-index="${index}">
                    <img src="images/edit.png" alt="Edit">
                </button>
                <button class="category-delete-btn" data-index="${index}">
                    <img src="images/trash.png" alt="Delete">
                </button>
                <img src="${category.icon}" alt="${category.name}">
                <div class="category-item-info">
                    <div class="category-item-name">${category.name}</div>
                </div>
            `;
            categoriesList.appendChild(categoryItem);
        });

        // Add delete functionality
        document.querySelectorAll('.category-delete-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const categoryName = categories[index].name;
                const translations = getTranslations();

                // Check if category is used in any transaction (stored in description field)
                const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
                const usedInTransactions = transactions.some(t => t.description === categoryName);

                if (usedInTransactions) {
                    const cannotDeleteMsg = getNestedValue(translations, 'validation.cannotDeleteCategory').replace('{0}', categoryName) || `Cannot delete category "${categoryName}" because it is used in one or more transactions. Please delete or update those transactions first.`;
                    alert(cannotDeleteMsg);
                    return;
                }

                const deleteConfirmMsg = getNestedValue(translations, 'validation.deleteCategoryConfirm').replace('{0}', categoryName) || `Are you sure you want to delete "${categoryName}"? This action cannot be undone.`;
                const confirmed = confirm(deleteConfirmMsg);
                if (!confirmed) {
                    return;
                }

                categories.splice(index, 1);
                localStorage.setItem('categories', JSON.stringify(categories));
                renderCategories();
            });
        });

        // Add edit functionality
        document.querySelectorAll('.category-edit-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const categoryName = categories[index].name;

                // Check if category is used in any transaction
                const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
                const usedInTransactions = transactions.some(t => t.description === categoryName);

                if (usedInTransactions) {
                    const cannotEditMsg = getNestedValue(translations, 'validation.cannotEditCategory').replace('{0}', categoryName) || `Cannot edit category "${categoryName}" because it is used in one or more transactions. Please delete or update those transactions first.`;
                    alert(cannotEditMsg);
                    return;
                }

                openCategoryEditModal(index);
            });
        });
    }

    // Edit category modal
    let categoryEditingIndex = null;

    function openCategoryEditModal(index) {
        categoryEditingIndex = index;
        const category = categories[index];
        const translations = getTranslations();

        document.getElementById('categoryName').value = category.name;
        document.querySelector('#categoryModal .modal-content h3').textContent = translations.modals.editCategory;

        loadCategoryIcons(category.icon);
        categoryModal.classList.add('active');
    }

    function loadCategoryIcons(selectedIconPath = null) {
        // Clear existing icons
        categoryIconSelection.innerHTML = '';

        // Available category icons with display names
        const iconFiles = [
            { file: 'food.png', name: 'Food' },
            { file: 'beverage.png', name: 'Beverage' },
            { file: 'shopping.png', name: 'Shopping' },
            { file: 'rent.png', name: 'Rent' },
            { file: 'transportation.png', name: 'Transportation' },
            { file: 'loan.png', name: 'Loan' },
            { file: 'theatre.png', name: 'Theatre' },
            { file: 'fuel.png', name: 'Fuel' },
            { file: 'gym.png', name: 'Gym' },
            { file: 'travel.png', name: 'Travel' },
            { file: 'kids.png', name: 'Kids' },
            { file: 'gift.png', name: 'Gift' },
            { file: 'clothes.png', name: 'Clothes' },
            { file: 'general.png', name: 'General' },
            { file: 'health.png', name: 'Health' },
            { file: 'tax.png', name: 'Tax' },
            { file: 'insurance.png', name: 'Insurance' },
            { file: 'bill.png', name: 'Bill' }
        ];

        if (iconFiles.length === 0) {
            categoryIconSelection.innerHTML = '<p style="color: #888; grid-column: 1/-1; text-align: center;">No icons found in images/categories/</p>';
            return;
        }

        iconFiles.forEach(function(icon) {
            const iconPath = 'images/categories/' + icon.file;
            const iconOption = document.createElement('div');
            iconOption.className = 'icon-option';
            iconOption.setAttribute('data-icon', iconPath);
            iconOption.setAttribute('title', icon.name);
            iconOption.innerHTML = `<img src="${iconPath}" alt="${icon.name}">`;

            // Select the current icon if editing
            if (selectedIconPath && iconPath === selectedIconPath) {
                iconOption.classList.add('selected');
                selectedCategoryIconInput.value = iconPath;
            }

            iconOption.addEventListener('click', function() {
                categoryIconSelection.querySelectorAll('.icon-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                selectedCategoryIconInput.value = iconPath;
            });
            categoryIconSelection.appendChild(iconOption);
        });
    }

    // Open category modal
    addCategoryBtn.addEventListener('click', function() {
        // Reset form state before opening
        addCategoryForm.reset();
        selectedCategoryIconInput.value = '';
        categoryIconSelection.querySelectorAll('.icon-option').forEach(opt => opt.classList.remove('selected'));
        const translations = getTranslations();
        document.querySelector('#categoryModal .modal-content h3').textContent = translations.modals.addCategory;
        categoryEditingIndex = null;
        categoryModal.classList.add('active');
        loadCategoryIcons();
    });

    // Close category modal
    function closeCategoryModal() {
        categoryModal.classList.remove('active');
        addCategoryForm.reset();
        selectedCategoryIconInput.value = '';
        document.querySelectorAll('#categoryIconSelection .icon-option').forEach(opt => opt.classList.remove('selected'));
        const translations = getTranslations();
        document.querySelector('#categoryModal .modal-content h3').textContent = translations.modals.addCategory;
        categoryEditingIndex = null;
    }

    categoryModalClose.addEventListener('click', closeCategoryModal);
    categoryBtnCancel.addEventListener('click', closeCategoryModal);

    // Close modal when clicking outside
    categoryModal.addEventListener('click', function(e) {
        if (e.target === categoryModal) {
            closeCategoryModal();
        }
    });

    // Category form submission
    addCategoryForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('categoryName').value.trim();
        const icon = selectedCategoryIconInput.value;

        // Validation
        if (!name) {
            const enterCategoryMsg = getNestedValue(translations, 'validation.enterCategoryName') || 'Please enter a category name';
            alert(enterCategoryMsg);
            return;
        }
        if (!icon) {
            const selectIconMsg = getNestedValue(translations, 'validation.selectIcon') || 'Please select an icon';
            alert(selectIconMsg);
            return;
        }

        if (categoryEditingIndex !== null) {
            // Check if another category already has this name (excluding current category)
            const duplicateName = categories.some((cat, idx) =>
                idx !== categoryEditingIndex && cat.name.toLowerCase() === name.toLowerCase()
            );
            if (duplicateName) {
                const duplicateCategoryMsg = getNestedValue(translations, 'validation.duplicateCategoryName') || 'A category with this name already exists. Please use a different name.';
                alert(duplicateCategoryMsg);
                return;
            }
            // Update existing category
            categories[categoryEditingIndex] = {
                name: name,
                icon: icon
            };
        } else {
            // Check if category name already exists
            const duplicateName = categories.some(cat => cat.name.toLowerCase() === name.toLowerCase());
            if (duplicateName) {
                const duplicateCategoryMsg = getNestedValue(translations, 'validation.duplicateCategoryName') || 'A category with this name already exists. Please use a different name.';
                alert(duplicateCategoryMsg);
                return;
            }
            // Add new category
            categories.push({
                name: name,
                icon: icon
            });
        }

        // Save to localStorage
        localStorage.setItem('categories', JSON.stringify(categories));

        // Re-render categories
        renderCategories();

        // Close modal
        closeCategoryModal();
    });

    // Initial render
    populateDefaultCategories();
    renderCategories();

    // Income/Expense Modal functionality
    const incomeBtn = document.getElementById('incomeBtn');
    const expenseBtn = document.getElementById('expenseBtn');
    const incomeExpenseModal = document.getElementById('incomeExpenseModal');
    const incomeExpenseModalClose = document.getElementById('incomeExpenseModalClose');
    const incomeExpenseBtnCancel = document.getElementById('incomeExpenseBtnCancel');
    const incomeExpenseForm = document.getElementById('incomeExpenseForm');
    const incomeExpenseWallet = document.getElementById('incomeExpenseWallet');
    const incomeExpenseAmount = document.getElementById('incomeExpenseAmount');
    const incomeExpenseDescription = document.getElementById('incomeExpenseDescription');
    const incomeExpenseType = document.getElementById('incomeExpenseType');
    const incomeExpenseModalTitle = document.getElementById('incomeExpenseModalTitle');
    const incomeExpenseCategory = document.getElementById('incomeExpenseCategory');
    const incomeExpenseCategorySelection = document.getElementById('incomeExpenseCategorySelection');
    const categorySelectorGroup = document.getElementById('categorySelectorGroup');
    const descriptionGroup = document.getElementById('descriptionGroup');

    // Load transactions from localStorage
    let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');

    // Helper function to refresh wallets from localStorage
    function refreshWalletsFromStorage() {
        wallets = JSON.parse(localStorage.getItem('wallets') || '[]');
        renderWallets();
    }

    // Render transactions
    function renderTransactions() {
        const tbody = document.getElementById('transactionsTableBody');
        const emptyState = document.getElementById('transactionsEmptyState');
        const tableContainer = document.getElementById('transactionsTableContainer');
        const downloadBtn = document.getElementById('downloadExcelBtn');
        const clearBtn = document.getElementById('clearTransactionsBtn');

        // Show/hide download and clear buttons based on transaction data
        if (transactions.length === 0) {
            // Show empty state, hide table
            if (emptyState) emptyState.style.display = 'flex';
            if (tableContainer) tableContainer.style.display = 'none';
            if (downloadBtn) downloadBtn.style.display = 'none';
            if (clearBtn) clearBtn.style.display = 'none';
            return;
        }

        // Hide empty state, show table
        if (emptyState) emptyState.style.display = 'none';
        if (tableContainer) tableContainer.style.display = 'block';

        // Show buttons when there are transactions
        if (downloadBtn) downloadBtn.style.display = 'flex';
        if (clearBtn) clearBtn.style.display = 'flex';

        tbody.innerHTML = '';
        // Show newest transactions first
        const translations = getTranslations();
        const reversedTransactions = [...transactions].reverse();
        reversedTransactions.forEach(function(transaction, reversedIndex) {
            const row = document.createElement('tr');
            const typeClass = transaction.type === 'income' ? 'income-transaction' : 'expense-transaction';
            const typeLabel = transaction.type === 'income' ? (getNestedValue(translations, 'incomeExpense.income') || 'Income') : (getNestedValue(translations, 'incomeExpense.expense') || 'Expense');
            const amountClass = transaction.type === 'income' ? 'amount-income' : 'amount-expense';
            const amountPrefix = transaction.type === 'income' ? '+' : '-';
            // Calculate original index since we reversed the array
            const originalIndex = transactions.length - 1 - reversedIndex;

            row.innerHTML = `
                <td>${transaction.date}</td>
                <td><span class="transaction-type ${typeClass}">${typeLabel}</span></td>
                <td>${transaction.walletName}</td>
                <td>${transaction.description || '-'}</td>
                <td><span class="transaction-amount ${amountClass}">${amountPrefix}${formatCurrency(transaction.amount)}</span></td>
                <td>
                    <button class="transaction-edit-btn" data-index="${originalIndex}">
                        <img src="images/edit.png" alt="Edit">
                    </button>
                    <button class="transaction-delete-btn" data-index="${originalIndex}">
                        <img src="images/trash.png" alt="Delete">
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Add edit functionality
        document.querySelectorAll('.transaction-edit-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                openEditTransactionModal(index);
            });
        });

        // Add delete functionality
        document.querySelectorAll('.transaction-delete-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                openDeleteTransactionModal(index);
            });
        });
    }

    // Open income modal
    incomeBtn.addEventListener('click', function() {
        incomeExpenseType.value = 'income';
        const translations = getTranslations();
        incomeExpenseModalTitle.textContent = translations.modals.addIncome;
        loadWalletsToDropdown();
        loadIncomeExpenseCategoryIcons();
        incomeExpenseModal.classList.add('active');
        // Refresh summary when income button is clicked
        renderIncomeExpenseSummary();
    });

    // Open expense modal
    expenseBtn.addEventListener('click', function() {
        incomeExpenseType.value = 'expense';
        const translations = getTranslations();
        incomeExpenseModalTitle.textContent = translations.modals.addExpense;
        loadWalletsToDropdown();
        loadIncomeExpenseCategoryIcons();
        incomeExpenseModal.classList.add('active');
        // Refresh summary when expense button is clicked
        renderIncomeExpenseSummary();
    });

    // Load wallets into dropdown
    function loadWalletsToDropdown() {
        const translations = getTranslations();
        const wallets = JSON.parse(localStorage.getItem('wallets') || '[]');
        const chooseWalletMsg = getNestedValue(translations, 'incomeExpense.chooseWallet') || 'Choose a wallet...';
        const noWalletsMsg = getNestedValue(translations, 'incomeExpense.noWallets') || 'No wallets available';
        incomeExpenseWallet.innerHTML = '<option value="">' + chooseWalletMsg + '</option>';

        if (wallets.length === 0) {
            incomeExpenseWallet.innerHTML = '<option value="" disabled>' + noWalletsMsg + '</option>';
            return;
        }

        wallets.forEach(function(wallet) {
            const option = document.createElement('option');
            option.value = wallet.name;
            option.textContent = `${wallet.name} - ${formatCurrency(wallet.amount)}`;
            incomeExpenseWallet.appendChild(option);
        });
    }

    // Prevent floating-point errors on income/expense amount input - allow free input
    const incomeExpenseAmountInput = document.getElementById('incomeExpenseAmount');
    incomeExpenseAmountInput.addEventListener('input', function() {
        let value = this.value;
        // Remove any non-numeric characters except decimal point
        value = value.replace(/[^0-9.]/g, '');
        // Allow only one decimal point
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }
        // Limit to 2 decimal places (but don't force formatting)
        if (parts.length === 2 && parts[1].length > 2) {
            value = parts[0] + '.' + parts[1].substring(0, 2);
        }
        this.value = value;
    });

    // Load category icons for income/expense form
    function loadIncomeExpenseCategoryIcons(selectedIconPath = null) {
        incomeExpenseCategorySelection.innerHTML = '';

        const type = incomeExpenseType.value;

        // For income, use fixed 4 income categories
        if (type === 'income') {
            document.querySelector('.radio-group').style.display = 'flex';
            categorySelectorGroup.style.display = 'block';
            descriptionGroup.style.display = 'none';

            const incomeCategories = [
                { name: 'Business Owner', icon: 'images/income/business-owner.png' },
                { name: 'Investment', icon: 'images/income/investment.png' },
                { name: 'Salary', icon: 'images/income/salary.png' },
                { name: 'Self-Employment', icon: 'images/income/self-employment.png' }
            ];

            incomeCategories.forEach(function(category) {
                const iconOption = document.createElement('div');
                iconOption.className = 'icon-option';
                iconOption.setAttribute('data-icon', category.icon);
                iconOption.setAttribute('data-name', category.name);
                iconOption.setAttribute('title', category.name);
                iconOption.innerHTML = `<img src="${category.icon}" alt="${category.name}">`;

                if (selectedIconPath && category.icon === selectedIconPath) {
                    iconOption.classList.add('selected');
                    incomeExpenseCategory.value = category.icon;
                    incomeExpenseCategory.setAttribute('data-name', category.name);
                }

                iconOption.addEventListener('click', function() {
                    document.querySelectorAll('#incomeExpenseCategorySelection .icon-option').forEach(opt => opt.classList.remove('selected'));
                    this.classList.add('selected');
                    incomeExpenseCategory.value = category.icon;
                    incomeExpenseCategory.setAttribute('data-name', category.name);
                });
                incomeExpenseCategorySelection.appendChild(iconOption);
            });
            return;
        }

        // For expense, use categories from localStorage
        const userCategories = JSON.parse(localStorage.getItem('categories') || '[]');

        if (userCategories.length === 0) {
            // No categories - hide radio group and category selector, show only description
            document.querySelector('.radio-group').style.display = 'none';
            categorySelectorGroup.style.display = 'none';
            descriptionGroup.style.display = 'block';
            incomeExpenseCategory.value = '';
            return;
        }

        // Categories exist - show radio group and category selector
        document.querySelector('.radio-group').style.display = 'flex';
        categorySelectorGroup.style.display = 'block';

        userCategories.forEach(function(category) {
            const iconOption = document.createElement('div');
            iconOption.className = 'icon-option';
            iconOption.setAttribute('data-icon', category.icon);
            iconOption.setAttribute('data-name', category.name);
            iconOption.setAttribute('title', category.name);
            iconOption.innerHTML = `<img src="${category.icon}" alt="${category.name}">`;

            if (selectedIconPath && category.icon === selectedIconPath) {
                iconOption.classList.add('selected');
                incomeExpenseCategory.value = category.icon;
                incomeExpenseCategory.setAttribute('data-name', category.name);
            }

            iconOption.addEventListener('click', function() {
                document.querySelectorAll('#incomeExpenseCategorySelection .icon-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                incomeExpenseCategory.value = category.icon;
                incomeExpenseCategory.setAttribute('data-name', category.name);
            });
            incomeExpenseCategorySelection.appendChild(iconOption);
        });
    }

    // Toggle between category and description fields
    function toggleInfoType() {
        const infoType = document.querySelector('input[name="infoType"]:checked').value;
        if (infoType === 'category') {
            categorySelectorGroup.style.display = 'block';
            descriptionGroup.style.display = 'none';
            incomeExpenseDescription.value = '';
        } else {
            categorySelectorGroup.style.display = 'none';
            descriptionGroup.style.display = 'block';
            incomeExpenseCategory.value = '';
            document.querySelectorAll('#incomeExpenseCategorySelection .icon-option').forEach(opt => opt.classList.remove('selected'));
        }
    }

    // Add event listeners for radio buttons
    document.querySelectorAll('input[name="infoType"]').forEach(function(radio) {
        radio.addEventListener('change', toggleInfoType);
    });

    // Close modal
    function closeIncomeExpenseModal() {
        incomeExpenseModal.classList.remove('active');
        incomeExpenseForm.reset();
        incomeExpenseType.value = '';
        incomeExpenseCategory.value = '';
        incomeExpenseCategory.removeAttribute('data-name');
        document.querySelectorAll('#incomeExpenseCategorySelection .icon-option').forEach(opt => opt.classList.remove('selected'));

        // Reset to default state for expense (income will override when opened)
        const userCategories = JSON.parse(localStorage.getItem('categories') || '[]');
        if (userCategories.length === 0) {
            document.querySelector('.radio-group').style.display = 'none';
            categorySelectorGroup.style.display = 'none';
            descriptionGroup.style.display = 'block';
        } else {
            // Reset to category view
            document.querySelector('input[name="infoType"][value="category"]').checked = true;
            document.querySelector('.radio-group').style.display = 'flex';
            categorySelectorGroup.style.display = 'block';
            descriptionGroup.style.display = 'none';
        }
    }

    incomeExpenseModalClose.addEventListener('click', closeIncomeExpenseModal);
    incomeExpenseBtnCancel.addEventListener('click', closeIncomeExpenseModal);

    // Close modal when clicking outside
    incomeExpenseModal.addEventListener('click', function(e) {
        if (e.target === incomeExpenseModal) {
            closeIncomeExpenseModal();
        }
    });

    // Form submission
    incomeExpenseForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const walletName = incomeExpenseWallet.value.trim();
        const amount = incomeExpenseAmount.value.trim();
        const description = incomeExpenseDescription.value.trim();
        const category = incomeExpenseCategory.value;
        const type = incomeExpenseType.value;

        // Validation
        if (!walletName) {
            const translations = getTranslations();
            const selectWalletMsg = getNestedValue(translations, 'validation.selectWallet') || 'Please select a wallet';
            alert(selectWalletMsg);
            return;
        }
        const sanitizedAmount = sanitizeAmount(amount);
        if (isNaN(sanitizedAmount) || sanitizedAmount < 0) {
            const translations = getTranslations();
            const enterValidAmountMsg = getNestedValue(translations, 'validation.enterValidAmount') || 'Please enter a valid amount';
            alert(enterValidAmountMsg);
            return;
        }

        // Get current wallet amount and update it
        const wallets = JSON.parse(localStorage.getItem('wallets') || '[]');
        const walletIndex = wallets.findIndex(w => w.name === walletName);

        if (walletIndex === -1) {
            const translations = getTranslations();
            const walletNotFoundMsg = getNestedValue(translations, 'validation.walletNotFound') || 'Selected wallet not found';
            alert(walletNotFoundMsg);
            return;
        }

        // Update wallet amount based on transaction type
        const currentAmount = parseFloat(wallets[walletIndex].amount);
        const transactionAmount = sanitizedAmount;

        if (type === 'income') {
            wallets[walletIndex].amount = preciseAdd(currentAmount, transactionAmount).toFixed(2);
        } else {
            const newAmount = preciseSubtract(currentAmount, transactionAmount);
            if (newAmount < 0) {
                const requiredAmount = preciseSubtract(transactionAmount, currentAmount);
                const translations = getTranslations();
                const insufficientFundsMsg = getNestedValue(translations, 'validation.insufficientFunds')
                    .replace('{0}', formatCurrency(currentAmount))
                    .replace('{1}', formatCurrency(transactionAmount))
                    .replace('{2}', formatCurrency(requiredAmount)) || `Insufficient funds! Your current balance is ${formatCurrency(currentAmount)}, but you're trying to spend ${formatCurrency(transactionAmount)}. Required additional amount: ${formatCurrency(requiredAmount)}`;
                alert(insufficientFundsMsg);
                return;
            }
            wallets[walletIndex].amount = newAmount.toFixed(2);
        }

        // Save updated wallets to localStorage
        localStorage.setItem('wallets', JSON.stringify(wallets));

        // Refresh wallets from localStorage and re-render
        refreshWalletsFromStorage();

        // Determine description based on selected info type
        const infoType = document.querySelector('input[name="infoType"]:checked').value;
        let finalDescription = '';
        if (infoType === 'category' && category) {
            // Get category name from the hidden input's data-name attribute
            const categoryInput = document.getElementById('incomeExpenseCategory');
            finalDescription = categoryInput.getAttribute('data-name') || '';
        } else if (infoType === 'description' && description) {
            finalDescription = description;
        }

        // Add transaction record
        const now = new Date();
        const transaction = {
            id: Date.now(),
            date: now.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            type: type,
            walletName: walletName,
            amount: preciseAdd(0, transactionAmount).toFixed(2),
            description: finalDescription,
            category: category || null
        };

        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        // Re-render transactions
        renderTransactions();

        // Re-render wallets and categories to update enabled/disabled state
        renderWallets();
        renderCategories();

        // Close modal
        closeIncomeExpenseModal();

        // Switch to transaction tab to show result
        const transactionMenuItem = document.querySelector('.menu-item[data-menu="transaction"]');
        if (transactionMenuItem) {
            transactionMenuItem.click();
        }
    });

    // Initial render of transactions
    renderTransactions();

    // Edit Transaction Modal functionality
    const editTransactionModal = document.getElementById('editTransactionModal');
    const editTransactionModalClose = document.getElementById('editTransactionModalClose');
    const editTransactionCancel = document.getElementById('editTransactionBtnCancel');
    const editTransactionForm = document.getElementById('editTransactionForm');
    const editTransactionAmount = document.getElementById('editTransactionAmount');
    const editTransactionTypeDisplay = document.getElementById('editTransactionTypeDisplay');
    const editTransactionWalletDisplay = document.getElementById('editTransactionWalletDisplay');
    const editTransactionDescriptionDisplay = document.getElementById('editTransactionDescriptionDisplay');
    const originalTransactionAmount = document.getElementById('originalTransactionAmount');
    const originalTransactionWallet = document.getElementById('originalTransactionWallet');
    const editTransactionType = document.getElementById('editTransactionType');
    const editTransactionId = document.getElementById('editTransactionId');

    let editTransactionIndex = null;

    function openEditTransactionModal(index) {
        editTransactionIndex = index;
        const transaction = transactions[index];
        const translations = getTranslations();

        // Store original values for wallet update calculation
        originalTransactionAmount.value = transaction.amount;
        originalTransactionWallet.value = transaction.walletName;
        editTransactionType.value = transaction.type;
        editTransactionId.value = transaction.id;

        // Display read-only info
        editTransactionTypeDisplay.textContent = transaction.type === 'income' ? (getNestedValue(translations, 'incomeExpense.income') || 'Income') : (getNestedValue(translations, 'incomeExpense.expense') || 'Expense');
        editTransactionWalletDisplay.textContent = transaction.walletName;
        editTransactionDescriptionDisplay.textContent = transaction.description || (getNestedValue(translations, 'transaction.noTransactions') || 'No description');

        // Set editable amount
        editTransactionAmount.value = transaction.amount;

        editTransactionModal.classList.add('active');
    }

    // Prevent floating-point errors on edit transaction amount input - allow free input
    const editTransactionAmountInput = document.getElementById('editTransactionAmount');
    editTransactionAmountInput.addEventListener('input', function() {
        let value = this.value;
        // Remove any non-numeric characters except decimal point
        value = value.replace(/[^0-9.]/g, '');
        // Allow only one decimal point
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }
        // Limit to 2 decimal places (but don't force formatting)
        if (parts.length === 2 && parts[1].length > 2) {
            value = parts[0] + '.' + parts[1].substring(0, 2);
        }
        this.value = value;
    });

    function closeEditTransactionModal() {
        editTransactionModal.classList.remove('active');
        editTransactionForm.reset();
        editTransactionIndex = null;
    }

    editTransactionModalClose.addEventListener('click', closeEditTransactionModal);
    editTransactionCancel.addEventListener('click', closeEditTransactionModal);

    editTransactionModal.addEventListener('click', function(e) {
        if (e.target === editTransactionModal) {
            closeEditTransactionModal();
        }
    });

    // Edit transaction form submission - only amount is edited
    editTransactionForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const newAmount = sanitizeAmount(editTransactionAmount.value);
        const originalAmount = parseFloat(originalTransactionAmount.value);
        const originalWallet = originalTransactionWallet.value;
        const type = editTransactionType.value;

        // Validation
        if (!newAmount || newAmount <= 0) {
            const translations = getTranslations();
            const enterValidAmountMsg = getNestedValue(translations, 'validation.enterValidAmountGreater') || 'Please enter a valid amount greater than 0';
            alert(enterValidAmountMsg);
            return;
        }

        const wallets = JSON.parse(localStorage.getItem('wallets') || '[]');
        const walletIndex = wallets.findIndex(w => w.name === originalWallet);

        if (walletIndex === -1) {
            const translations = getTranslations();
            const walletNotFoundMsg = getNestedValue(translations, 'validation.walletNotFound') || 'Selected wallet not found';
            alert(walletNotFoundMsg);
            return;
        }

        // Calculate the difference between new and original amount
        const amountDifference = preciseSubtract(newAmount, originalAmount);

        // Apply the difference to the wallet
        const currentWalletAmount = parseFloat(wallets[walletIndex].amount);

        if (type === 'income') {
            // For income: if new amount is higher, add difference; if lower, subtract difference
            wallets[walletIndex].amount = preciseAdd(currentWalletAmount, amountDifference).toFixed(2);
        } else {
            // For expense: if new amount is higher, subtract more; if lower, add back
            const resultAmount = preciseSubtract(currentWalletAmount, amountDifference);
            if (resultAmount < 0) {
                const requiredAmount = preciseSubtract(newAmount, currentWalletAmount);
                const translations = getTranslations();
                const insufficientFundsMsg = getNestedValue(translations, 'validation.insufficientFundsUpdate')
                    .replace('{0}', originalWallet)
                    .replace('{1}', formatCurrency(currentWalletAmount))
                    .replace('{2}', formatCurrency(newAmount))
                    .replace('{3}', formatCurrency(requiredAmount)) || `Insufficient funds! The wallet "${originalWallet}" has ${formatCurrency(currentWalletAmount)}, but the updated expense of ${formatCurrency(newAmount)} requires ${formatCurrency(requiredAmount)} more.`;
                alert(insufficientFundsMsg);
                return;
            }
            wallets[walletIndex].amount = resultAmount.toFixed(2);
        }

        // Save updated wallets
        localStorage.setItem('wallets', JSON.stringify(wallets));
        refreshWalletsFromStorage();

        // Update the transaction with new amount (using precise arithmetic)
        transactions[editTransactionIndex].amount = preciseAdd(0, newAmount).toFixed(2);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        // Re-render
        renderTransactions();
        renderIncomeExpenseSummary();
        renderWallets();
        renderCategories();

        // Close modal
        closeEditTransactionModal();
    });

    // Delete Transaction Modal functionality
    const deleteTransactionModal = document.getElementById('deleteTransactionModal');
    const deleteTransactionModalClose = document.getElementById('deleteTransactionModalClose');
    const deleteTransactionCancel = document.getElementById('deleteTransactionCancel');
    const deleteTransactionConfirm = document.getElementById('deleteTransactionConfirm');
    const updateWalletCheckbox = document.getElementById('updateWalletCheckbox');
    const updateWalletHint = document.getElementById('updateWalletHint');

    let deleteTransactionIndex = null;

    function openDeleteTransactionModal(index) {
        deleteTransactionIndex = index;
        const transaction = transactions[index];
        const translations = getTranslations();

        document.getElementById('deleteTransactionType').textContent = transaction.type === 'income' ? (getNestedValue(translations, 'incomeExpense.income') || 'Income') : (getNestedValue(translations, 'incomeExpense.expense') || 'Expense');
        document.getElementById('deleteTransactionWallet').textContent = transaction.walletName;
        document.getElementById('deleteTransactionAmount').textContent = formatCurrency(transaction.amount);

        // Reset checkbox and hint
        updateWalletCheckbox.checked = false;
        updateWalletHint.style.display = 'none';

        deleteTransactionModal.classList.add('active');
    }

    // Show/hide hint based on checkbox and transaction type
    updateWalletCheckbox.addEventListener('change', function() {
        if (deleteTransactionIndex === null) return;

        const transaction = transactions[deleteTransactionIndex];
        const translations = getTranslations();

        if (this.checked) {
            updateWalletHint.style.display = 'block';
            if (transaction.type === 'expense') {
                updateWalletHint.textContent = getNestedValue(translations, 'deleteTransaction.updateWallet') + `: ${formatCurrency(transaction.amount)} "${transaction.walletName}"`;
            } else {
                updateWalletHint.textContent = getNestedValue(translations, 'deleteTransaction.updateWallet') + `: ${formatCurrency(transaction.amount)} "${transaction.walletName}"`;
            }
        } else {
            updateWalletHint.style.display = 'none';
        }
    });

    function closeDeleteTransactionModal() {
        deleteTransactionModal.classList.remove('active');
        deleteTransactionIndex = null;
    }

    deleteTransactionModalClose.addEventListener('click', closeDeleteTransactionModal);
    deleteTransactionCancel.addEventListener('click', closeDeleteTransactionModal);

    deleteTransactionModal.addEventListener('click', function(e) {
        if (e.target === deleteTransactionModal) {
            closeDeleteTransactionModal();
        }
    });

    // Confirm delete transaction
    deleteTransactionConfirm.addEventListener('click', function() {
        if (deleteTransactionIndex === null) return;

        const transaction = transactions[deleteTransactionIndex];
        const shouldUpdateWallet = updateWalletCheckbox.checked;

        if (shouldUpdateWallet) {
            // Find the wallet and update its balance
            const wallets = JSON.parse(localStorage.getItem('wallets') || '[]');
            const walletIndex = wallets.findIndex(w => w.name === transaction.walletName);

            if (walletIndex === -1) {
                const translations = getTranslations();
                const walletNotFoundMsg = getNestedValue(translations, 'validation.walletNotFoundDelete').replace('{0}', transaction.walletName) || `Wallet "${transaction.walletName}" no longer exists. Cannot update wallet balance. The transaction will be deleted without reversing its effect.`;
                alert(walletNotFoundMsg);
                return;
            }

            const currentAmount = parseFloat(wallets[walletIndex].amount);
            const transactionAmount = parseFloat(transaction.amount);

            if (transaction.type === 'expense') {
                // Add the amount back (reverse the expense)
                wallets[walletIndex].amount = preciseAdd(currentAmount, transactionAmount).toFixed(2);
            } else {
                // Subtract the amount (reverse the income)
                const resultAmount = preciseSubtract(currentAmount, transactionAmount);
                if (resultAmount < 0) {
                    const translations = getTranslations();
                    const cannotSubtractMsg = getNestedValue(translations, 'validation.cannotSubtract')
                        .replace('{0}', transaction.walletName)
                        .replace('{1}', formatCurrency(currentAmount))
                        .replace('{2}', formatCurrency(transactionAmount)) || `Cannot subtract! The wallet "${transaction.walletName}" has insufficient funds (${formatCurrency(currentAmount)}) to reverse this income transaction of ${formatCurrency(transactionAmount)}.`;
                    alert(cannotSubtractMsg);
                    return;
                }
                wallets[walletIndex].amount = resultAmount.toFixed(2);
            }

            localStorage.setItem('wallets', JSON.stringify(wallets));
            refreshWalletsFromStorage();
        }

        // Remove the transaction
        transactions.splice(deleteTransactionIndex, 1);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        // Re-render
        renderTransactions();
        renderIncomeExpenseSummary();
        renderWallets();
        renderCategories();

        // Close modal
        closeDeleteTransactionModal();
    });

    // Excel download, Upload, and Clear functionality
    const uploadExcelBtn = document.getElementById('uploadExcelBtn');
    const downloadExcelBtn = document.getElementById('downloadExcelBtn');
    const clearTransactionsBtn = document.getElementById('clearTransactionsBtn');

    // Upload Excel functionality
    uploadExcelBtn.addEventListener('click', function() {
        const translations = getTranslations();

        // Create hidden file input
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.xlsx,.xls';

        input.addEventListener('change', async function(e) {
            const file = e.target.files[0];
            if (!file) return;

            try {
                const reader = new FileReader();
                reader.onload = async function(event) {
                    const data = new Uint8Array(event.target.result);
                    const workbook = new ExcelJS.Workbook();
                    await workbook.xlsx.load(data);

                    const worksheet = workbook.getWorksheet(1);
                    if (!worksheet) {
                        alert('No worksheet found in the uploaded file.');
                        return;
                    }

                    // Read header row to find column indices
                    const headerRow = worksheet.getRow(1);
                    const headers = {};
                    headerRow.eachCell((cell, colNumber) => {
                        const header = cell.value?.toString().toLowerCase().trim();
                        if (header) {
                            headers[header] = colNumber;
                        }
                    });

                    // Find column indices
                    const dateCol = headers['date'] || headers['date/time'] || 1;
                    const typeCol = headers['type'] || 2;
                    const walletCol = headers['wallet'] || 3;
                    const descCol = headers['description'] || 4;
                    const amountCol = headers['amount'] || 5;

                    const importedTransactions = [];
                    const now = Date.now();

                    // Read data rows
                    worksheet.eachRow((row, rowNumber) => {
                        if (rowNumber === 1) return; // Skip header

                        const dateValue = row.getCell(dateCol).value;
                        const typeValue = row.getCell(typeCol).value;
                        const walletValue = row.getCell(walletCol).value;
                        const descValue = row.getCell(descCol).value;
                        const amountValue = row.getCell(amountCol).value;

                        if (!dateValue || !typeValue || !walletValue || !amountValue) return;

                        // Parse date
                        let dateStr;
                        if (dateValue instanceof Date) {
                            dateStr = dateValue.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            });
                        } else {
                            dateStr = dateValue.toString();
                        }

                        // Parse type
                        const typeLower = typeValue.toString().toLowerCase();
                        const type = typeLower === 'income' ? 'income' : 'expense';

                        // Parse amount
                        const amount = parseFloat(amountValue);
                        if (isNaN(amount) || amount <= 0) return;

                        importedTransactions.push({
                            id: now + rowNumber,
                            date: dateStr,
                            type: type,
                            walletName: walletValue.toString(),
                            amount: amount.toFixed(2),
                            description: descValue?.toString() || ''
                        });
                    });

                    if (importedTransactions.length === 0) {
                        alert('No valid transactions found in the uploaded file.');
                        return;
                    }

                    // Merge with existing transactions
                    const existingTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
                    const mergedTransactions = [...existingTransactions, ...importedTransactions];

                    // Sort by date descending (newest first)
                    mergedTransactions.sort((a, b) => {
                        const dateA = new Date(a.date);
                        const dateB = new Date(b.date);
                        return dateB - dateA;
                    });

                    // Save merged transactions
                    localStorage.setItem('transactions', JSON.stringify(mergedTransactions));

                    // Re-render
                    renderTransactions();
                    renderIncomeExpenseSummary();
                    renderWallets();
                    renderCategories();

                    const successMsg = `Successfully imported ${importedTransactions.length} transaction(s). Total transactions: ${mergedTransactions.length}`;
                    alert(successMsg);
                };
                reader.readAsArrayBuffer(file);
            } catch (error) {
                console.error('Error importing transactions:', error);
                const translations = getTranslations();
                const importFailedMsg = translations?.validation?.importFailed || 'Failed to import transactions. Please make sure the file is a valid Excel file with the correct format.';
                alert(importFailedMsg);
            }
        });

        input.click();
    });

    downloadExcelBtn.addEventListener('click', async function() {
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        const translations = getTranslations();

        if (transactions.length === 0) {
            const noTransactionsMsg = getNestedValue(translations, 'validation.noTransactionsExport') || 'No transactions to export.';
            alert(noTransactionsMsg);
            return;
        }

        try {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Transactions');

            // Set column headers
            worksheet.columns = [
                { header: 'Date', key: 'date', width: 20 },
                { header: 'Type', key: 'type', width: 12 },
                { header: 'Wallet', key: 'walletName', width: 20 },
                { header: 'Description', key: 'description', width: 30 },
                { header: `Amount (${currentCurrency.code})`, key: 'amount', width: 15 }
            ];

            // Style header row
            worksheet.getRow(1).font = { bold: true };
            worksheet.getRow(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF4A90D9' }
            };
            worksheet.getRow(1).font = { color: { argb: 'FFFFFFFF' }, bold: true };

            // Add transaction data
            transactions.forEach(function(transaction) {
                worksheet.addRow({
                    date: transaction.date,
                    type: transaction.type === 'income' ? 'Income' : 'Expense',
                    walletName: transaction.walletName,
                    description: transaction.description || '',
                    amount: parseFloat(transaction.amount).toFixed(2)
                });
            });

            // Generate file name with current date
            const now = new Date();
            const fileName = `transactions_${now.toISOString().split('T')[0]}.xlsx`;

            // Download file
            await workbook.xlsx.writeBuffer().then(function(buffer) {
                const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                link.click();
                window.URL.revokeObjectURL(url);
            });

        } catch (error) {
            console.error('Error exporting transactions:', error);
            const translations = getTranslations();
            const exportFailedMsg = getNestedValue(translations, 'validation.exportFailed') || 'Failed to export transactions. Please try again.';
            alert(exportFailedMsg);
        }
    });

    // Clear all transactions functionality
    clearTransactionsBtn.addEventListener('click', function() {
        const translations = getTranslations();
        const clearConfirmMsg = getNestedValue(translations, 'validation.clearConfirm') || 'Are you sure you want to clear all transactions? This action cannot be undone.\n\nNote: Clearing transactions will NOT reverse or adjust wallet balances.';
        const confirmed = confirm(clearConfirmMsg);
        if (!confirmed) {
            return;
        }

        transactions = [];
        localStorage.setItem('transactions', JSON.stringify(transactions));
        renderTransactions();
        renderIncomeExpenseSummary();
        renderWallets();
        renderCategories();
    });

    // ========================================
    // Income/Expense Summary and Charts
    // ========================================

    let categoryChart = null;

    // Render Income/Expense Summary
    function renderIncomeExpenseSummary() {
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        const wallets = JSON.parse(localStorage.getItem('wallets') || '[]');

        // Calculate total income from wallets using precise addition
        let balance = 0;
        wallets.forEach(function(wallet) {
            balance = preciseAdd(balance, wallet.amount);
        });

        // Calculate totals from transactions using precise addition
        let totalExpense = 0;
        const expensesByCategory = {};
        const monthlyData = {};

        transactions.forEach(function(transaction) {
            const amount = parseFloat(transaction.amount);
            const date = new Date(transaction.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            const categoryName = transaction.description || 'Uncategorized';

            // Initialize monthly data if not exists
            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { income: 0, expense: 0 };
            }

            if (transaction.type === 'income') {
                monthlyData[monthKey].income = preciseAdd(monthlyData[monthKey].income, amount);
            } else {
                totalExpense = preciseAdd(totalExpense, amount);
                monthlyData[monthKey].expense = preciseAdd(monthlyData[monthKey].expense, amount);

                // Track expenses by category using precise addition
                if (!expensesByCategory[categoryName]) {
                    expensesByCategory[categoryName] = 0;
                }
                expensesByCategory[categoryName] = preciseAdd(expensesByCategory[categoryName], amount);
            }
        });

        // Calculate total income (balance + total expense)
        const totalIncome = preciseAdd(balance, totalExpense);

        // Update summary cards
        document.getElementById('totalIncome').textContent = formatCurrency(totalIncome);
        document.getElementById('balance').textContent = formatCurrency(balance);
        document.getElementById('totalExpense').textContent = formatCurrency(totalExpense);

        // Calculate average monthly expense
        const uniqueMonths = Object.keys(monthlyData);
        const avgMonthlyExpense = uniqueMonths.length > 0 ? Math.round((totalExpense / uniqueMonths.length) * 100) / 100 : 0;
        document.getElementById('avgMonthlyExpense').textContent = formatCurrency(avgMonthlyExpense);

        // Calculate average remaining usage per day for the rest of the month
        const now = new Date();
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        const currentDay = now.getDate();
        const remainingDays = daysInMonth - currentDay + 1; // From current day to end of month (inclusive)
        // Average remaining usage per day = balance / remaining days
        const avgRemainingPerDay = remainingDays > 0 ? Math.round((balance / remainingDays) * 100) / 100 : balance;
        document.getElementById('avgRemainingThisMonth').textContent = formatCurrency(avgRemainingPerDay);

        // Render charts
        renderCategoryChart(expensesByCategory);
    }

    // Render Expenses by Category Chart
    function renderCategoryChart(expensesByCategory) {
        const categoryChartCard = document.querySelector('.chart-card');
        const ctx = document.getElementById('categoryChart');
        if (!ctx) return;

        // Hide entire chart card if no expenses
        if (Object.keys(expensesByCategory).length === 0) {
            if (categoryChartCard) {
                categoryChartCard.style.display = 'none';
            }
            return;
        }

        // Show chart card if there are expenses
        if (categoryChartCard) {
            categoryChartCard.style.display = 'block';
        }

        // Destroy existing chart
        if (categoryChart) {
            categoryChart.destroy();
        }

        const categories = Object.keys(expensesByCategory);
        const data = Object.values(expensesByCategory);

        // Colors for categories
        const backgroundColors = [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(199, 199, 199, 0.8)',
            'rgba(83, 102, 255, 0.8)',
            'rgba(255, 99, 255, 0.8)',
            'rgba(99, 255, 132, 0.8)',
            'rgba(255, 193, 7, 0.8)',
            'rgba(0, 188, 212, 0.8)'
        ];

        const isDarkMode = document.body.classList.contains('dark-mode');
        const textColor = isDarkMode ? '#b0b0b0' : '#555';

        categoryChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: categories,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: isDarkMode ? '#2a2a2a' : '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            color: textColor,
                            font: {
                                size: 11
                            },
                            boxWidth: 12
                        }
                    }
                }
            }
        });
    }

    // Listen for storage changes (for cross-tab updates)
    window.addEventListener('storage', function() {
        renderIncomeExpenseSummary();
    });

    // Initial render of Income/Expense summary
    renderIncomeExpenseSummary();
});
