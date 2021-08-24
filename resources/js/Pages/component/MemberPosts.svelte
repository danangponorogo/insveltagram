<script>
  import { inertia } from "@inertiajs/inertia-svelte";
  export let post;
  const toTitles = (s) => {
    return s.replace(/\w\S*/g, function (t) {
      return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
    });
  };
</script>

<div class="border bg-white mb-4">
  <div class="justify-content-between d-flex">
    <div class="m-2 d-flex">
      <a
        use:inertia
        class="text-decoration-none"
        href={`/${post.user.username}`}
      >
        <img
          src={post.user.avatar}
          width="50px"
          class="avatar rounded-circle"
          alt="Profile"
          title={toTitles(post.user.name)}
        />
      </a>
      <p class="ms-3 mt-2">
        <a
          use:inertia
          class="fw-bold text-decoration-none text-dark"
          href={`/${post.user.username}`}
        >
          {post.user.username}
        </a>
      </p>
    </div>
    <div>
      <p class="m-3 fw-bold lt-space">...</p>
    </div>
  </div>
  <img
    class="img-fluid"
    src={post.image}
    alt={post.caption}
    title={post.caption}
  />
  <div class="p-4">
    <div class="d-flex">
      <p>
        <a
          use:inertia
          class="fw-bold text-decoration-none text-dark"
          href={`/${post.user.username}`}
        >
          {post.user.username}
        </a>
      </p>
      <p class="ms-3">{post.caption}</p>
    </div>
    <p class="fs-6 my-3 text-black-50"><small>{post.user.createdAt}</small></p>
  </div>
</div>

<style>
  .lt-space {
    letter-spacing: 2px;
  }
</style>
