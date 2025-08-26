<script lang="ts">
  import { state, derived, onMount } from 'svelte/runes';
  import { base } from '$app/paths';

  const loaded = state(false);

  // Facts array
  const facts = state([{ title: "Loading...", description: "", icon: "", id: 0 }]);
  const currentFact = state(0);

  // Track viewed facts by index
  const viewedFacts = state(new Set<number>());
  const totalFacts = state(0);

  // Unlock when all facts have been viewed
  const unlock = derived(() => 
    $viewedFacts.size === $totalFacts && $totalFacts > 0
  );

  // Messages to show above facts
  const currentIndex = state(0);
  const messages = [
    "All sea turtle species are threatened or endangered.",
    "Only about 1 in 1,000 to 1 in 10,000 sea turtle hatchlings survive to adulthood.",
    "Plastic pollution is a major threat to sea turtles.",
    "Fishing nets accidentally trap and drown sea turtles."
  ];

  let interval: ReturnType<typeof setInterval>;

  onMount(() => {
    fetch(`${base}/facts.json`)
      .then(res => res.json())
      .then(data => {
        facts.set(data);
        totalFacts.set(data.length);
        loaded.set(true);
      });

    interval = setInterval(() => {
      currentIndex.set(($currentIndex + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  });

  function nextFact() {
    if ($totalFacts === 0) return;
    const next = ($currentFact + 1) % $totalFacts;
    currentFact.set(next);

    // Update viewedFacts set immutably
    const updated = new Set($viewedFacts);
    updated.add(next);
    viewedFacts.set(updated);
  }

  function prevFact() {
    if ($totalFacts === 0) return;
    const prev = ($currentFact - 1 + $totalFacts) % $totalFacts;
    currentFact.set(prev);

    const updated = new Set($viewedFacts);
    updated.add(prev);
    viewedFacts.set(updated);
  }
</script>

<h1 class="interactive-title">Save the Sea Turtles</h1>
<p class="heading">{messages[$currentIndex]}</p>

{#if $loaded}
  <div class="fact-panel">
    <h2>{ $facts[$currentFact]?.title }</h2>
    <p>{ $facts[$currentFact]?.description }</p>

    {#if $facts[$currentFact]?.icon}
      <div class="icon">{ $facts[$currentFact].icon }</div>
    {/if}

    <div class="nav-buttons">
      <button on:click={prevFact}>Previous</button>
      <button on:click={nextFact}>Next</button>
    </div>
  </div>

  {#if $unlock}
    <div class="unlock-panel">
      <a href="{base}/interact">🎉 Go to Interactive Page →</a>
    </div>
  {/if}
{:else}
  <p>Loading facts...</p>
{/if}

<style>
  /* Your existing styles here (unchanged) */
</style>