let nameCachedData = {};

async function readJson(file) {
  try {
    if (nameCachedData[file]) {
      return nameCachedData[file];
    }

    const response = await fetch(file);
    if (!response.ok) {
      throw new Error("Erro ao carregar arquivo JSON");
    }

    const jsonData = await response.json();
    const dataNames = jsonData.data;
    nameCachedData[file] = dataNames;

    return dataNames;
  } catch (error) {
    console.error("Erro ao ler o arquivo JSON:", error);
    return null;
  }
}

async function fetchNames(nameType) {
  let file = "";

  switch (nameType) {
    case "female":
      file = "../data/names_female.json";
      break;
    case "male":
      file = "../data/names_male.json";
      break;
    case "surnames":
      file = "../data/names_surname.json";
      break;
  }

  if (file === "") {
    return { data: [] };
  }

  return { data: await readJson(file) };
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

async function generateName(gender) {
  const firstNames = await fetchNames(gender || pickRandom(["female", "male"]));
  const lastNames = await fetchNames("surnames");

  const firstName = pickRandom(firstNames.data);
  const lastName = pickRandom(lastNames.data);

  return `${firstName} ${lastName}`;
}

$(document).ready(() => {
  $("#name-btn").click(async () => {
    const name = await generateName();
    $("#name-out").val(name);
  });
});
