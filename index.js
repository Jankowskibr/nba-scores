document.addEventListener("DOMContentLoaded", () => {
  const url = "https://nba-scores-worker.jankowskibr.workers.dev/scores";
  const scoresDiv = document.getElementById("scores");

  console.log("Fetching from:", url);

  fetch(url)
    .then(res => {
      console.log("Raw response:", res);
      return res.text(); // read the response as plain text for debugging
    })
    .then(text => {
      console.log("Raw text body:", text);

      try {
        const data = JSON.parse(text);

        if (data.games && data.games.length > 0) {
          data.games.forEach(game => {
            const p = document.createElement("p");
            p.textContent = `${game.home_team.full_name} ${game.home_team_score} - ${game.visitor_team.full_name} ${game.visitor_team_score}`;
            scoresDiv.appendChild(p);
          });
        } else {
          scoresDiv.textContent = "No games found.";
        }
      } catch (err) {
        console.error("JSON parse error:", err);
        scoresDiv.textContent = "Error loading scores.";
      }
    })
    .catch(err => {
      console.error("Fetch error:", err);
      scoresDiv.textContent = "Failed to fetch scores.";
    });
});
