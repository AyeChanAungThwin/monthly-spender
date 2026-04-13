const Korea = {
    title: "월별 지출",
    menu: {
        incomeExpense: "수입/지출",
        transaction: "거래 내역",
        categories: "카테고리",
        wallets: "지갑",
        settings: "설정"
    },
    incomeExpense: {
        title: "수입/지출",
        income: "수입",
        expense: "지출"
    },
    transaction: {
        title: "거래 내역",
        hint: "모든 거래를 Excel 파일로 다운로드하여 새 장치를 위해 백업하세요. 이전 거래를 업로드하여 데이터를 복원 - 업로드해도 기존 거래는 덮어쓰지 않습니다.",
        clearAll: "모두 지우기",
        downloadExcel: "Excel 다운로드",
        uploadExcel: "Excel 업로드",
        noTransactions: "거래 내역이 없습니다.",
        noTransactionsHint: "수입/지출 페이지에서 수입 또는 지출을 추가하여 시작하세요.",
        date: "날짜",
        type: "유형",
        wallet: "지갑",
        description: "설명",
        amount: "금액",
        actions: "작업"
    },
    categories: {
        title: "카테고리",
        hint: "거래에서 사용된 항목은 회색으로 표시되며 편집하거나 삭제할 수 없습니다.",
        addNew: "새 카테고리 추가"
    },
    wallets: {
        title: "지갑",
        hint: "거래에서 사용된 지갑은 금액만 편집할 수 있으며 삭제할 수 없습니다.",
        addNew: "새 지갑 추가"
    },
    modals: {
        addCategory: "새 카테고리 추가",
        editCategory: "카테고리 편집",
        addWallet: "새 지갑 추가",
        editWallet: "지갑 편집",
        addIncome: "수입 추가",
        addExpense: "지출 추가",
        editTransaction: "거래 편집",
        deleteTransaction: "거래 삭제",
        name: "이름",
        icon: "아이콘",
        amount: "금액",
        selectWallet: "지갑 선택",
        category: "카테고리",
        description: "설명",
        cancel: "취소",
        submit: "제출",
        saveChanges: "변경 사항 저장",
        delete: "삭제",
        categoryName: "카테고리 이름 입력",
        walletName: "지갑 이름 입력",
        enterDescription: "설명 입력",
        editTransactionHint: "금액을 변경하면 지갑 잔액이 자동으로 조정됩니다.",
        deleteTransactionConfirm: "이 거래를 삭제하시겠습니까?",
        updateWallet: "지갑 잔액 업데이트 (거래 효과 되돌리기)",
        transactionType: "유형",
        wallet: "지갑"
    },
    theme: {
        toggle: "다크 모드/라이트 모드 전환"
    },
    settings: {
        title: "설정",
        signin: "데이터를 저장하려면 Google 계정에 로그인하세요"
    },
    language: {
        select: "언어 선택",
        english: "영어",
        myanmar: "미얀마어",
        chinese: "중국어",
        thai: "태국어",
        japanese: "일본어",
        vietnamese: "베트남어",
        cambodian: "캄보디아어",
        philippine: "필리핀어",
        lao: "라오어",
        bangla: "벵골어",
        korean: "한국어"
    },
    summary: {
        totalIncome: "총 수입",
        balance: "잔액",
        totalExpense: "총 지출",
        avgMonthlyExpense: "월평균 지출",
        avgRemainingPerDay: "일일 평균 잔여 금액",
        expensesByCategory: "카테고리별 지출"
    },
    noData: {
        noWallets: "지갑이 없습니다. + 버튼을 클릭하여 추가하세요.",
        noCategories: "카테고리가 없습니다. + 버튼을 클릭하여 추가하세요."
    },
    incomeExpense: {
        title: "수입/지출",
        income: "수입",
        expense: "지출",
        chooseWallet: "지갑을 선택하세요...",
        noWallets: "사용 가능한 지갑이 없습니다",
        additionalInfo: "추가 정보 (선택 사항)",
        category: "카테고리",
        description: "설명",
        selectCategory: "카테고리 선택",
        enterDescription: "설명 입력",
        submit: "제출",
        cancel: "취소"
    },
    editTransaction: {
        title: "거래 편집",
        hint: "금액을 변경하면 지갑 잔액이 자동으로 조정됩니다.",
        type: "거래 유형",
        wallet: "지갑",
        amount: "금액",
        descriptionCategory: "설명/카테고리",
        cancel: "취소",
        saveChanges: "변경 사항 저장"
    },
    deleteTransaction: {
        title: "거래 삭제",
        confirm: "이 거래를 삭제하시겠습니까?",
        type: "유형",
        wallet: "지갑",
        amount: "금액",
        updateWallet: "지갑 잔액 업데이트 (거래 효과 되돌리기)",
        cancel: "취소",
        delete: "삭제"
    },
    validation: {
        enterWalletName: "지갑 이름을 입력하세요",
        selectIcon: "아이콘을 선택하세요",
        enterValidAmount: "유효한 금액을 입력하세요",
        duplicateWalletName: "이 이름의 지갑이 이미 존재합니다. 다른 이름을 사용하세요.",
        enterCategoryName: "카테고리 이름을 입력하세요",
        duplicateCategoryName: "이 이름의 카테고리가 이미 존재합니다. 다른 이름을 사용하세요.",
        selectWallet: "지갑을 선택하세요",
        enterValidAmountGreater: "0 보다 큰 유효한 금액을 입력하세요",
        walletNotFound: "선택한 지갑을 찾을 수 없습니다",
        insufficientFunds: "잔액이 부족합니다! 현재 잔액은 {0} 이지만 {1} 을 지출하려고 합니다. 필요한 추가 금액: {2}",
        insufficientFundsUpdate: "잔액이 부족합니다! 지갑 \"{0}\" 에는 {1} 이 있지만, 업데이트된 지출 {2} 에는 {3} 이 더 필요합니다.",
        cannotSubtract: "공제할 수 없습니다! 지갑 \"{0}\" 에 이 수입 거래 {2} 를 되돌릴 충분한 자금 ({1}) 이 없습니다.",
        walletNotFoundDelete: "지갑 \"{0}\" 이 더 이상 존재하지 않습니다. 지갑 잔액을 업데이트할 수 없습니다. 거래는 효과를 되돌리지 않고 삭제됩니다.",
        noTransactionsExport: "내보낼 거래가 없습니다.",
        exportFailed: "거래 내보내기에 실패했습니다. 다시 시도하세요.",
        importFailed: "거래 가져오기에 실패했습니다. 파일이 올바른 형식의 Excel 파일인지 확인하세요.",
        clearConfirm: "모든 거래를 지우시겠습니까? 이 작업은 되돌릴 수 없습니다.\n\n참고: 거래를 지워도 지갑 잔액은 되돌리거나 조정되지 않습니다.",
        deleteWalletConfirm: "\"{0}\" 을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
        deleteCategoryConfirm: "\"{0}\" 을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
        cannotDeleteWallet: "지갑 \"{0}\" 은 하나 이상의 거래에서 사용되므로 삭제할 수 없습니다. 먼저 해당 거래를 삭제하거나 업데이트하세요.",
        cannotDeleteCategory: "카테고리 \"{0}\" 은 하나 이상의 거래에서 사용되므로 삭제할 수 없습니다. 먼저 해당 거래를 삭제하거나 업데이트하세요.",
        cannotEditCategory: "카테고리 \"{0}\" 은 하나 이상의 거래에서 사용되므로 편집할 수 없습니다. 먼저 해당 거래를 삭제하거나 업데이트하세요."
    }
};
