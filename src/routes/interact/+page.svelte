<script>
    let score = 0;
    let step = 0;
    
    const quizQuestions = [
        {
            question: "Which sea turtle species is the largest?",
            options: ["Loggerhead", "Leatherback", "Green", "Hawksbill"],
            answer: 1
        },
        {
            question: "Why do hatchlings often head in the wrong direction after hatching?",
            options: ["They are confused by artificial lights", "They are afraid of the ocean", "They get lost in sand", "They follow the scent of humans"],
            answer: 0
        },
        {
            question: "Which of the following is the biggest threat to sea turtles?",
            options: ["Fishing boat noise", "Plastic bait", "Too much algae", "Bycatch in fishing nets"],
            answer: 3
        },
        {
            question: "How can you help protect sea turtles?",
            options: ["Keep beaches clean", "Avoid plastic products", "Support turtle conservation programs", "All of the above"],
            answer: 3
        }
    ];

    function answerQuestion(option) {
        if(option === quizQuestions[step].answer) {
            score++;
        }
        step++;
    }

    function resetQuiz() {
        score = 0;
        step = 0;
    }

</script>

<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background-color: #eaf8e2;
        text-align: center;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    button {
        background-color: #76b49d;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }

    button:hover {
        background-color: #5e9a85;
    }

    .turtle-graphic {
        width: 200px;
        height: auto;
        margin: 20px auto;
    }

</style>


<svelte:head>
    <title>Sea Turtle Quiz</title>
    <link class="turtle-graphic" rel="icon" href="/path/to/turtle-icon.png" />
</svelte:head>

<div class="container">
    {#if step < quizQuestions.length}
        <h2>{quizQuestions[step].question}</h2>
        {#each quizQuestions[step].options as option}
            <button on:click={() => answerQuestion(option)}>{option}</button>
        {/each}
    {:else}
        <h2>Your Score: {score} out of {quizQuestions.length}</h2>
        <button on:click={resetQuiz}>Restart Quiz</button>
        <a href="/">← Back Home</a>
    {/if}
</div>