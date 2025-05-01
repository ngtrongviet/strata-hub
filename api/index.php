<?php
session_start();

// Initialize budget data if not exists
if (!isset($_SESSION['budget'])) {
    $_SESSION['budget'] = [
        'income' => [],
        'expenses' => []
    ];
}

// Process form submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Add income
    if (isset($_POST['add_income'])) {
        $description = htmlspecialchars($_POST['income_description']);
        $amount = floatval($_POST['income_amount']);
        
        if ($description && $amount > 0) {
            $_SESSION['budget']['income'][] = [
                'description' => $description,
                'amount' => $amount
            ];
        }
    }
    
    // Add expense
    if (isset($_POST['add_expense'])) {
        $description = htmlspecialchars($_POST['expense_description']);
        $amount = floatval($_POST['expense_amount']);
        $category = htmlspecialchars($_POST['expense_category']);
        
        if ($description && $amount > 0) {
            $_SESSION['budget']['expenses'][] = [
                'description' => $description,
                'amount' => $amount,
                'category' => $category
            ];
        }
    }
    
    // Clear all data
    if (isset($_POST['clear_all'])) {
        $_SESSION['budget'] = [
            'income' => [],
            'expenses' => []
        ];
    }
    
    // Redirect to prevent form resubmission
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}

// Calculate totals
$totalIncome = 0;
foreach ($_SESSION['budget']['income'] as $income) {
    $totalIncome += $income['amount'];
}

$totalExpenses = 0;
foreach ($_SESSION['budget']['expenses'] as $expense) {
    $totalExpenses += $expense['amount'];
}

$balance = $totalIncome - $totalExpenses;

// Get expense categories
$categories = ['Food', 'Transportation', 'Housing', 'Entertainment', 'Utilities', 'Other'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Budget Manager</title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        .summary { display: flex; gap: 20px; margin-bottom: 20px; }
        .summary > div { flex: 1; padding: 15px; border-radius: 8px; text-align: center; }
        .income { background: #d4edda; }
        .expense { background: #f8d7da; }
        .balance { background: #cce5ff; }
        .container { display: flex; gap: 20px; }
        .panel { flex: 1; background: #f8f9fa; padding: 15px; border-radius: 8px; }
        form { margin-bottom: 15px; }
        input, select, button { padding: 8px; margin: 5px 0; width: 100%; }
        button { cursor: pointer; background: #007bff; color: white; border: none; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
        .clear-btn { background: #dc3545; float: right; margin-top: 20px; }
        .home-link { display: inline-block; margin-bottom: 15px; padding: 8px 15px; background-color: #243E51; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; }
        .home-link:hover { background-color: #1a2d3d; }
        .header-container { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="header-container">
        <h1>Budget Manager</h1>
        <a href="/" class="home-link">← Back to Dashboard</a>
    </div>
    
    <div class="summary">
        <div class="income">
            <h3>Income</h3>
            <p>$<?= number_format($totalIncome, 2) ?></p>
        </div>
        <div class="expense">
            <h3>Expenses</h3>
            <p>$<?= number_format($totalExpenses, 2) ?></p>
        </div>
        <div class="balance">
            <h3>Balance</h3>
            <p>$<?= number_format($balance, 2) ?></p>
        </div>
    </div>
    
    <div class="container">
        <div class="panel">
            <h2>Add Income</h2>
            <form method="post">
                <input type="text" name="income_description" placeholder="Description" required>
                <input type="number" name="income_amount" placeholder="Amount" step="0.01" min="0.01" required>
                <button type="submit" name="add_income">Add Income</button>
            </form>
            
            <h2>Income List</h2>
            <?php if (empty($_SESSION['budget']['income'])): ?>
                <p>No income entries yet.</p>
            <?php else: ?>
                <table>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                    <?php foreach ($_SESSION['budget']['income'] as $income): ?>
                        <tr>
                            <td><?= $income['description'] ?></td>
                            <td>$<?= number_format($income['amount'], 2) ?></td>
                        </tr>
                    <?php endforeach; ?>
                </table>
            <?php endif; ?>
        </div>
        
        <div class="panel">
            <h2>Add Expense</h2>
            <form method="post">
                <input type="text" name="expense_description" placeholder="Description" required>
                <input type="number" name="expense_amount" placeholder="Amount" step="0.01" min="0.01" required>
                <select name="expense_category" required>
                    <option value="" disabled selected>Select Category</option>
                    <?php foreach ($categories as $category): ?>
                        <option value="<?= $category ?>"><?= $category ?></option>
                    <?php endforeach; ?>
                </select>
                <button type="submit" name="add_expense">Add Expense</button>
            </form>
            
            <h2>Expense List</h2>
            <?php if (empty($_SESSION['budget']['expenses'])): ?>
                <p>No expense entries yet.</p>
            <?php else: ?>
                <table>
                    <tr>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                    </tr>
                    <?php foreach ($_SESSION['budget']['expenses'] as $expense): ?>
                        <tr>
                            <td><?= $expense['description'] ?></td>
                            <td><?= $expense['category'] ?></td>
                            <td>$<?= number_format($expense['amount'], 2) ?></td>
                        </tr>
                    <?php endforeach; ?>
                </table>
            <?php endif; ?>
        </div>
    </div>
    
    <form method="post">
        <button type="submit" name="clear_all" class="clear-btn" onclick="return confirm('Clear all data?')">Clear All Data</button>
    </form>
</body>
</html> 