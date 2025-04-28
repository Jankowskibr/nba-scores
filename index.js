document.addEventListener("DOMContentLoaded", () => {
  const getDateStr = (offsetDays) => {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);
    return date.toISOString().split('T')[0].replace(/-/g, ''); // e.g., "20250428"
  };

  const fetchGames = async (date) => {
    const url = `https://nba-scores-worker.jankowskibr.workers.dev/scores?date=${date}`;
    console.log("Fetching from:", url);
    try {
      const res = await fetch(url);
      console.log("Raw response:", res);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();
      console.log("Fetched data:", data);
      return data.games && data.games.data ? data.games.data : [];
    } catch (err) {
      console.error("Fetch error:", err);
      return [];
    }
  };

  const renderGames = (games, containerId, noGamesMessage) => {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear placeholder
    if (games.length > 0) {
      games.forEach(game => {
        const p = document.createElement("p");
        // For tonight's games, scores may not exist yet
        const homeScore = game.home_team_score || "TBD";
        const visitorScore = game.visitor_team_score || "TBD";
        p.textContent = `${game.home_team.full_name} ${homeScore} - ${game.visitor_team.full_name} ${visitorScore}`;
        container.appendChild(p);
      });
    } else {
      console.log(`No games in ${containerId}:`, games);
      container.textContent = noGamesMessage;
    }
  };

  // Fetch and render yesterday's games
  const yesterday = getDateStr(-1); // e.g., "20250427"
  fetchGames(yesterday).then(games => {
    renderGames(games, "yesterday-scores", "No games found for yesterday.");
  });

  // Fetch and render tonight's games
  const today = getDateStr(0); // e.g., "20250428"
  fetchGames(today).then(games => {
    renderGames(games, "tonight-scores", "No games scheduled for tonight.");
  });
});
