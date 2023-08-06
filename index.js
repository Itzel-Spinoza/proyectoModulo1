var cuentas = [
    { nombre: "Itzel", saldo: 200, contraseña: "1234" },
    { nombre: "Gera", saldo: 290, contraseña: "5678" },
    { nombre: "Marlene", saldo: 67, contraseña: "9012" }
  ];
  var selectedAccount = null;
  
  function login() {
    var password = document.getElementById("password").value;
    var accountIndex = document.getElementById("cuentasSelect").value;
  
    if (cuentas[accountIndex] && password === cuentas[accountIndex].contraseña) {
      selectedAccount = accountIndex;
      document.getElementById("nombrePersona").textContent = cuentas[accountIndex].nombre;
      document.getElementById("acciones").style.display = "block";
      document.getElementById("resultado").style.display = "none";
    } else {
      alert("Contraseña incorrecta. Intenta nuevamente.");
    }
  }
  
  function consultarSaldo() {
    showResult("Saldo actual de " + cuentas[selectedAccount].nombre + ": $" + cuentas[selectedAccount].saldo);
  }
  
  function ingresarMonto() {
    var amount = Float(prompt("Ingresa el monto a ingresar:"));
  
    if (!isNaN(amount) && amount > 0) {
      var newBalance = cuentas[selectedAccount].saldo + amount;
      if (newBalance <= 990) {
        cuentas[selectedAccount].saldo = newBalance;
        showResult("Monto ingresado: $" + amount + "<br>Saldo total de " + cuentas[selectedAccount].nombre + ": $" + cuentas[selectedAccount].saldo);
      } else {
        alert("El saldo máximo permitido es $990.");
      }
    } else {
      alert("Monto inválido.");
    }
  }
  
  function retirarMonto() {
    var amount = Float(prompt("Ingresa el monto a retirar:"));
  
    if (!isNaN(amount) && amount > 0) {
      var newBalance = cuentas[selectedAccount].saldo - amount;
      if (newBalance >= 10) {
        cuentas[selectedAccount].saldo = newBalance;
        showResult("Monto retirado: $" + amount + "<br>Saldo total de " + cuentas[selectedAccount].nombre + ": $" + cuentas[selectedAccount].saldo);
      } else {
        alert("El saldo mínimo permitido es $10.");
      }
    } else {
      alert("Monto inválido.");
    }
  }
  
  function showResult(message) {
    document.getElementById("resultado").innerHTML = message;
    document.getElementById("resultado").style.display = "block";
  }