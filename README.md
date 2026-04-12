# Monthly Spender

A static web application for tracking monthly expenses and budgeting.

## Features

- **Income/Expense Tracking** - Record income and expenses with wallet selection
- **Transaction History** - View all transactions with date, type, wallet, and description
- **Edit Transactions** - Update transaction amounts with automatic wallet balance adjustment
- **Delete Transactions** - Remove individual transactions with optional wallet balance adjustment (reverses the transaction effect)
- **Categories Management** - Create custom expense categories with icons
- **Wallets Management** - Manage multiple wallets (e.g., Bank, Cash, Digital Wallet)
- **Dark/Light Mode** - Toggle between themes with preference saved to localStorage
- **Data Persistence** - All data stored locally in browser localStorage
- **Excel Export** - Download transaction history as Excel spreadsheet
- **Visual Analytics** - Doughnut chart showing expenses by category
- **Monthly Statistics** - Average monthly expense and daily remaining budget
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Location-Based Currency** - Auto-detects country and sets appropriate currency symbol

## Tech Stack

- Vanilla JavaScript (no framework)
- Plain CSS (no preprocessor)
- Static HTML
- Chart.js for data visualization
- ExcelJS for Excel export

## Getting Started

### Option 1: Open Directly in Browser

Simply open `index.html` in your web browser:

```bash
# macOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

### Option 2: Use a Local Server (Recommended)

**Using Python 3:**
```bash
python3 -m http.server 8000
```

**Using Node.js:**
```bash
npx http-server .
```

Then open `http://localhost:8000` in your browser.

## How to Use

### 1. Set Up Wallets

1. Navigate to **Wallets** in the sidebar
2. Click the **+ Add New Wallet** button
3. Enter a name (e.g., "Bank Account", "Cash", "Credit Card")
4. Select an icon (Banking, Digital Cash, Cash, or Coins)
5. Enter the current balance/amount
6. Click **Submit**

### 2. Create Categories (Optional)

1. Navigate to **Categories** in the sidebar
2. Click the **+ Add New Category** button
3. Enter a category name (e.g., "Groceries", "Entertainment")
4. Select an icon from the available options
5. Click **Submit**

*Note: 18 default category icons are available including Food, Beverage, Shopping, Rent, Transportation, Health, etc.*

### 3. Record Income

1. Navigate to **Income/Expense** in the sidebar
2. Click the **Income** button (green)
3. Select a wallet to add funds to
4. Enter the amount
5. Optionally add a description
6. Click **Submit**

### 4. Record Expenses

1. Navigate to **Income/Expense** in the sidebar
2. Click the **Expense** button (red)
3. Select a wallet to deduct from
4. Enter the amount
5. Choose to categorize by:
   - **Category**: Select from your created categories
   - **Description**: Enter custom text
6. Click **Submit**

*Note: Expenses cannot exceed the wallet balance.*

### 5. View and Manage Transactions

1. Navigate to **Transaction** in the sidebar
2. View all recorded transactions in a table
3. **Edit a transaction**:
   - Click the **edit icon** (pencil) on any transaction
   - Modify the amount value (other fields are read-only)
   - Click **Save Changes**
   - The wallet balance is automatically adjusted:
     - For **income**: increasing the amount adds the difference to the wallet; decreasing subtracts the difference
     - For **expense**: increasing the amount deducts more from the wallet; decreasing adds the difference back
4. **Delete a transaction**:
   - Click the **trash icon** on any transaction
   - When deleting, optionally check **Update wallet balance** to reverse the transaction:
     - Deleting an expense adds the amount back to the wallet
     - Deleting an income subtracts the amount from the wallet
5. Click **Download Excel** to export data
6. Click **Clear All** to delete all transactions

### 6. View Analytics

On the **Income/Expense** page, view:

- **Balance**: Total across all wallets
- **Total Expense**: Sum of all expenses
- **Average Monthly Expense**: Mean expense per month
- **Average Remaining Usage/Day**: Daily budget for rest of month
- **Expenses by Category Chart**: Visual breakdown of spending

### 7. Toggle Dark Mode

Click the sun/moon icon in the top-right corner of the title bar to switch between light and dark themes.

## Data Storage

All data is stored in browser localStorage:

- `wallets` - Array of wallet objects
- `categories` - Array of category objects
- `transactions` - Array of transaction records
- `theme` - User's theme preference (light/dark)

Data persists across browser sessions but is local to the browser/device.

## File Structure

```
MonthlySpender/
├── index.html      # Main HTML with sidebar navigation and modals
├── index.js        # Navigation, theme toggle, CRUD operations
├── style.css       # All styles including dark mode and responsive
├── images/
│   ├── categories/ # 18 category icons (food, rent, etc.)
│   └── wallets/    # 4 wallet icons (banking, wallet, money, coins)
└── README.md       # This file
```

## Browser Support

Works in all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## License

MIT

## Electronics Engineer-cum-Full Stack Developer ##
-  Created by - Aye Chan Aung Thwin
