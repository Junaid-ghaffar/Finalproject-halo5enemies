const apiUrl = "https://www.haloapi.com/metadata/h5/metadata/enemies";
const apiKey = "8d903eb0ea2445e5beb0ede1d5c552f2";

const enemyDescriptions = {
  "2625192795": "Grunts are the backbone of the Covenant's military force. They rely on numbers and can be dangerous when in large groups.",
  "2631958027": "Crawlers are fast-moving Promethean units. Agile and relentless, they swarm their targets to overwhelm them.",
  "123080854": "Knights are heavily armed Promethean commanders, known for their resilience and powerful attacks.",
  "3134866799": "Jackals are Covenant sharpshooters equipped with energy shields. They are cunning and excel at ambushes.",
  "3802316732": "Hunters are massive, armored Covenant units. They operate in pairs and wield devastating plasma cannons.",
  "3843549056": "Watchers are flying Promethean units that provide support by shielding allies and reviving fallen ones.",
  "3541732101": "Warden Eternal is the Promethean overseer, a powerful and enigmatic foe with immense strength and skill.",
  "724440388": "UNSC Marines are courageous soldiers fighting to protect humanity. They are versatile and skilled in combat.",
  "2957796559": "Elites are the leaders of Covenant ground forces. Intelligent and deadly, they are formidable opponents.",
  "2497647768": "Promethean Soldiers are hybrid units blending human and machine traits. They are versatile infantry units.",
  "1102617398": "Grunt Mechs are experimental units that combine Grunt infantry with mechanized combat power.",
  "3207900961": "Wasps are Covenant aerial units that provide reconnaissance and air support in battle.",
};

const enemyWeaknesses = {
  "2625192795": "Aim for the head or use explosives to take out groups.",
  "2631958027": "Use rapid-fire weapons to counter their speed.",
  "123080854": "Target their glowing core to deal critical damage.",
  "3134866799": "Shoot around their shields or aim for their exposed hand.",
  "3802316732": "Aim for their exposed orange core or use explosives.",
  "3843549056": "Destroy their drones quickly to disable their support abilities.",
  "3541732101": "Focus on avoiding his heavy attacks and use power weapons.",
  "724440388": "Use plasma weapons for shields and bullets for health.",
  "2957796559": "Plasma weapons are effective against their shields.",
  "2497647768": "Aim for their head or use precision weapons for faster kills.",
  "1102617398": "Attack from behind to bypass their armor.",
  "3207900961": "Use precision weapons to counter their maneuverability.",
};

const enemyDetailsDiv = document.getElementById("enemy-details");
const urlParams = new URLSearchParams(window.location.search);
const enemyId = urlParams.get("id");

if (!enemyDetailsDiv) {
  console.log("Missing element with ID 'enemy-details'.");
} else if (!enemyId) {
  enemyDetailsDiv.innerHTML = `
    <div style="text-align: center; color: red;">
      No enemy ID provided in the URL.
    </div>
  `;
} else {
  fetchEnemyDetails(enemyId);
}

async function fetchEnemyDetails(id) {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        "Accept-Language": "en",
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": apiKey,
      },
    });

    if (response.ok) {
      const enemies = await response.json();
      const enemy = enemies.find((e) => e.id === id);

      if (!enemy) {
        throw new Error("Enemy not found.");
      }

      enemy.description = enemyDescriptions[id] || "Description not available.";
      enemy.weakness = enemyWeaknesses[id] || "Weakness not available.";
      displayEnemyDetails(enemy);
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.log("Failed to fetch enemy details:", error);
    if (enemyDetailsDiv) {
      enemyDetailsDiv.innerHTML = `
        <div style="text-align: center; color: red;">
          Could not load enemy details. Please try again later.
        </div>
      `;
    }
  }
}

function displayEnemyDetails(enemy) {
  if (!enemyDetailsDiv) return;

  enemyDetailsDiv.innerHTML = `
    <div class="card" style="max-width: 600px; margin: 20px auto; text-align: center;">
      <img src="${enemy.largeIconImageUrl}" alt="${enemy.name}" class="card-img-top">
      <div class="card-body">
        <h2>${enemy.name}</h2>
        <p><b>Faction:</b> ${enemy.faction || "Unknown"}</p>
        <p>${enemy.description}</p>
        <p><b>Weakness:</b> ${enemy.weakness}</p>
      </div>
    </div>
  `;
}
