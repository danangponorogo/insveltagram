<script>
  import Head from "../component/Head.svelte";
  import Navgram from "../component/Navgram.svelte";
  export let user, img, auth;

  import { useForm } from "@inertiajs/inertia-svelte";

  let form = useForm({
    caption: null,
    image: null,
  });

  const submit = () => {
    $form.post("/post/store");
  };

  const setPostImage = (e) => {
    $form.image = e.target.files[0];
  };
</script>

<Head {user} />

<Navgram {img} {user} {auth} />

<div class="container mt-5 mb-4 col-10">
  <div class="row pt-5 justify-content-center">
    <div class="col-10">
      <div class="card bg-white">
        <div class="card-body">
          <h1 class="card-title mb-3 text-center">Create New Post</h1>
          <form on:submit|preventDefault={submit}>
            <div class="mb-3">
              <label for="caption" class="form-label">Caption</label>
              <textarea
                bind:value={$form.caption}
                class="form-control"
                id="caption"
                rows="4"
                placeholder="Your Post Caption"
              />
              {#if $form.errors.caption}
                <small> {$form.errors.caption} </small>
              {/if}
            </div>
            <div class="mb-3">
              <label for="fileUpload" class="form-label"> Upload Image </label>
              <input
                on:change={setPostImage}
                type="file"
                class="form-control"
                id="fileUpload"
                placeholder="File Upload"
              />
              {#if $form.errors.image}
                <small> {$form.errors.image} </small>
              {/if}
              {#if $form.progress}
                <progress value={$form.progress.percentage} max="100">
                  {$form.progress.percentage}%
                </progress>
              {/if}
            </div>
            <div class="text-center">
              <input type="submit" class="btn btn-primary" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  small {
    color: red;
  }
</style>
