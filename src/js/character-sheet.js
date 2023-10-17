$(document).ready(function () {
    $("#current-year").text(new Date().getFullYear());

    // Dark mode.
    const savedTheme = sessionStorage.getItem('theme');
    if (savedTheme) {
        $('html').attr('data-bs-theme', savedTheme);
        $('#darkModeSwitch').prop('checked', savedTheme === 'dark');
    }
    $('#darkModeSwitch').change(function () {
        const isDarkMode = $(this).prop('checked');
        $('html').attr('data-bs-theme', isDarkMode ? 'dark' : 'light');
        sessionStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
    
    const exprBtn = $("#export");
    const charList = $("#charList");
    const showChar = $("#showChar");

    exprBtn.on("click", function (e) {
        // Inicializando o toast.
        const toastNoName = $("#noNameToast");
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastNoName);

        if ($("#name").val() == "") {
            $("#noNameToast .toast-body").text("O Nome do Personagem deve ser preenchido para a indexação. Por favor, preencha com um nome para que a ficha possa ser salva.");
            toastBootstrap.show();
        } else {
            // Indexando as informações da ficha.
            const formData = {
                acroSkill: $("#acroSkill").prop("checked"),
                alignment: $("#alignment").val(),
                animSkill: $("#animSkill").prop("checked"),
                arcaSkill: $("#arcaSkill").prop("checked"),
                armorClass: $("#armorClass").val(),
                athlSkill: $("#athlSkill").prop("checked"),
                attacks: $("#attacks").val(),
                background: $("#background").val(),
                bonds: $("#bonds").val(),
                cantrip: $("#cantrip").val(),
                charClass: $("#charClass").val(),
                chaSave: $("#chaSave").prop("checked"),
                chaValue: $("#chaValue").val(),
                conSave: $("#conSave").prop("checked"),
                conValue: $("#conValue").val(),
                CP: $("#CP").val(),
                currentHitDice: $("#currentHitDice").val(),
                currentHP: $("#currentHP").val(),
                deceSkill: $("#deceSkill").prop("checked"),
                dexSave: $("#dexSave").prop("checked"),
                dexValue: $("#dexValue").val(),
                EP: $("#EP").val(),
                equipment: $("#equipment").val(),
                exp: $("#exp").val(),
                failures: $("#failures").val(),
                feaTraits: $("#feaTraits").val(),
                flaws: $("#flaws").val(),
                GP: $("#GP").val(),
                histSkill: $("#histSkill").prop("checked"),
                ideals: $("#ideals").val(),
                initiative: $("#initiative").val(),
                insiSkill: $("#insiSkill").prop("checked"),
                inspiration: $("#inspiration").hasClass("active"),
                intiSkill: $("#intiSkill").prop("checked"),
                intSave: $("#intSave").prop("checked"),
                intValue: $("#intValue").val(),
                inveSkill: $("#inveSkill").prop("checked"),
                magicLv1: $("#magicLv1").val(),
                magicLv2: $("#magicLv2").val(),
                magicLv3: $("#magicLv3").val(),
                magicLv4: $("#magicLv4").val(),
                magicLv5: $("#magicLv5").val(),
                magicLv6: $("#magicLv6").val(),
                magicLv7: $("#magicLv7").val(),
                magicLv8: $("#magicLv8").val(),
                magicLv9: $("#magicLv9").val(),
                maxHP: $("#maxHP").val(),
                mediSkill: $("#mediSkill").prop("checked"),
                name: $("#name").val(),
                natuSkill: $("#natuSkill").prop("checked"),
                passivePerc: $("#passivePerc").val(),
                percSkill: $("#percSkill").prop("checked"),
                perfSkill: $("#perfSkill").prop("checked"),
                personalityTraits: $("#personalityTraits").val(),
                persSkill: $("#persSkill").prop("checked"),
                player: $("#player").val(),
                PP: $("#PP").val(),
                proficiencies: $("#proficiencies").val(),
                proficiencyBonus: $("#proficiencyBonus").val(),
                race: $("#race").val(),
                reliSkill: $("#reliSkill").prop("checked"),
                sleiSkill: $("#sleiSkill").prop("checked"),
                SP: $("#SP").val(),
                speed: $("#speed").val(),
                steaSkill: $("#steaSkill").prop("checked"),
                strSave: $("#strSave").prop("checked"),
                strValue: $("#strValue").val(),
                successes: $("#successes").val(),
                survSkill: $("#survSkill").prop("checked"),
                tempHP: $("#tempHP").val(),
                totalHitDice: $("#totalHitDice").val(),
                wisSave: $("#wisSave").prop("checked"),
                wisValue: $("#wisValue").val(),
            };

            localStorage.setItem(formData.name, JSON.stringify(formData));
            loadChars();
            $("#noNameToast .toast-body").text("Ficha salva.");
            toastBootstrap.show();
        }
    });

    $("#deleteChar").on("click", () => {
        const radioElement = $('input[name="charRadio"]:checked');
        if (radioElement.length > 0) {
            const selectedChar = radioElement.val();
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
        charList.empty();

        const fichas = Object.keys(localStorage);
        fichas.forEach(function (ficha) {
            const radioDiv = $("<div class='form-check'></div>");
            const radioInput = $("<input class='form-check-input' type='radio' name='charRadio'>")
                .val(ficha)
                .attr("id", `ficha-${ficha}`);
            const label = $(`<label class='form-check-label' for='ficha-${ficha}'>${ficha}</label>`);

            radioDiv.append(radioInput);
            radioDiv.append(label);
            charList.append(radioDiv);
        });
    }

    loadChars();

    showChar.on("click", function (e) {
        const ratioSelect = document.querySelector('input[name="charRadio"]:checked');
        if (ratioSelect) {
            const selectedChar = ratioSelect.value;
            const jsonData = localStorage.getItem(selectedChar);
            const charData = JSON.parse(jsonData);

            // Preenchendo o formulário com os dados da ficha.
            for (const key in charData) {
                if (charData.hasOwnProperty(key)) {
                    const element = $(`#${key}`);
                    if (element.length > 0) {
                        if (element.attr("type") === "checkbox") {
                            element.prop("checked", charData[key]);
                        } else if (element.attr("type") !== "button") {
                            element.val(charData[key]);
                        } else if (charData[key]) {
                            element.addClass("active");
                        } else {
                            element.removeClass("active");
                        }
                    }
                }
            }
            console.log(`Ficha "${selectedChar}" importada com sucesso.`);
        } else {
            console.log("Nenhuma ficha selecionada para importar.");
        }
    });
});
