//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();

  makePageForEpisodes(allEpisodes);
  setupSearch(allEpisodes); //update setup()
}

function setupSearch(allEpisodes) {
  const searchInput = document.getElementById("search");

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredEpisodes = allEpisodes.filter((episode) => {
      return (
        episode.name.toLowerCase().includes(searchTerm) ||
        episode.summary.toLowerCase().includes(searchTerm)
      );
    });

    makePageForEpisodes(filteredEpisodes);
  });
}

function makeEpisodeCode(season, episodeNumber) {
  season = String(season).padStart(2, "0");
  episodeNumber = String(episodeNumber).padStart(2, "0");
  const episodeCode = "S" + season + "E" + episodeNumber;
  return episodeCode;
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  // Goal: a function to create the page for the all episodes
  // get the data from the array episode
  // show number of episodes
  // loop through each episode and display information

  for (const episode of episodeList) {
    const episodeCards = document
      .getElementById("episode_cards_template")
      .content.cloneNode(true);
    const code = makeEpisodeCode(episode.season, episode.number);
    episodeCards.querySelector("#name").textContent = episode.name;

    // Make a use of the makeEpisodeCode for the episode number content
    episodeCards.querySelector("#EpisodeNumber").textContent = code;

    // get access to the image to assign the alt and src attributes
    const image = episodeCards.querySelector("#image");
    image.src = episode.image.medium;
    image.alt = `Scene from ${code},${episode.name}`;

    // get the summary of the episode
    episodeCards.querySelector("#summary").textContent = episode.summary;
    document.getElementById("root").append(episodeCards);
  }
}

window.onload = setup;
