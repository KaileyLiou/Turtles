
<script>
    // @prerender
    import { base } from "$app/paths";
    import { onMount } from "svelte";
    import Banner from "$lib/banner.svelte";

    // Svelte 5 runes reactivity
    let loaded = false;
    let facts = [
        {
            title: "Loading...",
            description: "",
            icon: "",
            id: 0
        }
    ];
    let currentFact = 0;
    let totalFacts = 0;
    let viewedFacts = new Set();
    let unlock = false;

    let currentIndex = 0;
    let messages = [
        "All sea turtle species are threatened or endangered.",
        "Only about 1 in 1,000 to 1 in 10,000 sea turtle hatchlings survive to adulthood.",
        "Plastic pollution is a major threat to sea turtles.",
        "Fishing nets accidentally trap and drown sea turtles."
    ];
    let interval;

    onMount(() => {
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

    $: unlock = viewedFacts.size === totalFacts && totalFacts > 0;

    function nextFact() {
        if (totalFacts === 0) return;
        currentFact = (currentFact + 1) % totalFacts;
        viewedFacts.add(currentFact);
        // force reactivity for Set
        viewedFacts = new Set(viewedFacts);
    }

    function prevFact() {
        if (totalFacts === 0) return;
        currentFact = (currentFact - 1 + totalFacts) % totalFacts;
        viewedFacts.add(currentFact);
        viewedFacts = new Set(viewedFacts);
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
            <a href="/interact">🎉 Go to Interactive Page →</a>
        </div>
    {/if}
{:else}
    <p>Loading facts...</p>
{/if}