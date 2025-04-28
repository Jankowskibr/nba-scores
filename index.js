document.addEventListener("DOMContentLoaded", () => {
  const url = "https://nba-scores-worker.jankowskibr.workers.dev/scores";
  const scoresDiv = document.getElementById("scores");

  console.log("Fetching from:", url);

  fetch(url)
    .then(res => {
      console.log("Raw response:", res);
      return res.json();
    })
    .then(data => {
      console.log("Fetched data:", data);

      // Check for data.games.data instead of data.games
      if (data && data.games && data.games.data && data.games.data.length > 0) {
        scoresDiv.innerHTML = ''; // Clear "Loading..." or previous content
        data.games.data.forEach(game => {
          const p = document.createElement("p");
          p.textContent = `${game.home_team.full_name} ${game.home_team_score} - ${game.visitor_team.full_name} ${game.visitor_team_score}`;
          scoresDiv.appendChild(p);
        });
      } else {
        console.log("No games in data.games.data:", data.games);
        scoresDiv.textContent = "No games found.";
      }
    })
    .catch(err => {
      console.error("Fetch error:", err);
      scoresDiv.textContent = "Failed to fetch scores.";
    });
});
