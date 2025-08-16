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