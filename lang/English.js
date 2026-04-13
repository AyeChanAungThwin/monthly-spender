const English = {
    title: "Monthly Spender",
    menu: {
        incomeExpense: "Income/Expense",
        transaction: "Transaction",
        categories: "Categories",
        wallets: "Wallets",
        settings: "Settings"
    },
    incomeExpense: {
        title: "Income/Expense",
        income: "Income",
        expense: "Expense"
    },
    transaction: {
        title: "Transactions",
        clearAll: "Clear All",
        downloadExcel: "Download Excel",
        uploadExcel: "Upload Excel",
        noTransactions: "No transactions yet.",
        noTransactionsHint: "Start by adding income or expense from the Income/Expense page.",
        date: "Date",
        type: "Type",
        wallet: "Wallet",
        description: "Description",
        amount: "Amount",
        actions: "Actions"
    },
    categories: {
        title: "Categories",
        hint: "Items used in transactions are greyed out and cannot be edited or deleted.",
        addNew: "Add New Category"
    },
    wallets: {
        title: "Wallets",
        hint: "Wallets used in transactions can only have their amount edited and cannot be deleted.",
        addNew: "Add New Wallet"
    },
    modals: {
        addCategory: "Add New Category",
        editCategory: "Edit Category",
        addWallet: "Add New Wallet",
        editWallet: "Edit Wallet",
        addIncome: "Add Income",
        addExpense: "Add Expense",
        editTransaction: "Edit Transaction",
        deleteTransaction: "Delete Transaction",
        name: "Name",
        icon: "Icon",
        amount: "Amount",
        selectWallet: "Select Wallet",
        category: "Category",
        description: "Description",
        cancel: "Cancel",
        submit: "Submit",
        saveChanges: "Save Changes",
        delete: "Delete",
        categoryName: "Enter category name",
        walletName: "Enter wallet name",
        enterDescription: "Enter description",
        editTransactionHint: "Changing the amount will automatically adjust the wallet balance.",
        deleteTransactionConfirm: "Are you sure you want to delete this transaction?",
        updateWallet: "Update wallet balance (reverse the transaction effect)",
        transactionType: "Type",
        wallet: "Wallet"
    },
    theme: {
        toggle: "Toggle dark/light mode"
    },
    settings: {
        title: "Settings",
        signin: "Sign in to Google account to save your data"
    },
    language: {
        select: "Select Language",
        english: "English",
        myanmar: "Myanmar"
    },
    summary: {
        totalIncome: "Total Income",
        balance: "Balance",
        totalExpense: "Total Expense",
        avgMonthlyExpense: "Average Monthly Expense",
        avgRemainingPerDay: "Average Remaining Usage/Day",
        expensesByCategory: "Expenses by Category"
    },
    noData: {
        noWallets: "No wallets added yet. Click the + button to add one.",
        noCategories: "No categories added yet. Click the + button to add one."
    },
    incomeExpense: {
        title: "Income/Expense",
        income: "Income",
        expense: "Expense",
        chooseWallet: "Choose a wallet...",
        noWallets: "No wallets available",
        additionalInfo: "Additional Info (optional)",
        category: "Category",
        description: "Description",
        selectCategory: "Select Category",
        enterDescription: "Enter description",
        submit: "Submit",
        cancel: "Cancel"
    },
    editTransaction: {
        title: "Edit Transaction",
        hint: "Changing the amount will automatically adjust the wallet balance.",
        type: "Transaction Type",
        wallet: "Wallet",
        amount: "Amount",
        descriptionCategory: "Description/Category",
        cancel: "Cancel",
        saveChanges: "Save Changes"
    },
    deleteTransaction: {
        title: "Delete Transaction",
        confirm: "Are you sure you want to delete this transaction?",
        type: "Type",
        wallet: "Wallet",
        amount: "Amount",
        updateWallet: "Update wallet balance (reverse the transaction effect)",
        cancel: "Cancel",
        delete: "Delete"
    },
    validation: {
        enterWalletName: "Please enter a wallet name",
        selectIcon: "Please select an icon",
        enterValidAmount: "Please enter a valid amount",
        duplicateWalletName: "A wallet with this name already exists. Please use a different name.",
        enterCategoryName: "Please enter a category name",
        duplicateCategoryName: "A category with this name already exists. Please use a different name.",
        selectWallet: "Please select a wallet",
        enterValidAmountGreater: "Please enter a valid amount greater than 0",
        walletNotFound: "Selected wallet not found",
        insufficientFunds: "Insufficient funds! Your current balance is {0}, but you're trying to spend {1}. Required additional amount: {2}",
        insufficientFundsUpdate: "Insufficient funds! The wallet \"{0}\" has {1}, but the updated expense of {2} requires {3} more.",
        cannotSubtract: "Cannot subtract! The wallet \"{0}\" has insufficient funds ({1}) to reverse this income transaction of {2}.",
        walletNotFoundDelete: "Wallet \"{0}\" no longer exists. Cannot update wallet balance. The transaction will be deleted without reversing its effect.",
        noTransactionsExport: "No transactions to export.",
        exportFailed: "Failed to export transactions. Please try again.",
        importFailed: "Failed to import transactions. Please make sure the file is a valid Excel file with the correct format.",
        clearConfirm: "Are you sure you want to clear all transactions? This action cannot be undone.\n\nNote: Clearing transactions will NOT reverse or adjust wallet balances.",
        deleteWalletConfirm: "Are you sure you want to delete \"{0}\"? This action cannot be undone.",
        deleteCategoryConfirm: "Are you sure you want to delete \"{0}\"? This action cannot be undone.",
        cannotDeleteWallet: "Cannot delete wallet \"{0}\" because it is used in one or more transactions. Please delete or update those transactions first.",
        cannotDeleteCategory: "Cannot delete category \"{0}\" because it is used in one or more transactions. Please delete or update those transactions first.",
        cannotEditCategory: "Cannot edit category \"{0}\" because it is used in one or more transactions. Please delete or update those transactions first."
    }
};
