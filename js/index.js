/*================== Elementos del DOM =================*/
const money = document.querySelector("#money");
const buttonOne = document.querySelector("#buttonOne");
const buttonTwo = document.querySelector("#buttonTwo");
const buttonThree = document.querySelector("#buttonThree");
const buttonFour = document.querySelector("#buttonFour");
const deposit = document.querySelector("#deposit");
const withdraw = document.querySelector("#withdraw");
const accountBalance = document.querySelector("#accountBalance");
const payForm = document.querySelector("#payForm")
const payment = document.querySelector("#payName");
const amount = document.querySelector("#payCant");
const paymentButton = document.querySelector("#paySubmit");

/*================== Arrays que van a contener los ingresos y retiros realizados =================*/
let deposits = [];
let withdraws = [];

/*======= Array que contiene los objetos que se crean en la clase PaymentTicket =======*/
let historyPayments = [];

/*======= Variable que muestra que muestra en HTML el dinero a ingresar o retirar =======*/
let previewMoney = 0;

/*======= Variable que guarda el saldo =======*/
let balance = 0;

/*======= Clase para guardar los datos de los pagos =======*/
class PaymentsTicket{
    constructor(name,amount){
        this.name = name;
        this.amount = amount
    }
}

/*================== Funcion para seleccionar el valor del boton =================*/
let selecctionButton = (button)=>{
    money.innerText = "$ " + parseInt(button.value) + ".00";
    previewMoney = parseInt(button.value);
}
/*======= Asignacion del evento click a los botones buttonOne/Two/Three/Four =======*/
buttonOne.addEventListener("click", () => selecctionButton(buttonOne));
buttonTwo.addEventListener("click", () => selecctionButton(buttonTwo));
buttonThree.addEventListener("click", () => selecctionButton(buttonThree));
buttonFour.addEventListener("click", () => selecctionButton(buttonFour));

/*================== Asignacion de evento al boton Ingresar =================*/
deposit.addEventListener("click", () => {
    if (previewMoney > 0) {
        deposits.push(previewMoney)
        balance += previewMoney
        accountBalance.innerText = balance + ".00";
        money.innerText = "$ 0.00";
        alert("Ingreso exitoso!!")
        const historialDeposits = document.querySelector("#historyDeposits")
        const li = document.createElement("li")
        li.className = "ingresos"
        li.innerHTML = `+ $${previewMoney}`
        historialDeposits.append(li);
        
        previewMoney = 0;
        
        const totalDeposits = document.querySelector("#totalDeposits")
        let totalD = deposits.reduce((acc, e) => acc + e, 0)
        totalDeposits.innerText = `+ $${totalD}`;
    } else {
        alert("No se puede realizar el ingreso de dinero si no selecciona una cantidad a ingresar")
    }
});

/*================== Asignacion de evento al boton Retirar =================*/
withdraw.addEventListener("click", () => {
    if (previewMoney > 0 && balance >= previewMoney) {
        withdraws.push(previewMoney);
        balance -= previewMoney;
        accountBalance.innerText = balance + ".00";
        money.innerText = "$ 0.00";
        alert("Retiro exitoso!!")
        const historialWithdraws = document.querySelector("#historyWithdraws")
        const li = document.createElement("li")
        li.className = "retiros";
        li.innerHTML = `- $${previewMoney}`
        historialWithdraws.append(li);

        previewMoney = 0;

        const totalWithdraws = document.querySelector("#totalWithdraws")
        let totalW = withdraws.reduce((acc, e) => acc + e, 0)
        totalWithdraws.innerText = `- $${totalW}`;

    } else {
        previewMoney = 0;
        money.innerText = "$ 0.00";
        alert("No se puede realizar el retiro de dinero si no selecciona una cantidad a ingresar o no cuenta con saldo suficiente para retirar")
    }
})

/*================== Asignacion de evento al boton Pagar =================*/
payForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    if (payment.value !== "" && amount.value !== "" ) {
        if(parseInt(amount.value)> balance || parseInt(amount.value)<=0){
            alert("Fondos insuficientes o la cantidad ingresada es erronea")
            payForm.reset();
        }else{
        let payments = new PaymentsTicket(payment.value,parseInt(amount.value));
        historyPayments.push(payments);
        payForm.reset();
        alert("Pago exitoso!!")
        balance -= payments.amount
        accountBalance.innerText = balance +".00";
    
        const historialPayments = document.querySelector("#historyPayments")
        const li = document.createElement("li")
        li.className = "pagos";
        li.innerHTML = `* Descripcion: ${payments.name} Cantidad pagada: $${payments.amount}`
        historialPayments.append(li);
        }
    } else {
        alert("Favor de llenar todos los campos")
    }
})

