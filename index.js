document.addEventListener('DOMContentLoaded', function() {
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

    // Initialize title bar
    updateTitleBar();
    setInterval(updateTitleBar, 1000);

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

        // Update location (using browser's geolocation if available)
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

    // Render wallets
    function renderWallets() {
        walletsList.innerHTML = '';
        if (wallets.length === 0) {
            walletsList.innerHTML = '<p style="color: #888; text-align: center; grid-column: 1/-1;">No wallets added yet. Click the + button to add one.</p>';
            return;
        }
        wallets.forEach(function(wallet, index) {
            const walletItem = document.createElement('div');
            walletItem.className = 'wallet-item';
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

                const confirmed = confirm(`Are you sure you want to delete "${walletName}"? This action cannot be undone.`);
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
                openEditModal(index);
            });
        });
    }

    // Edit wallet modal
    let editingIndex = null;

    function openEditModal(index) {
        editingIndex = index;
        const wallet = wallets[index];

        document.getElementById('walletName').value = wallet.name;
        document.getElementById('walletAmount').value = wallet.amount;
        document.querySelector('.modal-content h3').textContent = 'Edit Wallet';

        loadWalletIcons(wallet.icon);
        walletModal.classList.add('active');
    }

    function loadWalletIcons(selectedIconPath = null) {
        // Clear existing icons
        iconSelection.innerHTML = '';

        // Available wallet icons with display names
        const iconFiles = [
            { file: 'banking.png', name: 'Banking' },
            { file: 'wallet.png', name: 'Digital Cash' },
            { file: 'money.png', name: 'Cash' }
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
                document.querySelectorAll('.icon-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                selectedIconInput.value = iconPath;
            });
            iconSelection.appendChild(iconOption);
        });
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
                document.querySelectorAll('.icon-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                selectedIconInput.value = iconPath;
            });
            iconSelection.appendChild(iconOption);
        });
    }

    // Open modal
    addWalletBtn.addEventListener('click', function() {
        walletModal.classList.add('active');
        loadWalletIcons();
    });

    // Close modal
    function closeModal() {
        walletModal.classList.remove('active');
        addWalletForm.reset();
        selectedIconInput.value = '';
        document.querySelectorAll('.icon-option').forEach(opt => opt.classList.remove('selected'));
        document.querySelector('.modal-content h3').textContent = 'Add New Wallet';
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

    // Form submission
    addWalletForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('walletName').value.trim();
        const icon = selectedIconInput.value;
        const amount = document.getElementById('walletAmount').value;

        // Validation
        if (!name) {
            alert('Please enter a wallet name');
            return;
        }
        if (!icon) {
            alert('Please select an icon');
            return;
        }
        if (!amount || parseFloat(amount) < 0) {
            alert('Please enter a valid amount');
            return;
        }

        if (editingIndex !== null) {
            // Check if another wallet already has this name (excluding current wallet)
            const duplicateName = wallets.some((wallet, idx) =>
                idx !== editingIndex && wallet.name.toLowerCase() === name.toLowerCase()
            );
            if (duplicateName) {
                alert('A wallet with this name already exists. Please use a different name.');
                return;
            }
            // Update existing wallet
            wallets[editingIndex] = {
                name: name,
                icon: icon,
                amount: parseFloat(amount).toFixed(2)
            };
        } else {
            // Check if wallet name already exists
            const duplicateName = wallets.some(wallet => wallet.name.toLowerCase() === name.toLowerCase());
            if (duplicateName) {
                alert('A wallet with this name already exists. Please use a different name.');
                return;
            }
            // Add new wallet
            wallets.push({
                name: name,
                icon: icon,
                amount: parseFloat(amount).toFixed(2)
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

    // Render categories
    function renderCategories() {
        categoriesList.innerHTML = '';
        if (categories.length === 0) {
            categoriesList.innerHTML = '<p style="color: #888; text-align: center; grid-column: 1/-1;">No categories added yet. Click the + button to add one.</p>';
            return;
        }
        categories.forEach(function(category, index) {
            const categoryItem = document.createElement('div');
            categoryItem.className = 'category-item';
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

                const confirmed = confirm(`Are you sure you want to delete "${categoryName}"? This action cannot be undone.`);
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
                openCategoryEditModal(index);
            });
        });
    }

    // Edit category modal
    let categoryEditingIndex = null;

    function openCategoryEditModal(index) {
        categoryEditingIndex = index;
        const category = categories[index];

        document.getElementById('categoryName').value = category.name;
        document.querySelector('#categoryModal .modal-content h3').textContent = 'Edit Category';

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
                document.querySelectorAll('.icon-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                selectedCategoryIconInput.value = iconPath;
            });
            categoryIconSelection.appendChild(iconOption);
        });
    }

    // Open category modal
    addCategoryBtn.addEventListener('click', function() {
        categoryModal.classList.add('active');
        loadCategoryIcons();
    });

    // Close category modal
    function closeCategoryModal() {
        categoryModal.classList.remove('active');
        addCategoryForm.reset();
        selectedCategoryIconInput.value = '';
        document.querySelectorAll('.icon-option').forEach(opt => opt.classList.remove('selected'));
        document.querySelector('#categoryModal .modal-content h3').textContent = 'Add New Category';
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
            alert('Please enter a category name');
            return;
        }
        if (!icon) {
            alert('Please select an icon');
            return;
        }

        if (categoryEditingIndex !== null) {
            // Check if another category already has this name (excluding current category)
            const duplicateName = categories.some((cat, idx) =>
                idx !== categoryEditingIndex && cat.name.toLowerCase() === name.toLowerCase()
            );
            if (duplicateName) {
                alert('A category with this name already exists. Please use a different name.');
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
                alert('A category with this name already exists. Please use a different name.');
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
        const reversedTransactions = [...transactions].reverse();
        reversedTransactions.forEach(function(transaction) {
            const row = document.createElement('tr');
            const typeClass = transaction.type === 'income' ? 'income-transaction' : 'expense-transaction';
            const typeLabel = transaction.type === 'income' ? 'Income' : 'Expense';
            const amountClass = transaction.type === 'income' ? 'amount-income' : 'amount-expense';
            const amountPrefix = transaction.type === 'income' ? '+' : '-';

            row.innerHTML = `
                <td>${transaction.date}</td>
                <td><span class="transaction-type ${typeClass}">${typeLabel}</span></td>
                <td>${transaction.walletName}</td>
                <td>${transaction.description || '-'}</td>
                <td><span class="transaction-amount ${amountClass}">${amountPrefix}${formatCurrency(transaction.amount)}</span></td>
            `;
            tbody.appendChild(row);
        });
    }

    // Open income modal
    incomeBtn.addEventListener('click', function() {
        incomeExpenseType.value = 'income';
        incomeExpenseModalTitle.textContent = 'Add Income';
        loadWalletsToDropdown();
        loadIncomeExpenseCategoryIcons();
        incomeExpenseModal.classList.add('active');
    });

    // Open expense modal
    expenseBtn.addEventListener('click', function() {
        incomeExpenseType.value = 'expense';
        incomeExpenseModalTitle.textContent = 'Add Expense';
        loadWalletsToDropdown();
        loadIncomeExpenseCategoryIcons();
        incomeExpenseModal.classList.add('active');
    });

    // Load wallets into dropdown
    function loadWalletsToDropdown() {
        const wallets = JSON.parse(localStorage.getItem('wallets') || '[]');
        incomeExpenseWallet.innerHTML = '<option value="">Choose a wallet...</option>';

        if (wallets.length === 0) {
            incomeExpenseWallet.innerHTML = '<option value="" disabled>No wallets available</option>';
            return;
        }

        wallets.forEach(function(wallet) {
            const option = document.createElement('option');
            option.value = wallet.name;
            option.textContent = `${wallet.name} - ${formatCurrency(wallet.amount)}`;
            incomeExpenseWallet.appendChild(option);
        });
    }

    // Load category icons for income/expense form
    function loadIncomeExpenseCategoryIcons(selectedIconPath = null) {
        incomeExpenseCategorySelection.innerHTML = '';

        // Load categories from localStorage
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

        // Check if categories exist
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
            alert('Please select a wallet');
            return;
        }
        if (!amount || parseFloat(amount) <= 0) {
            alert('Please enter a valid amount greater than 0');
            return;
        }

        // Get current wallet amount and update it
        const wallets = JSON.parse(localStorage.getItem('wallets') || '[]');
        const walletIndex = wallets.findIndex(w => w.name === walletName);

        if (walletIndex === -1) {
            alert('Selected wallet not found');
            return;
        }

        // Update wallet amount based on transaction type
        const currentAmount = parseFloat(wallets[walletIndex].amount);
        const transactionAmount = parseFloat(amount);

        if (type === 'income') {
            wallets[walletIndex].amount = (currentAmount + transactionAmount).toFixed(2);
        } else {
            if (currentAmount < transactionAmount) {
                const remainingBalance = currentAmount - transactionAmount;
                alert(`Insufficient funds! Your current balance is ${formatCurrency(currentAmount)}, but you're trying to spend ${formatCurrency(transactionAmount)}. Required additional amount: ${formatCurrency(Math.abs(remainingBalance))}`);
                return;
            }
            wallets[walletIndex].amount = (currentAmount - transactionAmount).toFixed(2);
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
            amount: transactionAmount,
            description: finalDescription,
            category: category || null
        };

        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        // Re-render transactions
        renderTransactions();

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

    // Excel download and Clear functionality
    const downloadExcelBtn = document.getElementById('downloadExcelBtn');
    const clearTransactionsBtn = document.getElementById('clearTransactionsBtn');

    downloadExcelBtn.addEventListener('click', async function() {
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');

        if (transactions.length === 0) {
            alert('No transactions to export.');
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
            alert('Failed to export transactions. Please try again.');
        }
    });

    // Clear all transactions functionality
    clearTransactionsBtn.addEventListener('click', function() {
        const confirmed = confirm('Are you sure you want to clear all transactions? This action cannot be undone.');
        if (!confirmed) {
            return;
        }

        transactions = [];
        localStorage.setItem('transactions', JSON.stringify(transactions));
        renderTransactions();
        renderIncomeExpenseSummary();
    });

    // ========================================
    // Income/Expense Summary and Charts
    // ========================================

    let categoryChart = null;

    // Render Income/Expense Summary
    function renderIncomeExpenseSummary() {
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        const wallets = JSON.parse(localStorage.getItem('wallets') || '[]');

        // Calculate total income from wallets
        let balance = 0;
        wallets.forEach(function(wallet) {
            balance += parseFloat(wallet.amount);
        });

        // Calculate totals from transactions
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
                monthlyData[monthKey].income += amount;
            } else {
                totalExpense += amount;
                monthlyData[monthKey].expense += amount;

                // Track expenses by category
                if (!expensesByCategory[categoryName]) {
                    expensesByCategory[categoryName] = 0;
                }
                expensesByCategory[categoryName] += amount;
            }
        });

        // Update summary cards
        document.getElementById('balance').textContent = formatCurrency(balance);
        document.getElementById('totalExpense').textContent = formatCurrency(totalExpense);

        // Calculate average monthly expense
        const uniqueMonths = Object.keys(monthlyData);
        const avgMonthlyExpense = uniqueMonths.length > 0 ? totalExpense / uniqueMonths.length : 0;
        document.getElementById('avgMonthlyExpense').textContent = formatCurrency(avgMonthlyExpense);

        // Calculate average remaining usage per day for the rest of the month
        const now = new Date();
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        const currentDay = now.getDate();
        const remainingDays = daysInMonth - currentDay + 1; // From current day to end of month (inclusive)
        // Average remaining usage per day = balance / remaining days
        const avgRemainingPerDay = remainingDays > 0 ? balance / remainingDays : balance;
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
