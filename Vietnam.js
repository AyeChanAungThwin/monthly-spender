const Vietnam = {
    title: "Chi tiêu hàng tháng",
    menu: {
        incomeExpense: "Thu nhập/Chi tiêu",
        transaction: "Giao dịch",
        categories: "Danh mục",
        wallets: "Ví",
        settings: "Cài đặt"
    },
    incomeExpense: {
        title: "Thu nhập/Chi tiêu",
        income: "Thu nhập",
        expense: "Chi tiêu"
    },
    transaction: {
        title: "Giao dịch",
        clearAll: "Xóa tất cả",
        downloadExcel: "Tải xuống Excel",
        noTransactions: "Chưa có giao dịch nào.",
        noTransactionsHint: "Bắt đầu bằng cách thêm thu nhập hoặc chi tiêu từ trang Thu nhập/Chi tiêu.",
        date: "Ngày",
        type: "Loại",
        wallet: "Ví",
        description: "Mô tả",
        amount: "Số tiền",
        actions: "Hành động"
    },
    categories: {
        title: "Danh mục",
        hint: "Các mục được sử dụng trong giao dịch sẽ hiển thị màu xám và không thể chỉnh sửa hoặc xóa.",
        addNew: "Thêm danh mục mới"
    },
    wallets: {
        title: "Ví",
        hint: "Ví được sử dụng trong giao dịch chỉ có thể chỉnh sửa số tiền và không thể xóa.",
        addNew: "Thêm ví mới"
    },
    modals: {
        addCategory: "Thêm danh mục mới",
        editCategory: "Chỉnh sửa danh mục",
        addWallet: "Thêm ví mới",
        editWallet: "Chỉnh sửa ví",
        addIncome: "Thêm thu nhập",
        addExpense: "Thêm chi tiêu",
        editTransaction: "Chỉnh sửa giao dịch",
        deleteTransaction: "Xóa giao dịch",
        name: "Tên",
        icon: "Biểu tượng",
        amount: "Số tiền",
        selectWallet: "Chọn ví",
        category: "Danh mục",
        description: "Mô tả",
        cancel: "Hủy",
        submit: "Xác nhận",
        saveChanges: "Lưu thay đổi",
        delete: "Xóa",
        categoryName: "Nhập tên danh mục",
        walletName: "Nhập tên ví",
        enterDescription: "Nhập mô tả",
        editTransactionHint: "Thay đổi số tiền sẽ tự động điều chỉnh số dư ví.",
        deleteTransactionConfirm: "Bạn có chắc chắn muốn xóa giao dịch này không?",
        updateWallet: "Cập nhật số dư ví (hoàn tác ảnh hưởng của giao dịch)",
        transactionType: "Loại",
        wallet: "Ví"
    },
    theme: {
        toggle: "Chuyển đổi chế độ tối/sáng"
    },
    settings: {
        title: "Cài đặt",
        signin: "Đăng nhập tài khoản Google để lưu dữ liệu của bạn"
    },
    language: {
        select: "Chọn ngôn ngữ",
        english: "Anh",
        myanmar: "Miến Điện",
        chinese: "Trung Quốc",
        thai: "Thái",
        japanese: "Nhật",
        vietnamese: "Việt",
        cambodian: "Campuchia",
        philippine: "Philippines"
    },
    summary: {
        totalIncome: "Tổng thu nhập",
        balance: "Số dư",
        totalExpense: "Tổng chi tiêu",
        avgMonthlyExpense: "Chi tiêu trung bình hàng tháng",
        avgRemainingPerDay: "Số tiền còn lại bình quân mỗi ngày",
        expensesByCategory: "Chi tiêu theo danh mục"
    },
    noData: {
        noWallets: "Chưa có ví nào. Nhấp vào nút + để thêm.",
        noCategories: "Chưa có danh mục nào. Nhấp vào nút + để thêm."
    },
    incomeExpense: {
        title: "Thu nhập/Chi tiêu",
        income: "Thu nhập",
        expense: "Chi tiêu",
        chooseWallet: "Chọn ví...",
        noWallets: "Không có ví khả dụng",
        additionalInfo: "Thông tin bổ sung (tùy chọn)",
        category: "Danh mục",
        description: "Mô tả",
        selectCategory: "Chọn danh mục",
        enterDescription: "Nhập mô tả",
        submit: "Xác nhận",
        cancel: "Hủy"
    },
    editTransaction: {
        title: "Chỉnh sửa giao dịch",
        hint: "Thay đổi số tiền sẽ tự động điều chỉnh số dư ví.",
        type: "Loại giao dịch",
        wallet: "Ví",
        amount: "Số tiền",
        descriptionCategory: "Mô tả/Danh mục",
        cancel: "Hủy",
        saveChanges: "Lưu thay đổi"
    },
    deleteTransaction: {
        title: "Xóa giao dịch",
        confirm: "Bạn có chắc chắn muốn xóa giao dịch này không?",
        type: "Loại",
        wallet: "Ví",
        amount: "Số tiền",
        updateWallet: "Cập nhật số dư ví (hoàn tác ảnh hưởng của giao dịch)",
        cancel: "Hủy",
        delete: "Xóa"
    },
    validation: {
        enterWalletName: "Vui lòng nhập tên ví",
        selectIcon: "Vui lòng chọn biểu tượng",
        enterValidAmount: "Vui lòng nhập số tiền hợp lệ",
        duplicateWalletName: "Ví với tên này đã tồn tại. Vui lòng sử dụng tên khác.",
        enterCategoryName: "Vui lòng nhập tên danh mục",
        duplicateCategoryName: "Danh mục với tên này đã tồn tại. Vui lòng sử dụng tên khác.",
        selectWallet: "Vui lòng chọn ví",
        enterValidAmountGreater: "Vui lòng nhập số tiền hợp lệ lớn hơn 0",
        walletNotFound: "Không tìm thấy ví đã chọn",
        insufficientFunds: "Không đủ tiền! Số dư hiện tại của bạn là {0}, nhưng bạn đang cố chi tiêu {1}. Số tiền bổ sung cần thiết: {2}",
        insufficientFundsUpdate: "Không đủ tiền! Ví \"{0}\" có {1}, nhưng chi tiêu đã cập nhật là {2} cần thêm {3}.",
        cannotSubtract: "Không thể trừ! Ví \"{0}\" không đủ tiền ({1}) để hoàn tác giao dịch thu nhập {2} này.",
        walletNotFoundDelete: "Ví \"{0}\" không còn tồn tại. Không thể cập nhật số dư ví. Giao dịch sẽ bị xóa mà không hoàn tác ảnh hưởng.",
        noTransactionsExport: "Không có giao dịch để xuất.",
        exportFailed: "Không thể xuất giao dịch. Vui lòng thử lại.",
        clearConfirm: "Bạn có chắc chắn muốn xóa tất cả giao dịch? Hành động này không thể hoàn tác.\n\nLưu ý: Xóa giao dịch sẽ KHÔNG hoàn tác hoặc điều chỉnh số dư ví.",
        deleteWalletConfirm: "Bạn có chắc chắn muốn xóa \"{0}\"? Hành động này không thể hoàn tác.",
        deleteCategoryConfirm: "Bạn có chắc chắn muốn xóa \"{0}\"? Hành động này không thể hoàn tác.",
        cannotDeleteWallet: "Không thể xóa ví \"{0}\" vì nó được sử dụng trong một hoặc nhiều giao dịch. Vui lòng xóa hoặc cập nhật những giao dịch đó trước.",
        cannotDeleteCategory: "Không thể xóa danh mục \"{0}\" vì nó được sử dụng trong một hoặc nhiều giao dịch. Vui lòng xóa hoặc cập nhật những giao dịch đó trước.",
        cannotEditCategory: "Không thể chỉnh sửa danh mục \"{0}\" vì nó được sử dụng trong một hoặc nhiều giao dịch. Vui lòng xóa hoặc cập nhật những giao dịch đó trước."
    }
};
