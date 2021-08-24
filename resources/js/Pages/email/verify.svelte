<script>
  import Nav from "../component/Nav";

  export let sts = "unknown";
</script>

<svelte:head>
  <title>Email Verified</title>
</svelte:head>

<Nav />

<div class="container mt-3">
  <div class="row">
    <div class="col">
      <h1>{sts}</h1>
    </div>
  </div>
</div>

<style>
  h1 {
    color: blue;
  }
</style>
