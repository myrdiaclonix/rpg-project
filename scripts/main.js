// Obtém o ano atual e insere no elemento com o ID "currentYear"
$("#current-year").text(new Date().getFullYear());

// News Toast
function runToast() {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("#my-toast"));
  toastBootstrap.show();
}

// Dice Roller
function diceRoll() {
  var diceResult = $("#dice-result");
  var inputDice = $("#input-dice").val();
  var rolls = inputDice.split("+");
  var result = 0;
  var resultText = "";

  for (var i = 0; i < rolls.length; i++) {
    var roll = rolls[i].trim();
    var diceParts = roll.split("d");
    var numDice = parseInt(diceParts[0]);
    var numSides = parseInt(diceParts[1]);

    if (isNaN(numSides)) {
      result += parseInt(roll);
      resultText += roll + " + ";
    } else {
      var rollResults = [];
      for (var j = 0; j < numDice; j++) {
        var rollResult = Math.floor(Math.random() * numSides) + 1;
        rollResults.push(rollResult);
        result += rollResult;
      }
      resultText += roll + " (" + rollResults.join(", ") + ") + ";
    }
  }

  resultText = resultText.slice(0, -3);
  diceResult.val(resultText + " = " + result);
}

$(document).ready(() => {
  $("#input-dice").on("keyup", (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      diceRoll();
    }
  });
  $("#roll-btn").click(() => {
    diceRoll();
  });
});
