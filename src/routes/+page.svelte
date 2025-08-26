<script lang="ts">
import { base } from "$app/paths";
import { onMount } from "svelte";
import Banner from "$lib/banner.svelte";

let loaded = false;
$state facts = [
    { title: "Loading...", description: "", icon: "", id: 0 }
];
$state currentFact = 0;
$state viewedFacts = new Set();
let totalFacts = 0;
$derived unlock = viewedFacts.size === totalFacts && totalFacts > 0;

let currentIndex = 0;
let messages = [
    "All sea turtle species are threatened or endangered.",
    "Only about 1 in 1,000 to 1 in 10,000 sea turtle hatchlings survive to adulthood.",
    "Plastic pollution is a major threat to sea turtles.",
    "Fishing nets accidentally trap and drown sea turtles."
];
let interval;

    .interactive-title:hover {
    fetch(`${base}/facts.json`)
        .then(res => res.json())
        .then(data => {
            facts = data;
            totalFacts = data.length;
            loaded = true;
        });

    interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % messages.length;
    }, 3000);

    return () => clearInterval(interval);
});

function nextFact() {
    if (totalFacts === 0) return;
    currentFact = (currentFact + 1) % totalFacts;
    viewedFacts = new Set(viewedFacts).add(currentFact);
}

function prevFact() {
    if (totalFacts === 0) return;
    currentFact = (currentFact - 1 + totalFacts) % totalFacts;
    viewedFacts = new Set(viewedFacts).add(currentFact);
}
</script>
        color: #467470;
        transform: scale(1.2);
    }

    /* .fact {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        background-color: #86a873;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    } */

    :global(body) {
        background-color: #b9d7aa;
        margin: 0;
        font-size: 20px;
        font-family: 'Nata Sans', sans-serif;
    }

    p.heading {
        text-align: center;
        font-size: 30px;
        max-width: 1000px;
        color : #467446;
        margin: 0 auto 40px auto;
    }

    p {
        font-size: 20px;
        line-height: 1.5;
        max-width: 800px;
        margin: 10px auto;
        color: #1d411d;
        text-align: center;
    }

    .fact-panel {
        margin: 20px auto 40px;
        padding: 30px 50px;
        max-width: 700px;
        background-color: #d6e6d3;
        border-radius: 15px;
        box-shadow: 0 8px 20px rgba(29, 65, 29, 0.15);
        text-align: center;
        font-family: 'Nata Sans', sans-serif;
        color: #1d411d;
        transition: transform 0.3s ease;
    }

    .fact-panel:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(29, 65, 29, 0.25);
    }

    .fact-panel h2 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 10px;
    }

    .fact-panel p {
        font-size: 1.25rem;
        line-height: 1.5;
        margin-bottom: 35px;
        color: #2f5d2f;
    }

    .nav-buttons button {
        background-color: #467470;
        color: white;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease;
        font-weight: 600;
        padding: 12px 24px;
        border-radius: 30px;
        font-size: 1rem;
        box-shadow: 0 4px 10px rgba(70, 116, 112, 0.3);
    }

    .icon {
        font-size: 3rem;
        margin-bottom: 35px;
    }

    .nav-buttons {
        display: flex;
        justify-content: center;
        gap: 30px;
    }

    .nav-buttons button:hover {
        background-color: #1d411d;
        box-shadow: 0 6px 15px rgba(29, 65, 29, 0.5);
    }

    .unlock-panel {
        max-width: 700px;
        margin: 20px auto;
        text-align: center;
    }

    .unlock-panel a {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1d411d;
        text-decoration: none;
        background: linear-gradient(90deg, #a8d5a4, #7d937c);
        padding: 12px 25px;
        border-radius: 30px;
        box-shadow: 0 5px 15px rgba(29, 65, 29, 0.4);
    }

    .unlock-panel a:hover {
        background: linear-gradient(90deg, #467470, #4c664c);
        color: #f0f0f0;
    }

</style>


<h1 class="interactive-title">Save the Sea Turtles</h1>
<p class="heading">{messages[currentIndex]}</p>

{#if loaded}
    <div class="fact-panel">
        <h2>{facts[currentFact]?.title}</h2>
        <p>{facts[currentFact]?.description}</p>

        {#if facts[currentFact]?.icon}
            <div class="icon">{facts[currentFact].icon}</div>
        {/if}

        <div class="nav-buttons">
            <button on:click={prevFact}>Previous</button>
            <button on:click={nextFact}>Next</button>
        </div>
    </div>

    {#if unlock}
        <div class="unlock-panel">
            <a href="{base}/interact">🎉 Go to Interactive Page →</a>
        </div>
    {/if}
{:else}
    <p>Loading facts...</p>
{/if}