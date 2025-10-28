const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const weightEl = document.getElementById("weight");
const heightEl = document.getElementById("height");
const typesEl = document.getElementById("types");

const hpEl = document.getElementById("hp");
const attackEl = document.getElementById("attack");
const defenseEl = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDefense = document.getElementById("special-defense");
const speedEl = document.getElementById("speed");

const descriptionContainer = document.getElementById("description-container");

const fetchData = async () => {
  try {
    const value = searchInput.value.toLowerCase();
    const res = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${value}`);
    const data = await res.json();
    displayCreature(data);
    TypeColorChanger();
  } catch (err) {
    alert("Creature not found");
    console.log(err);
  }
};

const displayCreature = (data) => {
  const {id, name, weight, height, special, stats, types} = data;
  creatureName.textContent = `${name[0].toUpperCase() + name.slice(1)}`;
  creatureId.textContent = `#${id}`;
  weightEl.textContent = `Weight: ${weight}`;
  heightEl.textContent = `Height: ${height}`;

  stats.map((item)=>{
    const {base_stat, name} = item;
    switch(name){
      case "hp":
      hpEl.textContent = base_stat;
      break;
      case "attack":
      attackEl.textContent = base_stat;
      break;
      case "defense":
      defenseEl.textContent = base_stat;
      break;
      case "special-attack":
      spAttack.textContent = base_stat;
      break;
      case "special-defense":
      spDefense.textContent = base_stat;
      break;
      case "speed":
      speedEl.textContent = base_stat;
      break;
    }
  })

  typesEl.innerHTML = types.map((type)=>{
    const {name} = type;
    return `<button class="span">${name.toUpperCase()}</button>`
  })

  const{name:specialName, description} = special;
  descriptionContainer.innerHTML = `
    <h3>${specialName}</h3>
    <p class="description">${description}</p>
  `
  searchInput.value = "";
  descriptionContainer.style.display = "block";
};
searchBtn.addEventListener("click", (event)=>{
  event.preventDefault();
  fetchData();
});

function handleKeyPress(event) {
  if (event.key === "Enter") {
    fetchData();
  }
}

searchInput.addEventListener("keypress", handleKeyPress);

const TypeColorChanger = () => {
  const hexChars = "0123456789ABCDEF";
  const spans = document.querySelectorAll(".span");

  spans.forEach(span => {
    let color = "#";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * 16);
      color += hexChars[randomIndex];
    }
    span.style.backgroundColor = color;
  });
};
