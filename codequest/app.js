function openApp(type) {

  const window = document.getElementById("window");
  const content = document.getElementById("content");
  const title = document.getElementById("title");

  window.classList.remove("hidden");

  if (type === "html") {
    title.innerText = "HTML Harbor";

    content.innerHTML = `
      <div class="block">
        HTML is the structure of the web. It tells the browser what exists on a page.
      </div>

      <div class="block">
        Created in 1989 by Tim Berners-Lee to structure early internet documents.
      </div>

      <div class="block">
        <iframe width="100%" height="200"
        src="https://www.youtube.com/embed/UB1O30fR-EE"
        allowfullscreen></iframe>
      </div>

      <div class="block">
        <strong>Quiz 1:</strong> What does HTML do?

        <div class="option" onclick="check(this,true)">Structures content</div>
        <div class="option" onclick="check(this,false)">Styles content</div>
        <div class="option" onclick="check(this,false)">Stores data</div>
      </div>

      <div class="block">
        <strong>Quiz 2:</strong> What tag makes a paragraph?

        <div class="option" onclick="check(this,true)">&lt;p&gt;</div>
        <div class="option" onclick="check(this,false)">&lt;h1&gt;</div>
        <div class="option" onclick="check(this,false)">&lt;img&gt;</div>
      </div>

      <div class="block">
        <strong>Quiz 3:</strong> Who created HTML?

        <div class="option" onclick="check(this,true)">Tim Berners-Lee</div>
        <div class="option" onclick="check(this,false)">Steve Jobs</div>
        <div class="option" onclick="check(this,false)">Bill Gates</div>
      </div>
    `;
  }

  if (type === "css") {
    title.innerText = "CSS City";

    content.innerHTML = `
      <div class="block">
        CSS controls design: colors, layout, spacing, and visual structure.
      </div>

      <div class="block">
        <iframe width="100%" height="200"
        src="https://www.youtube.com/embed/yfoY53QXEnI"
        allowfullscreen></iframe>
      </div>

      <div class="block">
        <strong>Quiz:</strong> What does CSS control?

        <div class="option" onclick="check(this,true)">Design</div>
        <div class="option" onclick="check(this,false)">Logic</div>
        <div class="option" onclick="check(this,false)">Data</div>
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
