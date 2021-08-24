<script>
  export let user;

  const toTitles = (s) => {
    return s.replace(/\w\S*/g, function (t) {
      return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
    });
  };
</script>

<svelte:head>
  <title>
    {toTitles(user.name)} (@{user.username}) • Insveltagram photos and videos
  </title>
</svelte:head>
