const Chinese = {
    title: "每月支出",
    menu: {
        incomeExpense: "收入/支出",
        transaction: "交易记录",
        categories: "分类",
        wallets: "钱包",
        settings: "设置"
    },
    incomeExpense: {
        title: "收入/支出",
        income: "收入",
        expense: "支出"
    },
    transaction: {
        title: "交易记录",
        clearAll: "清除全部",
        downloadExcel: "下载 Excel",
        uploadExcel: "上传 Excel",
        noTransactions: "暂无交易记录。",
        noTransactionsHint: "从收入/支出页面开始添加入或支出。",
        date: "日期",
        type: "类型",
        wallet: "钱包",
        description: "描述",
        amount: "金额",
        actions: "操作"
    },
    categories: {
        title: "分类",
        hint: "交易中使用的项以灰色显示，无法编辑或删除。",
        addNew: "添加新分类"
    },
    wallets: {
        title: "钱包",
        hint: "交易中使用的钱包只能编辑金额，无法删除。",
        addNew: "添加新钱包"
    },
    modals: {
        addCategory: "添加新分类",
        editCategory: "编辑分类",
        addWallet: "添加新钱包",
        editWallet: "编辑钱包",
        addIncome: "添加入",
        addExpense: "添加支出",
        editTransaction: "编辑交易",
        deleteTransaction: "删除交易",
        name: "名称",
        icon: "图标",
        amount: "金额",
        selectWallet: "选择钱包",
        category: "分类",
        description: "描述",
        cancel: "取消",
        submit: "提交",
        saveChanges: "保存更改",
        delete: "删除",
        categoryName: "输入分类名称",
        walletName: "输入钱包名称",
        enterDescription: "输入描述",
        editTransactionHint: "更改金额将自动调整钱包余额。",
        deleteTransactionConfirm: "确定要删除此交易吗？",
        updateWallet: "更新钱包余额（撤销交易影响）",
        transactionType: "类型",
        wallet: "钱包"
    },
    theme: {
        toggle: "切换深色/浅色模式"
    },
    settings: {
        title: "设置",
        signin: "登录 Google 账户以保存数据"
    },
    language: {
        select: "选择语言",
        english: "英语",
        myanmar: "缅甸语",
        chinese: "中文"
    },
    summary: {
        totalIncome: "总收入",
        balance: "余额",
        totalExpense: "总支出",
        avgMonthlyExpense: "月均支出",
        avgRemainingPerDay: "日均剩余可用金额",
        expensesByCategory: "分类支出"
    },
    noData: {
        noWallets: "暂无钱包。点击 + 按钮添加。",
        noCategories: "暂无分类。点击 + 按钮添加。"
    },
    incomeExpense: {
        title: "收入/支出",
        income: "收入",
        expense: "支出",
        chooseWallet: "选择钱包...",
        noWallets: "无可用钱包",
        additionalInfo: "附加信息（可选）",
        category: "分类",
        description: "描述",
        selectCategory: "选择分类",
        enterDescription: "输入描述",
        submit: "提交",
        cancel: "取消"
    },
    editTransaction: {
        title: "编辑交易",
        hint: "更改金额将自动调整钱包余额。",
        type: "交易类型",
        wallet: "钱包",
        amount: "金额",
        descriptionCategory: "描述/分类",
        cancel: "取消",
        saveChanges: "保存更改"
    },
    deleteTransaction: {
        title: "删除交易",
        confirm: "确定要删除此交易吗？",
        type: "类型",
        wallet: "钱包",
        amount: "金额",
        updateWallet: "更新钱包余额（撤销交易影响）",
        cancel: "取消",
        delete: "删除"
    },
    validation: {
        enterWalletName: "请输入钱包名称",
        selectIcon: "请选择图标",
        enterValidAmount: "请输入有效金额",
        duplicateWalletName: "已存在同名钱包，请使用其他名称。",
        enterCategoryName: "请输入分类名称",
        duplicateCategoryName: "已存在同名分类，请使用其他名称。",
        selectWallet: "请选择钱包",
        enterValidAmountGreater: "请输入大于 0 的有效金额",
        walletNotFound: "未找到所选钱包",
        insufficientFunds: "余额不足！当前余额为 {0}，但您尝试支出 {1}。需要额外金额：{2}",
        insufficientFundsUpdate: "余额不足！钱包 \"{0}\" 有 {1}，但更新后的支出 {2} 需要额外 {3}。",
        cannotSubtract: "无法扣除！钱包 \"{0}\" 余额不足 ({1})，无法撤销此收入交易 {2}。",
        walletNotFoundDelete: "钱包 \"{0}\" 不存在。无法更新钱包余额。交易将被删除且不撤销其影响。",
        noTransactionsExport: "无交易可导出。",
        exportFailed: "导出交易失败，请重试。",
        importFailed: "导入交易失败，请确保文件是格式正确的 Excel 文件。",
        clearConfirm: "确定要清除所有交易吗？此操作无法撤销。\n\n注意：清除交易不会撤销或调整钱包余额。",
        deleteWalletConfirm: "确定要删除 \"{0}\" 吗？此操作无法撤销。",
        deleteCategoryConfirm: "确定要删除 \"{0}\" 吗？此操作无法撤销。",
        cannotDeleteWallet: "无法删除钱包 \"{0}\"，因为它用于一笔或多笔交易中。请先删除或更新这些交易。",
        cannotDeleteCategory: "无法删除分类 \"{0}\"，因为它用于一笔或多笔交易中。请先删除或更新这些交易。",
        cannotEditCategory: "无法编辑分类 \"{0}\"，因为它用于一笔或多笔交易中。请先删除或更新这些交易。"
    }
};
