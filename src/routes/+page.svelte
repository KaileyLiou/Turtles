<script>
    @prerender
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

    let fact_description = $state("");
    let fact_title = $state("Loading...");
    let fact_icon = $state("");
    
    onMount(function() {
        fetch(`${base}/facts.json`)
            .then(response => response.json())
            .then(data => {
                facts = data;
                totalFacts = facts.length;
                loaded = true;
            });
    })

</script>

<style>
    h1 {
        color: #b3e5fc;
        font-family: 'Arial', sans-serif;
        text-align: center;
    }
</style>

<h1>Save the Sea Turtles</h1>
<p>All six sea turtle species are threatened or endangered</p>