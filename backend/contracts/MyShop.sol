// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract MyShop is Ownable, ReentrancyGuard, Pausable {
    uint256 nextProductId;
    uint256 nextExpenseId;

    struct Product {
        string name;
        uint256 inventoryQTY;
        uint256 inventoryCost;
    }

    struct Expense {
        string name;
        uint256 cost;
    }

    mapping(uint256 => Product) private products;
    mapping(uint256 => Expense) private expenses;

    uint256[] private productsArr;
    uint256[] private expensesArr;

    event CreatedProduct(uint256 indexed productId, string name);
    event CreatedExpense(uint256 indexed expenseId, string name);
    event BoughtInventory(
        uint256 indexed productId,
        uint256 quantity,
        uint256 price,
        string indexed vendor
    );
    event SoldInventory(
        uint256 indexed productId,
        uint256 quantity,
        uint256 price,
        address indexed customer
    );
    event OwnerWithdrew(address indexed owner, uint256 amount);

    error MyShop__WrongPaymentAmount();
    error MyShop__NotEnoughInventory();
    error MyShop__NotEnoughBalance();
    error MyShop__SentOwnerFailed();

    function createProduct(string calldata _name) external onlyOwner {
        products[nextProductId].name = _name;
        productsArr.push(nextProductId);
        emit CreatedProduct(nextProductId, _name);
        nextProductId++;
    }

    function createExpense(string calldata _name) external onlyOwner {
        expenses[nextExpenseId].name = _name;
        expensesArr.push(nextExpenseId);
        emit CreatedExpense(nextExpenseId, _name);
        nextExpenseId++;
    }

    function buyInventroy(
        uint256 productId,
        uint256 quantity,
        uint256 price,
        string calldata vendor
    ) external onlyOwner {
        products[productId].inventoryQTY += quantity;
        products[productId].inventoryCost += quantity * price;
        emit BoughtInventory(productId, quantity, price, vendor);
    }

    function sellInventory(
        uint256 productId,
        uint256 quantity,
        uint256 price
    ) external payable {
        uint256 payment = quantity * price;
        if (msg.value != payment) {
            revert MyShop__WrongPaymentAmount();
        }
        uint256 inventoryQTY = getInventoryQTY(productId);
        if (quantity > inventoryQTY) {
            revert MyShop__NotEnoughInventory();
        }
        uint256 inventoryCost = getInventoryCost(productId);
        products[productId].inventoryQTY -= quantity;
        products[productId].inventoryCost -=
            (quantity * inventoryCost) /
            inventoryQTY;
        emit SoldInventory(productId, quantity, price, msg.sender);
    }

    function postExpense(uint256 expenseId, uint256 amount) external onlyOwner {
        expenses[expenseId].cost += amount;
    }

    function closeOutExpenses() external onlyOwner {
        uint256 lengthOfExpenses = expensesArr.length;
        for (uint256 id = 0; id < lengthOfExpenses; id++) {
            expenses[id].cost = 0;
        }
    }

    function getInventoryQTY(uint256 productId) public view returns (uint256) {
        return products[productId].inventoryQTY;
    }

    function getInventoryCost(uint256 productId) public view returns (uint256) {
        return products[productId].inventoryCost;
    }

    function getExpenseCost(uint256 expenseId) public view returns (uint256) {
        return expenses[expenseId].cost;
    }

    function getExpenseName(
        uint256 expenseId
    ) public view returns (string memory) {
        return expenses[expenseId].name;
    }

    function getProductName(
        uint256 productId
    ) public view returns (string memory) {
        return products[productId].name;
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function ownerWithdraw(
        uint256 withdrawAmount
    ) external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        if (withdrawAmount > balance) {
            revert MyShop__NotEnoughBalance();
        }
        balance -= withdrawAmount;
        (bool sentOwner, ) = payable(msg.sender).call{value: withdrawAmount}(
            ""
        );
        if (!sentOwner) {
            revert MyShop__SentOwnerFailed();
        }
        emit OwnerWithdrew(msg.sender, withdrawAmount);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
