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
    
    onMount(function() {
        fetch(`${base}/facts.json`)
            .then(response => response.json())
            .then(data => {
                facts = data;
                totalFacts = facts.length;
                loaded = true;
            });
    })

    import Banner from "$lib/banner.svelte"

</script>

    <Banner />

<style>
    h1 {
        color: #b3e5fc;
        font-family: 'Arial', sans-serif;
        text-align: center;
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
        font-family: 'Segoe UI', sans-serif;
    }

    p {
        text-align: center;
        font-size: 18px;
    }


</style>

<h1>Save the Sea Turtles</h1>
<p>All six sea turtle species are threatened or endangered</p>

{#if loaded}
    {#each facts as fact}
        <div class="fact">
            <div class="icon">{fact.icon}</div>
            <h2>{fact.title}</h2>
            <p>{fact.description}</p>
        </div>
    {/each}
{:else}
    <p>Loading facts...</p>
{/if}