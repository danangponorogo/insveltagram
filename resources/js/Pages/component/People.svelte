<script>
  import { inertia } from "@inertiajs/inertia-svelte";

  export let people;

  const toTitles = (s) => {
    return s.replace(/\w\S*/g, function (t) {
      return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
    });
  };
</script>

<div class="col-4 col-sm-3 text-center">
  <a use:inertia class="text-decoration-none" href={`/${people.username}`}>
    <img
      src={people.avatar}
      width="50px"
      class="avatar rounded-circle"
      alt="Profile"
      title={toTitles(people.name)}
    />
  </a>
  <p class="mt-2">
    <a
      use:inertia
      class="fw-bold text-decoration-none text-dark"
      href={`/${people.username}`}
    >
      {people.username}
    </a>
  </p>
</div>
