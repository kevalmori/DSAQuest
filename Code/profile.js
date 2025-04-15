async function fetchCodeforcesUserInfo(username) {
  const url = `https://codeforces.com/api/user.info?handles=${username}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      const user = data.result[0];
      document.getElementById("container").innerHTML = `
                <div id="Username">Username: ${user.handle}</div>
                <div id="Rank">Rank: ${user.rank}</div>
                <div id="Current Rating">Current Rating: ${user.rating}</div>
                <div id="Max Rating">Max Rating: ${user.maxRating}</div>
            `;
    } else {
      console.log("Account not found !!");
      return;
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
}

async function fetchCodeforcesData(username) {
  const url = `https://codeforces.com/api/user.status?handle=${username}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      const problemsSet = new Set();
      const ratingCounts = {};
      const QuestionTags = {};

      data.result.forEach((submission) => {
        if (submission.verdict === "OK") {
          problemsSet.add(submission.problem.name);
          const rating = submission.problem.rating;
          ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;

          const tags = submission.problem.tags;
          for (tag of tags) {
            QuestionTags[tag] = (QuestionTags[tag] || 0) + 1;
          }
        }
      });

      document.getElementById("container").innerHTML += `
                <div id="Total">Total Solved Problems: ${problemsSet.size}</div>
            `;

      createChart(ratingCounts);

      createPie(QuestionTags);
    } else {
      console.log("Account Not Found !!");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function createChart(ratingCounts) {
  const ctx = document.getElementById("cfChart").getContext("2d");
  const labels = Object.keys(ratingCounts).sort((a, b) => a - b);
  const values = labels.map((rating) => ratingCounts[rating]);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Problems Solved",
          data: values,
          backgroundColor: labels.map((rating) =>
            rating >= 1200 ? "lightgreen" : "gray"
          ),
          borderColor: "black",
          borderWidth: 1,
        },
      ],
    },
    options: { responsive: true, scales: { y: { beginAtZero: true } } },
  });
}

function createPie(QuestionTags) {
  const ctx = document.getElementById("PieChart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(QuestionTags),
      datasets: [
        {
          data: Object.values(QuestionTags),
          backgroundColor: [
            "#ff6384",
            "#36a2eb",
            "#ffce56",
            "#4bc0c0",
            "#9966ff",
            "#ff9f40",
          ],
          borderColor: "#ffffff",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: { size: 14 },
          },
        },
      },
    },
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  let userkey = sessionStorage.getItem("userkey");
  username=  localStorage.getItem(userkey+"Cf");

  await fetchCodeforcesUserInfo(username);
  await fetchCodeforcesData(username);
});
