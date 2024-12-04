document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = 'https://www.haloapi.com/metadata/h5/metadata/enemies';
  const apiKey = '8d903eb0ea2445e5beb0ede1d5c552f2';
  const enemiesContainer = document.getElementById('enemies-container');

  async function fetchEnemies() {
    try {
      const response = await fetch(apiUrl, {
        headers: {
          'Accept-Language': 'en',
          'Cache-Control': 'no-cache',
          'Ocp-Apim-Subscription-Key': apiKey,
        },
      });

      if (response.ok) {
        const enemies = await response.json();
        showEnemies(enemies);
      } else {
        throw new Error('Failed to fetch enemies');
      }
    } catch (err) {
      console.log('Error fetching enemies:', err);
      if (enemiesContainer) {
        enemiesContainer.innerHTML = `
          <div style="text-align: center; color: red;">
            Could not load enemy data. Try refreshing the page.
          </div>
        `;
      }
    }
  }

  function showEnemies(enemies) {
    if (!enemiesContainer) {
      console.log('Container not found.');
      return;
    }

    if (!enemies || enemies.length === 0) {
      enemiesContainer.innerHTML = `
        <div style="text-align: center; color: yellow;">
          No enemies available at the moment.
        </div>
      `;
      return;
    }

    let html = '';
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];
      html += `
        <div class="enemy-card">
          <h2>${enemy.name}</h2>
          <img src="${enemy.largeIconImageUrl}" alt="${enemy.name}" style="width: 100%;">
          <p><b>Faction:</b> ${enemy.faction || 'Unknown'}</p>
          <a href="details.html?id=${enemy.id}" class="btn">View Details</a>
        </div>
      `;
    }

    enemiesContainer.innerHTML = html;
  }

  fetchEnemies();
});
