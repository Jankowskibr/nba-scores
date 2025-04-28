document.addEventListener("DOMContentLoaded", () => {
  const url = "https://nba-scores-worker.jankowskibr.workers.dev/scores";
  const scoresDiv = document.getElementById("scores");

  console.log("Fetching from:", url);

  fetch(url)
    .then(res => {
      console.log("Raw response:", res);
      return res.json(); // Directly parse as JSON (no need to use .text())
    })
    .then(data => {
      console.log("Fetched data:", data);  // Check the structure of the data

      if (data && data.games && data.games.length > 0) {
        // If there are games, display them
        data.games.forEach(game => {
          const p = document.createElement("p");
          p.textContent = `${game.home_team.full_name} ${game.home_team_score} - ${game.visitor_team.full_name} ${game.visitor_team_score}`;
          scoresDiv.appendChild(p);
        });
      } else {
        // If no games found
        scoresDiv.textContent = "No games found.";
      }
    })
    .catch(err => {
      console.error("Fetch error:", err);
      scoresDiv.textContent = "Failed to fetch scores.";
    });
});
