<script>

    import { base } from "$app/paths";
    let score = 0;
    let step = 0;
    import confetti from 'canvas-confetti';
    import Banner from "$lib/banner.svelte";

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

        if (step === quizQuestions.length && score === quizQuestions.length) {
            confetti({
                particleCount: 150,
                spread: 90,
                origin: { y: 0.6 }
            });
        }

    }

    function resetQuiz() {
        score = 0;
        step = 0;
    }

</script>

  <Banner />

<style>
    .container {
        max-width: 800px;
        margin: 60px auto;
        padding: 30px;
        background-color: #eaf8e2;
        text-align: center;
        border-radius: 10px;
        font-family: 'Nata Sans', sans-serif;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    h2 {
        color: #1d411d;
        margin-bottom: 50px;
        font-size: 30px;
    }

    h1 {
        color: #1d411d;
        margin-bottom: 20px;
        font-size: 45px;
    }

    button {
        background-color: #76b49d;
        color: white;
        border: none;
        padding: 15px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.2s ease;
        font-family: 'Nata Sans', sans-serif;
        font-size: 20px;
        margin: 5px;
    }

    .options {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 30px;
    }

    button:hover {
        background-color: #5e9a85;
    }

    .turtle-div {
        display: inline-block;
    }

    .turtle-graphic {
        width: 200px;
        height: auto;
        margin: 20px auto;
        display: block;
        animation: swim 3s ease-in-out infinite alternate;
        transition: transform 0.3s ease, filter 0.3s ease;
    }

    .turtle-graphic:hover {
        transform: scale(2);
        filter: brightness(1.5);
    }

    @keyframes swim {
        0% {
            transform: translate(0, 0) rotate(0deg);
        }
        50% {
            transform: translate(20px, -5px) rotate(3deg);
        }
        100% {
            transform: translate(-20px, 5px) rotate(-3deg);
        }
    }

    a {
        display: inline-block;
        margin-top: 20px;
        text-decoration: none;
        color: #467446;
        font-weight: bold;
    }

    @keyframes turtlePop {
        0%   { transform: scale(1) rotate(0deg); }
        30%  { transform: scale(1.4) rotate(10deg); }
        60%  { transform: scale(0.9) rotate(-5deg); }
        100% { transform: scale(1) rotate(0deg); }
    }

    .turtle-graphic.clicked {
        animation: turtlePop 0.8s ease;
    }

</style>


<svelte:head>
    <title>Sea Turtles</title>
</svelte:head>

<div class="container">
    <h1>Sea Turtle Quiz</h1>
    <div class="turtle-div">
        <img 
            src="/Turtles/turtle.png" 
            alt="Turtle" 
            class="turtle-graphic" 
            style="transform: translate({$turtleX}px, {$turtleY}px);"
            on:click={turtleClicked}
        />
    </div>

    {#if step < quizQuestions.length}
        <h2>{quizQuestions[step].question}</h2>
        <div class="options">
            {#each quizQuestions[step].options as option, index}
                <button on:click={() => answerQuestion(index)}>{option}</button>
            {/each}
        </div>

    {:else}
        <h2>Your Score: {score} out of {quizQuestions.length}</h2>
        <button on:click={resetQuiz}>Restart Quiz</button>
        <a href="{base}/">← Back Home</a>
    {/if}
</div>