const totalQuestions = {
    "Array": 36,            
    "Matrix": 10,            
    "String": 43,            
    "Searching & Sorting": 36,
    "LinkedList": 36,          
    "Binary Trees": 35,        
    "Binary Search Trees": 22, 
    "Greedy": 35,              
    "BackTracking": 19,        
    "Stacks & Queues": 38,     
    "Heap": 18,                
    "Graph": 44,               
    "Trie": 6,                 
    "Dynamic Programming": 60, 
    "Bit Manipulation": 10       
};

let userkey=sessionStorage.getItem("userkey"); 

let solved=0;

document.querySelector("table").addEventListener("click", function(event) {
    let clickedTd = event.target.closest("td"); 

    if (clickedTd) {
        let clickedSpan = clickedTd.querySelector("span"); 
        if (clickedSpan) {
            let topicName = clickedSpan.id; 

            if (topicName) {
                sessionStorage.setItem("CurrentTopic", topicName);
                window.location.href = "topic.html"; 
            }
        }
    }
});

function fillTopicCells() {
    let topicCells = document.querySelectorAll("td span");

    topicCells.forEach(span => {
        let topicName = span.id;
        if (topicName) {
            let checkedCount = localStorage.getItem(userkey+topicName + "_checkedCount") || 0;
            let questionText = checkedCount == 0 ? "You haven't started yet!" : `Questions Solved: ${checkedCount}`;

            let progress = Math.round((checkedCount / totalQuestions[topicName]) * 100) || 0;

            span.innerHTML = `
                <strong>${topicName}</strong><br>
                <span class="${topicName}" id="solveNow-${topicName}">Solve Now</span> 
                <span class="${topicName}" id="que-${topicName}">${questionText}</span> 
                <span class="${topicName}" id="Question-${topicName}">Total Questions: ${totalQuestions[topicName]}</span> 
                <span class="${topicName}" id="progress-${topicName}">Progress: ${progress}%</span>
            `;
            solved+=parseInt(checkedCount);
        }
    });
}

function myFunction(){
    let userkey = sessionStorage.getItem("userkey");

  const username = localStorage.getItem(userkey + "Cf");
  if (!username || username.trim() === "!!!gotoback!!!") {
    alert("No account found !!");
  }
  else window.location.href='profile.html'
}

document.addEventListener("DOMContentLoaded", function() {
    fillTopicCells();
    let progress =((solved /462) * 100) || 0;

    document.getElementById("totalQuestions").innerHTML="You solved total "+solved+" out of 462 Questions <span id='emoji'>😄</span> ( "+progress.toFixed(2)+" % )"; // Return
    +"% )";
    document.getElementById("globalProgressBar").style.width = progress + "%";
});
