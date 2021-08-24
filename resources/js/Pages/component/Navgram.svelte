<script>
  export let img, user, auth;

  import { inertia, useForm } from "@inertiajs/inertia-svelte";

  let form = useForm();

  const handleSubmit = () => {
    $form.post("/logout");
  };
</script>

<nav
  class="navbar navbar-expand-lg navbar-light bg-white border-bottom fixed-top"
>
  <div class="container justify-content-center">
    <div
      class="d-flex flex-row justify-content-between align-items-center col-10"
    >
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a class="navbar-brand" href="#">
        <img src={img.Insveltagram} alt="" height="45px" loading="lazy" />
      </a>
      <div class="d-none d-md-block ">
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </div>
      <div class="d-flex">
        <ul class="list-inline m-0">
          <li class="list-inline-item">
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a use:inertia href="/home" class="link-menu">
              <svg
                aria-label="Home"
                class="_8-yf5 "
                fill="#262626"
                height="22"
                role="img"
                viewBox="0 0 48 48"
                width="22"
              >
                <path
                  d="M45.3 48H30c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2-4.6-4.6-4.6s-4.6 2-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.5-.6 2.1 0l21.5 21.5c.4.4.6 1.1.3 1.6 0 .1-.1.1-.1.2v22.8c.1.8-.6 1.5-1.4 1.5zm-13.8-3h12.3V23.4L24 3.6l-20 20V45h12.3V34.2c0-4.3 3.3-7.6 7.6-7.6s7.6 3.3 7.6 7.6V45z"
                />
              </svg>
            </a>
          </li>
          {#if user.email_verified_at !== null && user.username == auth.username}
            <li class="list-inline-item">
              <!-- svelte-ignore a11y-invalid-attribute -->
              <a use:inertia href="/post/create" class="link-menu">
                <svg
                  aria-label="Post"
                  height="22"
                  width="22"
                  fill="#262626"
                  viewBox="0 0 16 16"
                  class="bi bi-plus-square"
                >
                  <path
                    d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                  />
                  <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                  />
                </svg>
              </a>
            </li>
          {/if}
          {#if 0}
            <li class="list-inline-item">
              <!-- svelte-ignore a11y-invalid-attribute -->
              <a href="#" class="link-menu">
                <svg
                  aria-label="Direct"
                  class="_8-yf5 "
                  fill="#262626"
                  height="22"
                  role="img"
                  viewBox="0 0 48 48"
                  width="22"
                >
                  <path
                    d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"
                  />
                </svg>
              </a>
            </li>
            <li class="list-inline-item">
              <!-- svelte-ignore a11y-invalid-attribute -->
              <a href="#" class="link-menu">
                <svg
                  aria-label="Find People"
                  class="_8-yf5 "
                  fill="#262626"
                  height="22"
                  role="img"
                  viewBox="0 0 48 48"
                  width="22"
                >
                  <path
                    clip-rule="evenodd"
                    d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z"
                    fill-rule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li class="list-inline-item">
              <!-- svelte-ignore a11y-invalid-attribute -->
              <a href="#" class="link-menu">
                <svg
                  aria-label="Activity Feed"
                  class="_8-yf5 "
                  fill="#262626"
                  height="22"
                  role="img"
                  viewBox="0 0 48 48"
                  width="22"
                >
                  <path
                    d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
                  />
                </svg>
              </a>
            </li>
          {/if}
          {#if user.email_verified_at !== null}
            <li class="list-inline-item dropdown">
              <!-- svelte-ignore a11y-invalid-attribute -->
              <a
                class="link-menu"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={auth.avatar}
                  width="30px"
                  class="avatar img-fluid rounded-circle"
                  alt=""
                />
              </a>
              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <!-- svelte-ignore a11y-invalid-attribute -->
                  <a
                    use:inertia
                    class="dropdown-item"
                    href={`/${auth.username}`}
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <!-- svelte-ignore a11y-invalid-attribute -->
                  <a on:click={handleSubmit} class="dropdown-item" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          {:else}
            <li class="list-inline-item">
              <!-- svelte-ignore a11y-invalid-attribute -->
              <a
                on:click={handleSubmit}
                class="link-menu"
                href="#"
                title="Logout"
              >
                <svg
                  aria-label="Logout"
                  height="22"
                  width="22"
                  fill="#262626"
                  viewBox="0 0 16 16"
                  class="bi bi-box-arrow-right"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg>
              </a>
            </li>
          {/if}
        </ul>
      </div>
    </div>
  </div>
</nav>
