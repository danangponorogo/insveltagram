<script>
  import { inertia } from "@inertiajs/inertia-svelte";

  const isActive = (path) => {
    if (location.pathname === path) {
      return true;
    } else {
      return false;
    }
  };
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a use:inertia href="/" class="navbar-brand">Navbar</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a
            use:inertia
            href="/"
            class="nav-link {isActive('/') ? 'active' : ''}"
          >
            Home
          </a>
        </li>
        <li class="nav-item">
          <a
            use:inertia
            href="/profile"
            class="nav-link {isActive('/profile') ? 'active' : ''}"
          >
            Profile
          </a>
        </li>
        <li class="nav-item">
          <a use:inertia href="/signup" class="nav-link"> Sign Up </a>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="/"
            id="navbarDropdownMenuLink"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown link
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" href="/">Action</a></li>
            <li><a class="dropdown-item" href="/">Another action</a></li>
            <li><a class="dropdown-item" href="/">Something else here</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

{location.pathname}
