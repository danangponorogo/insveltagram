<script>
  import { inertia, useForm } from "@inertiajs/inertia-svelte";

  export let img, errMsg;

  let form = useForm({
    email: null,
    password: null,
    remember: false,
  });

  const handleSubmit = () => {
    $form.post("/login");
  };
</script>

<svelte:head>
  <title>Login</title>
  <style>
    body {
      background: #fafafa;
    }
  </style>
</svelte:head>

<div class="container d-flex vh-100">
  <div class="row mx-auto">
    <div class="col align-self-center p-4">
      <div class="card rounded-3 shadow-sm p-3" style="width:400px">
        <div class="card-body">
          <center>
            <img src={img.Insveltagram} alt="Insveltagram" />
            {#if errMsg}
              <small> {errMsg} </small>
            {/if}
          </center>
          <form on:submit|preventDefault={handleSubmit}>
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input
                bind:value={$form.email}
                type="email"
                class="form-control"
                id="email"
                placeholder="name@example.com"
                autocomplete="username"
              />
              {#if $form.errors.email}
                <small> {$form.errors.email} </small>
              {/if}
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                bind:value={$form.password}
                type="password"
                class="form-control"
                id="password"
                autocomplete="current-password"
              />
              {#if $form.errors.password}
                <small> {$form.errors.password} </small>
              {/if}
            </div>
            <p class="text-center">
              <input type="checkbox" bind:checked={$form.remember} />
              Remember Me
            </p>
            <p class="text-center">
              <button
                type="submit"
                disabled={$form.processing}
                class="btn btn-primary"
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </div>
      <div class="card rounded-3 shadow-sm mt-4" style="width:400px">
        <div class="card-body text-center">
          Don't have an account? <a use:inertia href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  small {
    color: red;
    display: block;
  }

  a {
    text-decoration: none;
  }
</style>
