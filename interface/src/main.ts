// 使用例
interface paymentMethod {
  name:string;
  process(amount:number):string;
}


class creditCardPayment implements paymentMethod {
  name:string
  constructor() {
    this.name = 'クレジットカード';
  }
  process(amount:number):string {
    return `${this.name}で${amount}円を処理`;
  }
}

class payPalPayment implements paymentMethod {
  name:string
  constructor() {
    this.name = 'PayPal';
  }
  process(amount:number):string {
    return `${this.name}で${amount}円を処理`;
  }
}

const submit: HTMLElement | null = document.querySelector('#submit');
submit?.addEventListener('click',()=>{
  const paymentValue = document.querySelector('#payment').value;
  const costValue = document.querySelector('#cost').value;
  settlement(paymentValue,costValue);
})

function settlement(payment:string,cost:number) {
  const userChoice:string = payment;
  const amount:number = cost;
  const methods = new Map([
    ['credit', new creditCardPayment()],
    ['paypal', new payPalPayment()]
  ]);

  const method = methods.get(userChoice);
  if (!method) return
  console.log(method.process(amount))
}