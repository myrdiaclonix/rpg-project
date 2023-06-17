function diceRoll() {
  var diceResult = $("#dice-out");
  var inputDice = $("#dice-inp").val();
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
  $("#dice-inp").on("keyup", (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      diceRoll();
    }
  });
  $("#roll-btn").click(() => {
    diceRoll();
  });
});
