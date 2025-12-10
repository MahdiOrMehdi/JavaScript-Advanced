
// class BankAccount {
//     _balance = 0

//     get balance(){
//         return this._balance
//     }

//     set balance(amount){
//         this._balance = amount
//     }

    
// }

// const btnAdd = document.getElementById('add')
// const btnGet = document.getElementById('get')

// const account = new BankAccount()
// class ADD extends BankAccount {
//     added(){
//         let Added = Number(prompt('how much you want to add'))
//         const maliat = Added / 10
//         account.balance += Added - maliat
//         console.log(`The cash ${maliat} the money added: ${Added - maliat}`);
//         console.log(`whole money: ${account._balance}`);
//     }
// }
// btnAdd.addEventListener('click', ()=> {
//     const WantAdd = confirm('Do you want to add money in your bank account')
//     if(WantAdd){
//         const f = new ADD
//         f.added()
//     }
// })

// btnGet.addEventListener('click', ()=> {
//     const WantGet = confirm('Do you want to add money in your bank account')
//     if(WantGet){
//         let getted = Number(prompt('how much you want to get'))
//         const maliatg = getted / 10
//         account.balance -= getted - maliatg
//         console.log(`The cash ${maliatg} the money getted: ${getted - maliatg}`);
//         console.log(`whole money: ${account._balance}`);
//     }
// })



class BankAccount {
  constructor(owner, balance) {
    this.owner = owner;      // public field
    this._balance = balance; // private-ish field با convention _
  }
  // Getter برای خواندن موجودی (Encapsulation)
  get balance() {
    return this._balance;
  }

  // متد واریز (Abstraction)
  deposit(amount) {
    if(amount > 0) {
      this._balance += amount;
      console.log(`${amount} تومان واریز شد. موجودی جدید: ${this._balance}`);
    } else {
      console.log("مقدار واریز باید مثبت باشد!");
    }
  }

  // متد برداشت (Abstraction + validation)
  withdraw(amount) {
    if(amount > 0 && amount <= this._balance) {
      this._balance -= amount;
      console.log(`${amount} تومان برداشت شد. موجودی جدید: ${this._balance}`);
    } else {
      console.log("برداشت نامعتبر است!");
    }
  }

  // متد استاتیک: توضیح درباره نوع حساب
  static accountType() {
    console.log("این یک حساب بانکی استاندارد است.");
  }
}

const myAccount = new BankAccount("علی", 1000);
console.log(myAccount.balance); // فقط خواندنی
myAccount.deposit(500);
myAccount.withdraw(200);
BankAccount.accountType();