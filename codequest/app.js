function openApp(type) {

  const window = document.getElementById("window");
  const content = document.getElementById("content");
  const title = document.getElementById("title");

  window.classList.remove("hidden");

  if (type === "html") {
    title.innerText = "HTML Harbor";

    content.innerHTML = `
      <div class="lessonBlock">
        HTML is the structure of a webpage. It tells the browser what to display.
      </div>

      <div class="lessonBlock">
        History: Created by Tim Berners-Lee in 1989 to structure early web documents.
      </div>

      <div class="lessonBlock">
        Video:
        <iframe width="100%" height="200"
        src="https://www.youtube.com/embed/UB1O30fR-EE"
        allowfullscreen></iframe>
      </div>

      <div class="lessonBlock">
        Quiz 1: What does HTML do?

        <div class="option" onclick="check(this,true)">Creates structure</div>
        <div class="option" onclick="check(this,false)">Adds styling</div>
        <div class="option" onclick="check(this,false)">Stores data</div>
      </div>

      <div class="lessonBlock">
        Quiz 2: Which tag makes a paragraph?

        <div class="option" onclick="check(this,true)">&lt;p&gt;</div>
        <div class="option" onclick="check(this,false)">&lt;h1&gt;</div>
        <div class="option" onclick="check(this,false)">&lt;img&gt;</div>
      </div>

      <div class="lessonBlock">
        Quiz 3: Who created HTML?

        <div class="option" onclick="check(this,true)">Tim Berners-Lee</div>
        <div class="option" onclick="check(this,false)">Bill Gates</div>
        <div class="option" onclick="check(this,false)">Elon Musk</div>
      </div>
    `;
  }

  if (type === "css") {
    title.innerText = "CSS City";

    content.innerHTML = `
      <div class="lessonBlock">
        CSS controls the appearance of a website: colors, layout, spacing, design.
      </div>

      <div class="lessonBlock">
        Video:
        <iframe width="100%" height="200"
        src="https://www.youtube.com/embed/yfoY53QXEnI"
        allowfullscreen></iframe>
      </div>

      <div class="lessonBlock">
        Quiz 1: CSS controls what?

        <div class="option" onclick="check(this,true)">Design</div>
        <div class="option" onclick="check(this,false)">Logic</div>
        <div class="option" onclick="check(this,false)">Data storage</div>
      </div>

      <div class="lessonBlock">
        Quiz 2: What does CSS stand for?

        <div class="option" onclick="check(this,true)">Cascading Style Sheets</div>
        <div class="option" onclick="check(this,false)">Computer Style System</div>
        <div class="option" onclick="check(this,false)">Creative Style Syntax</div>
      </div>
    `;
  }

}

function check(el, correct) {
  if (correct) {
    el.classList.add("correct");
  } else {
    el.classList.add("wrong");
  }
}

function closeApp() {
  document.getElementById("window").classList.add("hidden");
}
