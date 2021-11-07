// let balance = 500.0;

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    // console.log(this.transactions);
    let totalBalence = 0;
    this.transactions.forEach((el) => {
      totalBalence += el.value;
    });
    return totalBalence;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) {
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return this.account.balance - this.amount >= 0;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("billybob");
console.log("Starting Balence:", myAccount.balance);

console.log("Attempting to withdraw anything should fail....");
const t1 = new Withdrawal(120.0, myAccount);
console.log("Commit result:", t1.commit());
console.log("Account Balance: ", myAccount.balance);

console.log("Deposits should work...");
const t2 = new Deposit(50.0, myAccount);
console.log("Commit result:", t2.commit());
console.log("Account Balance: ", myAccount.balance);

console.log("Withdraw 10 from 50");
const t3 = new Withdrawal(10.0, myAccount);
console.log("Commit result:", t3.commit());

console.log("Ending Balance:", myAccount.balance);

console.log("Transaction history:", myAccount.transactions);
