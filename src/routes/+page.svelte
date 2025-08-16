<script>
    // @prerender
    import { base } from "$app/paths";
    import { onMount } from "svelte";
    let loaded = $state(false);

    let facts = $state([
        {
            "title": "Loading...",
            "description": "",
            "icon": "",
            "id": 0
        }
    ]);

    let currentFact = $state(1);
    let totalFacts = $state(0);

    let fact_description = $derived(facts[currentFact-1].description);
    let fact_title = $derived(facts[currentFact-1].title);
    let fact_icon = $derived(facts[currentFact-1].icon);

    let currentIndex = $state(0);

    let viewedFacts = $state(new Set());
    let unlock = $derived(viewedFacts.size === totalFacts && totalFacts > 0);
    
    onMount(function() {
        fetch(`${base}/facts.json`)
            .then(response => response.json())
            .then(data => {
                facts = data;
                totalFacts = facts.length;
                loaded = true;
            });

        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % messages.length;
        }, 3000);

        return () => clearInterval(interval);
    })

    import Banner from "$lib/banner.svelte"

    let messages = [
        "All sea turtle species are threatened or endangered.",
        "Only about 1 in 1,000 to 1 in 10,000 sea turtle hatchlings survive to adulthood.",
        "Plastic pollution is a major threat to sea turtles.",
        "Fishing nets accidentally trap and drown sea turtles."
    ];

    function nextFact() {
        if (facts.length === 0) return;
        currentFact = (currentFact % totalFacts) + 1;
        viewedFacts = new Set([...viewedFacts, currentFact]);
    }

    function prevFact() {
        if (facts.length === 0) return;
        currentFact = (currentFact - 2 + totalFacts) % totalFacts + 1;
        viewedFacts = new Set([...viewedFacts, currentFact]);
    }

</script>

    <Banner />

<style>
    h1.interactive-title {
        color: #1d411d;
        font-family: 'Nata Sans', sans-serif;
        text-align: center;
        font-size: 55px;
        transition: color 0.3s ease, transform 0.3s ease;
        cursor: pointer;
    }

    .interactive-title:hover {
        color: #467470;
        transform: scale(1.2);
    }

    .fact {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        background-color: #86a873;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .icon {
        font-weight: bold;
        margin-right: 0.5rem;
    }

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

</style>

<h1 class="interactive-title">Save the Sea Turtles</h1>
<p class="heading">{messages[currentIndex]}</p>

{#if loaded}
    {#each facts as fact}
        <div class="fact">
            <div class="icon">{fact_icon}</div>
            <h2>{fact_title}</h2>
            <p>{fact_description}</p>
        </div>
    {/each}
        <div class="nav-buttons">
            <button on:click={prevFact}>Previous</button>
            <button on:click={nextFact}>Next</button>
        </div>

        {#if $unlock}
            <a class="unlock-button" href="/interact">Go to Interactive Page →</a>
        {/if}
{:else}
    <p>Loading facts...</p>
{/if}