document.addEventListener("DOMContentLoaded", function () {
    const expBtn = document.getElementById("export");
    const charList = document.getElementById("charList");
    const showChar = document.getElementById("showChar");

    // Inicializando o modal.
    const importModal = new bootstrap.Modal(document.getElementById("importModal"));

    expBtn.addEventListener("click", function (e) {
        if (document.getElementById("name").value == "") {
            alert("O Nome do Personagem deve ser preenchido para a indexação. Por favor, preencha com um nome para que a ficha possa ser salva.");
        } else {
            // Indexando as informações da ficha.
            const formData = {
                name: document.getElementById("name").value,
                charClass: document.getElementById("charClass").value,
                background: document.getElementById("background").value,
                player: document.getElementById("player").value,
                race: document.getElementById("race").value,
                alignment: document.getElementById("alignment").value,
                exp: document.getElementById("exp").value,
                strValue: document.getElementById("strValue").value,
                dexValue: document.getElementById("dexValue").value,
                conValue: document.getElementById("conValue").value,
                intValue: document.getElementById("intValue").value,
                wisValue: document.getElementById("wisValue").value,
                chaValue: document.getElementById("chaValue").value,
                inspiration: document.getElementById("inspiration").classList.contains("active"),
                proficiencyBonus: document.getElementById("proficiencyBonus").value,
                passivePerc: document.getElementById("passivePerc").value,
                strSave: document.getElementById("strSave").checked,
                dexSave: document.getElementById("dexSave").checked,
                conSave: document.getElementById("conSave").checked,
                intSave: document.getElementById("intSave").checked,
                wisSave: document.getElementById("wisSave").checked,
                chaSave: document.getElementById("chaSave").checked,
                acroSkill: document.getElementById("acroSkill").checked,
                arcaSkill: document.getElementById("arcaSkill").checked,
                athlSkill: document.getElementById("athlSkill").checked,
                perfSkill: document.getElementById("perfSkill").checked,
                deceSkill: document.getElementById("deceSkill").checked,
                steaSkill: document.getElementById("steaSkill").checked,
                histSkill: document.getElementById("histSkill").checked,
                intiSkill: document.getElementById("intiSkill").checked,
                insiSkill: document.getElementById("insiSkill").checked,
                inveSkill: document.getElementById("inveSkill").checked,
                animSkill: document.getElementById("animSkill").checked,
                mediSkill: document.getElementById("mediSkill").checked,
                natuSkill: document.getElementById("natuSkill").checked,
                percSkill: document.getElementById("percSkill").checked,
                persSkill: document.getElementById("persSkill").checked,
                sleiSkill: document.getElementById("sleiSkill").checked,
                reliSkill: document.getElementById("reliSkill").checked,
                survSkill: document.getElementById("survSkill").checked,
                armorClass: document.getElementById("armorClass").value,
                initiative: document.getElementById("initiative").value,
                speed: document.getElementById("speed").value,
                maxHP: document.getElementById("maxHP").value,
                tempHP: document.getElementById("tempHP").value,
                currentHP: document.getElementById("currentHP").value,
                totalHitDice: document.getElementById("totalHitDice").value,
                currentHitDice: document.getElementById("currentHitDice").value,
                successes: document.getElementById("successes").value,
                failures: document.getElementById("failures").value,
                attacks: document.getElementById("attacks").value,
                CP: document.getElementById("CP").value,
                SP: document.getElementById("SP").value,
                EP: document.getElementById("EP").value,
                GP: document.getElementById("GP").value,
                PP: document.getElementById("PP").value,
                equipment: document.getElementById("equipment").value,
                personalityTraits: document.getElementById("personalityTraits").value,
                ideals: document.getElementById("ideals").value,
                bonds: document.getElementById("bonds").value,
                flaws: document.getElementById("flaws").value,
                feaTraits: document.getElementById("feaTraits").value
            };

            localStorage.setItem(formData.name, JSON.stringify(formData));
            loadChars();
            console.log("Ficha salva em local storage.");
        }
    });

    document.getElementById("deleteChar").addEventListener("click", () => {
        const radioElement = document.querySelector('input[name="charRadio"]:checked');
        if (radioElement) {
            const selectedChar = radioElement.value;
            if (confirm(`Você deseja excluir a ficha "${selectedChar}"?`)) {
                localStorage.removeItem(selectedChar);
                loadChars();
                console.log(`Ficha "${selectedChar}" excluída com sucesso.`);
            }
        } else {
            console.log("Nenhuma ficha selecionada para excluir.");
        }
    });

    function loadChars() {
        charList.innerHTML = "";

        const fichas = Object.keys(localStorage);
        fichas.forEach(function (ficha) {
            const radioDiv = document.createElement("div");
            radioDiv.classList.add("form-check");

            const radioInput = document.createElement("input");
            radioInput.classList.add("form-check-input")
            radioInput.type = "radio";
            radioInput.name = "charRadio";
            radioInput.value = ficha;
            radioInput.id = `ficha${ficha}`;

            const label = document.createElement("label");
            label.classList.add("form-check-label");
            label.setAttribute("for", `ficha${ficha}`);
            label.textContent = ficha;

            radioDiv.appendChild(radioInput);
            radioDiv.appendChild(label);
            charList.appendChild(radioDiv);
        });
    }

    loadChars();

    showChar.addEventListener("click", function (e) {
        const ratioSelect = document.querySelector('input[name="charRadio"]:checked');
        if (ratioSelect) {
            const selectedChar = ratioSelect.value;
            const jsonData = localStorage.getItem(selectedChar);
            const charData = JSON.parse(jsonData);

            // Preenchendo o formulário com os dados da ficha.
            for (const key in charData) {
                if (charData.hasOwnProperty(key)) {
                    const element = document.getElementById(key);
                    if (element) {
                        if (element.type === "checkbox") element.checked = charData[key];
                        else if (element.type !== "button") element.value = charData[key];
                        else if (charData[key]) element.classList.add("active");
                        else element.classList.remove("active");
                    }
                }
            }

            console.log(`Ficha "${selectedChar}" importada com sucesso.`);
        } else {
            console.log("Nenhuma ficha selecionada para importar.");
        }
    });
});
