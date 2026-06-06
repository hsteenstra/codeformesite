function openApp(type){
    const windowEl = document.getElementById("window");
    const content = document.getElementById("content");
    const title = document.getElementById("title");

    windowEl.classList.remove("hidden");

    if(type === "html"){
        title.innerText = "HTML Harbor";

        content.innerHTML = `
        <div class="chat">

            <div class="msg ai">
                Welcome to HTML Harbor. Ready to learn how websites are built?
            </div>

            <div class="msg user">
                Yeah, but I don't really get how it works yet.
            </div>

            <div class="msg ai">
                Think of HTML like the skeleton of a website. It holds everything in place.
            </div>

        </div>

        <h3>🎬 Watch</h3>
        <iframe width="100%" height="200"
        src="https://www.youtube.com/embed/UB1O30fR-EE"
        allowfullscreen></iframe>

        <h3>🧠 Quiz 1</h3>
        <p>What does HTML do?</p>
        <button onclick="quiz(true,this)">Structure</button>
        <button onclick="quiz(false,this)">Style</button>
        <button onclick="quiz(false,this)">Logic</button>

        <h3>🧠 Quiz 2</h3>
        <p>Who created HTML?</p>
        <button onclick="quiz(true,this)">Tim Berners-Lee</button>
        <button onclick="quiz(false,this)">Steve Jobs</button>
        <button onclick="quiz(false,this)">Bill Gates</button>

        <h3>🧠 Quiz 3</h3>
        <p>What tag creates a paragraph?</p>
        <button onclick="quiz(true,this)">&lt;p&gt;</button>
        <button onclick="quiz(false,this)">&lt;h1&gt;</button>
        <button onclick="quiz(false,this)">&lt;img&gt;</button>
        `;
    }

    if(type === "css"){
        title.innerText = "CSS City";

        content.innerHTML = `
        <div class="chat">
            <div class="msg ai">CSS controls how things look.</div>
            <div class="msg ai">Color, spacing, layout — all CSS.</div>
        </div>

        <h3>🎬 Watch</h3>
        <iframe width="100%" height="200"
        src="https://www.youtube.com/embed/yfoY53QXEnI"
        allowfullscreen></iframe>

        <h3>🧠 Quiz</h3>
        <p>What does CSS control?</p>
        <button onclick="quiz(true,this)">Design</button>
        <button onclick="quiz(false,this)">Data</button>
        <button onclick="quiz(false,this)">Logic</button>
        `;
    }
}

function quiz(correct, btn){
    if(correct){
        btn.style.background = "#4cff9a";
        btn.innerText = "Correct!";
    } else {
        btn.style.background = "#ff4c4c";
        btn.innerText = "Try again";
    }
}

function closeWindow(){
    document.getElementById("window").classList.add("hidden");
}
