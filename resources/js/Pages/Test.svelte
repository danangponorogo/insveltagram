<script>
  import Nav from "./component/Nav";

  export let nama = "Danang Dandies";
  export let isAuthenticated;
</script>

<svelte:head>
  <title>User Home</title>
</svelte:head>

<Nav />

{#if isAuthenticated}
  <h1>Halo {nama}</h1>
{:else}
  <a href="/login">Login</a>
{/if}

<style>
  h1 {
    color: blue;
  }
</style>
