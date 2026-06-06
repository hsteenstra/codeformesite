function answer(correct){

    const feedback = document.getElementById("feedback");

    if(correct){
        feedback.innerHTML = "🎉 Correct! HTML builds structure.";
        feedback.className = "correct";

        setTimeout(() => {
            alert("🏆 Badge Unlocked: HTML Explorer!");
        }, 400);

    } else {
        feedback.innerHTML = "❌ Not quite — try again.";
        feedback.className = "wrong";
    }
}
