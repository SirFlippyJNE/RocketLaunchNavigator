const apiKey = '2578b44e83f2942913e1e7775ffdb3a9beed808d'; // Replace 'YOUR_API_KEY' with your actual API key
const apiUrl = `https://ll.thespacedevs.com/2.2.0/launch/upcoming/?api_key=${apiKey}`;

async function fetchRocketLaunches() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch data from the API');
    }
    const data = await response.json();
    if (data && data.results) {
      const launches = data.results.filter((launch) => launch.status.id !== 3);
      const launchDetails = launches.map((launch) => {
        const { name, net, pad, rocket, webcast_live, status } = launch;
        return `Rocket: ${rocket.configuration.full_name}<br>
                Mission Name: ${name}<br>
                Launch Time: ${net}<br>
                Status: ${status.abbrev}<br>
                Launch Pad: ${pad.name}<br>
                Pad Location: ${pad.location.name}<br>
                Webcast Live: ${webcast_live}<br>
                -----------------------------------<br>`;
      });
      return launchDetails.join('');
    } else {
      return 'No launch data available.';
    }
  } catch (error) {
    return `An error occurred while fetching the data: ${error}`;
  }
}

writeToPage(fetchRocketLaunches())
  .catch((error) => {
    console.log('An error occurred during execution:', error);
  });

async function writeToPage(contentPromise) {
  const content = await contentPromise;
  const paragraph = document.createElement('p');
  paragraph.innerHTML = content;
  document.body.appendChild(paragraph);
}

