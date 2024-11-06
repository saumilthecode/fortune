document.getElementById("get-fortune").addEventListener("click", async function () {
    const fortuneText = document.getElementById("fortune-text");
    const asciiArt = document.getElementById("ascii-art");

    try {
      fortuneText.textContent = "Fetching your fortune...";
      asciiArt.textContent = "";

      // Fetching fortune and ASCII art
      const response = await fetch("api/fortune");
      const data = await response.json();

      if (response.ok) {
        fortuneText.textContent = data.fortune;
        asciiArt.textContent = data.ascii_art;
      } else {
        fortuneText.textContent = "Oops, something went wrong!";
      }
    } catch (error) {
      fortuneText.textContent = "Error fetching your fortune.";
    }
  });
