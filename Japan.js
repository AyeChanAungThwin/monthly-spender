const Japan = {
    title: "月次支出",
    menu: {
        incomeExpense: "収入/支出",
        transaction: "取引履歴",
        categories: "カテゴリ",
        wallets: "ウォレット",
        settings: "設定"
    },
    incomeExpense: {
        title: "収入/支出",
        income: "収入",
        expense: "支出"
    },
    transaction: {
        title: "取引履歴",
        clearAll: "すべてクリア",
        downloadExcel: "Excel をダウンロード",
        noTransactions: "取引履歴がありません。",
        noTransactionsHint: "収入/支出ページから収入または支出を追加してください。",
        date: "日付",
        type: "タイプ",
        wallet: "ウォレット",
        description: "説明",
        amount: "金額",
        actions: "アクション"
    },
    categories: {
        title: "カテゴリ",
        hint: "取引で使用されている項目はグレー表示され、編集または削除できません。",
        addNew: "新しいカテゴリを追加"
    },
    wallets: {
        title: "ウォレット",
        hint: "取引で使用されているウォレットは金額のみ編集でき、削除できません。",
        addNew: "新しいウォレットを追加"
    },
    modals: {
        addCategory: "新しいカテゴリを追加",
        editCategory: "カテゴリを編集",
        addWallet: "新しいウォレットを追加",
        editWallet: "ウォレットを編集",
        addIncome: "収入を追加",
        addExpense: "支出を追加",
        editTransaction: "取引を編集",
        deleteTransaction: "取引を削除",
        name: "名前",
        icon: "アイコン",
        amount: "金額",
        selectWallet: "ウォレットを選択",
        category: "カテゴリ",
        description: "説明",
        cancel: "キャンセル",
        submit: "送信",
        saveChanges: "変更を保存",
        delete: "削除",
        categoryName: "カテゴリ名を入力",
        walletName: "ウォレット名を入力",
        enterDescription: "説明を入力",
        editTransactionHint: "金額を変更すると、ウォレット残高が自動的に調整されます。",
        deleteTransactionConfirm: "この取引を削除してもよろしいですか？",
        updateWallet: "ウォレット残高を更新する（取引の影響を元に戻す）",
        transactionType: "タイプ",
        wallet: "ウォレット"
    },
    theme: {
        toggle: "ダークモード/ライトモードを切り替え"
    },
    settings: {
        title: "設定",
        signin: "データを保存するには Google アカウントにログインしてください"
    },
    language: {
        select: "言語を選択",
        english: "英語",
        myanmar: "ミャンマー語",
        chinese: "中国語",
        thai: "タイ語",
        japanese: "日本語"
    },
    summary: {
        totalIncome: "総収入",
        balance: "残高",
        totalExpense: "総支出",
        avgMonthlyExpense: "月平均支出",
        avgRemainingPerDay: "1 日あたりの平均残り金額",
        expensesByCategory: "カテゴリ別支出"
    },
    noData: {
        noWallets: "ウォレットが追加されていません。+ ボタンをクリックして追加してください。",
        noCategories: "カテゴリが追加されていません。+ ボタンをクリックして追加してください。"
    },
    incomeExpense: {
        title: "収入/支出",
        income: "収入",
        expense: "支出",
        chooseWallet: "ウォレットを選択...",
        noWallets: "利用可能なウォレットがありません",
        additionalInfo: "追加情報（オプション）",
        category: "カテゴリ",
        description: "説明",
        selectCategory: "カテゴリを選択",
        enterDescription: "説明を入力",
        submit: "送信",
        cancel: "キャンセル"
    },
    editTransaction: {
        title: "取引を編集",
        hint: "金額を変更すると、ウォレット残高が自動的に調整されます。",
        type: "取引タイプ",
        wallet: "ウォレット",
        amount: "金額",
        descriptionCategory: "説明/カテゴリ",
        cancel: "キャンセル",
        saveChanges: "変更を保存"
    },
    deleteTransaction: {
        title: "取引を削除",
        confirm: "この取引を削除してもよろしいですか？",
        type: "タイプ",
        wallet: "ウォレット",
        amount: "金額",
        updateWallet: "ウォレット残高を更新する（取引の影響を元に戻す）",
        cancel: "キャンセル",
        delete: "削除"
    },
    validation: {
        enterWalletName: "ウォレット名を入力してください",
        selectIcon: "アイコンを選択してください",
        enterValidAmount: "有効な金額を入力してください",
        duplicateWalletName: "この名前のウォレットは既に存在します。別の名前を使用してください。",
        enterCategoryName: "カテゴリ名を入力してください",
        duplicateCategoryName: "この名前のカテゴリは既に存在します。別の名前を使用してください。",
        selectWallet: "ウォレットを選択してください",
        enterValidAmountGreater: "0 より大きい有効な金額を入力してください",
        walletNotFound: "選択されたウォレットが見つかりません",
        insufficientFunds: "残高不足です！現在の残高は {0} ですが、{1} の支出を試みています。必要な追加金額：{2}",
        insufficientFundsUpdate: "残高不足です！ウォレット \"{0}\" には {1} ありますが、更新後の支出 {2} には {3} 不足しています。",
        cannotSubtract: "控除できません！ウォレット \"{0}\" の残高（{1}）が不足しており、この収入取引 {2} を元に戻すことができません。",
        walletNotFoundDelete: "ウォレット \"{0}\" は存在しません。ウォレット残高を更新できません。取引は効果を元に戻さずに削除されます。",
        noTransactionsExport: "エクスポートする取引がありません。",
        exportFailed: "取引のエクスポートに失敗しました。もう一度お試しください。",
        clearConfirm: "すべての取引をクリアしてもよろしいですか？この操作は元に戻せません。\n\n注意：取引をクリアしても、ウォレット残高は元に戻されません。",
        deleteWalletConfirm: "\"{0}\" を削除してもよろしいですか？この操作は元に戻せません。",
        deleteCategoryConfirm: "\"{0}\" を削除してもよろしいですか？この操作は元に戻せません。",
        cannotDeleteWallet: "ウォレット \"{0}\" は 1 つ以上の取引で使用されているため、削除できません。それらの取引を先に削除または更新してください。",
        cannotDeleteCategory: "カテゴリ \"{0}\" は 1 つ以上の取引で使用されているため、削除できません。それらの取引を先に削除または更新してください。",
        cannotEditCategory: "カテゴリ \"{0}\" は 1 つ以上の取引で使用されているため、編集できません。それらの取引を先に削除または更新してください。"
    }
};
