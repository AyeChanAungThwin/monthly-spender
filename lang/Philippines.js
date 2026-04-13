const Philippines = {
    title: "Buwanang Gastusin",
    menu: {
        incomeExpense: "Kita/Gastusin",
        transaction: "Transaksyon",
        categories: "Mga Kategorya",
        wallets: "Mga Pitaka",
        settings: "Mga Setting"
    },
    incomeExpense: {
        title: "Kita/Gastusin",
        income: "Kita",
        expense: "Gastusin"
    },
    transaction: {
        title: "Mga Transaksyon",
        hint: "I-download ang lahat ng transaksyon bilang Excel backup para sa bagong device. I-upload ang mga naunang transaksyon upang i-restore ang data - ang pag-upload ay hindi mag-o-override ng mga umiiral na transaksyon.",
        clearAll: "I-clear All",
        downloadExcel: "I-download ang Excel",
        uploadExcel: "I-upload ang Excel",
        noTransactions: "Wala pang transaksyon.",
        noTransactionsHint: "Magsimula sa pagdaragdag ng kita o gastusin mula sa page na Kita/Gastusin.",
        date: "Petsa",
        type: "Uri",
        wallet: "Pitaka",
        description: "Paglalarawan",
        amount: "Halaga",
        actions: "Mga Aksyon"
    },
    categories: {
        title: "Mga Kategorya",
        hint: "Ang mga item na ginagamit sa transaksyon ay nakakulay abo at hindi maaaring i-edit o burahin.",
        addNew: "Magdagdag ng Bagong Kategorya"
    },
    wallets: {
        title: "Mga Pitaka",
        hint: "Ang mga pitaka na ginagamit sa transaksyon ay maaaring baguhin lamang ang halaga at hindi maaaring burahin.",
        addNew: "Magdagdag ng Bagong Pitaka"
    },
    modals: {
        addCategory: "Magdagdag ng Bagong Kategorya",
        editCategory: "I-edit ang Kategorya",
        addWallet: "Magdagdag ng Bagong Pitaka",
        editWallet: "I-edit ang Pitaka",
        addIncome: "Magdagdag ng Kita",
        addExpense: "Magdagdag ng Gastusin",
        editTransaction: "I-edit ang Transaksyon",
        deleteTransaction: "Burahin ang Transaksyon",
        name: "Pangalan",
        icon: "Icon",
        amount: "Halaga",
        selectWallet: "Pumili ng Pitaka",
        category: "Kategorya",
        description: "Paglalarawan",
        cancel: "Kanselahin",
        submit: "Isumite",
        saveChanges: "I-save ang Pagbabago",
        delete: "Burahin",
        categoryName: "Ilagay ang pangalan ng kategorya",
        walletName: "Ilagay ang pangalan ng pitaka",
        enterDescription: "Ilagay ang paglalarawan",
        editTransactionHint: "Ang pagbabago ng halaga ay awtomatikong iaayos ang balanse ng pitaka.",
        deleteTransactionConfirm: "Sigurado ka bang gusto mong burahin ang transaksyong ito?",
        updateWallet: "I-update ang balanse ng pitaka (ibalik ang epekto ng transaksyon)",
        transactionType: "Uri",
        wallet: "Pitaka"
    },
    theme: {
        toggle: "I-toggle ang dark/light mode"
    },
    settings: {
        title: "Mga Setting",
        signin: "Mag-sign in sa Google account upang i-save ang iyong data"
    },
    language: {
        select: "Pumili ng Wika",
        english: "Ingles",
        myanmar: "Myanmar",
        chinese: "Intsik",
        thai: "Thai",
        japanese: "Hapon",
        vietnamese: "Vietnamese",
        cambodian: "Cambodian",
        philippine: "Filipino"
    },
    summary: {
        totalIncome: "Kabuuang Kita",
        balance: "Balanse",
        totalExpense: "Kabuuang Gastusin",
        avgMonthlyExpense: "Average na Buwanang Gastusin",
        avgRemainingPerDay: "Average na Natitirang Paggamit/Araw",
        expensesByCategory: "Gastusin ayon sa Kategorya"
    },
    noData: {
        noWallets: "Wala pang mga pitaka. I-click ang + button upang magdagdag.",
        noCategories: "Wala pang mga kategorya. I-click ang + button upang magdagdag."
    },
    incomeExpense: {
        title: "Kita/Gastusin",
        income: "Kita",
        expense: "Gastusin",
        chooseWallet: "Pumili ng pitaka...",
        noWallets: "Walang available na mga pitaka",
        additionalInfo: "Karagdagang Impormasyon (opsyonal)",
        category: "Kategorya",
        description: "Paglalarawan",
        selectCategory: "Pumili ng Kategorya",
        enterDescription: "Ilagay ang paglalarawan",
        submit: "Isumite",
        cancel: "Kanselahin"
    },
    editTransaction: {
        title: "I-edit ang Transaksyon",
        hint: "Ang pagbabago ng halaga ay awtomatikong iaayos ang balanse ng pitaka.",
        type: "Uri ng Transaksyon",
        wallet: "Pitaka",
        amount: "Halaga",
        descriptionCategory: "Paglalarawan/Kategorya",
        cancel: "Kanselahin",
        saveChanges: "I-save ang Pagbabago"
    },
    deleteTransaction: {
        title: "Burahin ang Transaksyon",
        confirm: "Sigurado ka bang gusto mong burahin ang transaksyong ito?",
        type: "Uri",
        wallet: "Pitaka",
        amount: "Halaga",
        updateWallet: "I-update ang balanse ng pitaka (ibalik ang epekto ng transaksyon)",
        cancel: "Kanselahin",
        delete: "Burahin"
    },
    validation: {
        enterWalletName: "Pakilagay ang pangalan ng pitaka",
        selectIcon: "Pumili ng icon",
        enterValidAmount: "Pakilagay ang wastong halaga",
        duplicateWalletName: "May pitaka na na may ganitong pangalan. Gumamit ng ibang pangalan.",
        enterCategoryName: "Pakilagay ang pangalan ng kategorya",
        duplicateCategoryName: "May kategorya na na may ganitong pangalan. Gumamit ng ibang pangalan.",
        selectWallet: "Pumili ng pitaka",
        enterValidAmountGreater: "Pakilagay ang wastong halagang mas malaki sa 0",
        walletNotFound: "Hindi nakita ang napiling pitaka",
        insufficientFunds: "Hindi sapat ang pondo! Ang iyong kasalukuyang balanse ay {0}, ngunit sinusubukan mong gastusin ang {1}. Kinakailangang karagdagang halaga: {2}",
        insufficientFundsUpdate: "Hindi sapat ang pondo! Ang pitaka na \"{0}\" ay may {1}, ngunit ang na-update na gastusin na {2} ay nangangailangan ng {3} pa.",
        cannotSubtract: "Hindi makabawas! Ang pitaka na \"{0}\" ay may hindi sapat na pondo ({1}) upang i-reverse ang transaksyong kita na {2}.",
        walletNotFoundDelete: "Ang pitaka na \"{0}\" ay wala na. Hindi ma-update ang balanse ng pitaka. Ang transaksyon ay mabubura nang hindi ibinalik ang epekto nito.",
        noTransactionsExport: "Walang transaksyon na i-e-export.",
        exportFailed: "Nabigo ang pag-export ng mga transaksyon. Subukan ulit.",
        importFailed: "Nabigo ang pag-import ng mga transaksyon. Siguraduhing wastong Excel file ang iyong na-upload.",
        clearConfirm: "Sigurado ka bang gusto mong i-clear ang lahat ng transaksyon? Ang aksyong ito ay hindi ma-undo.\n\nPaalala: Ang pag-clear ng mga transaksyon ay HINDI ibabalik o iaayos ang mga balanse ng pitaka.",
        deleteWalletConfirm: "Sigurado ka bang gusto mong burahin ang \"{0}\"? Ang aksyong ito ay hindi ma-undo.",
        deleteCategoryConfirm: "Sigurado ka bang gusto mong burahin ang \"{0}\"? Ang aksyong ito ay hindi ma-undo.",
        cannotDeleteWallet: "Hindi maaaring burahin ang pitaka na \"{0}\" dahil ito ay ginagamit sa isa o higit pang mga transaksyon. Pakiburahin o i-update ang mga transaksyong iyon muna.",
        cannotDeleteCategory: "Hindi maaaring burahin ang kategoryang \"{0}\" dahil ito ay ginagamit sa isa o higit pang mga transaksyon. Pakiburahin o i-update ang mga transaksyong iyon muna.",
        cannotEditCategory: "Hindi maaaring i-edit ang kategoryang \"{0}\" dahil ito ay ginagamit sa isa o higit pang mga transaksyon. Pakiburahin o i-update ang mga transaksyong iyon muna."
    }
};
