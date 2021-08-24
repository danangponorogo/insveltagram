<script>
  import { useForm } from "@inertiajs/inertia-svelte";
  import Nav from "./component/Nav";

  export let isAuthenticated, user;

  let form = useForm();

  const handleSubmit = (param = "logout") => {
    switch (param) {
      case "verify":
        $form.post("/verify-email");
        break;

      default:
        $form.post("/logout");
        break;
    }
  };
</script>

<svelte:head>
  <title>User Profile</title>
</svelte:head>

<Nav />

<div class="container mt-3">
  <div class="row">
    <div class="col">
      <h1>The profile of {user.name}</h1>

      {#if user.email_verified_at === null}
        <button on:click={() => handleSubmit("verify")} type="submit">
          Resend
        </button>
      {/if}

      with email {user.email} and status isAuthenticated {isAuthenticated}
      <!-- isLoggedIn, isAuthenticated, user:email -->
      <div>
        <form on:submit|preventDefault={handleSubmit}>
          <button type="submit">Logout</button>
        </form>
      </div>
    </div>
  </div>
</div>

<style>
  h1 {
    color: blue;
  }
</style>
