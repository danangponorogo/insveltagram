<script>
  import Head from "./component/Head.svelte";
  import Navgram from "./component/Navgram.svelte";
  import VerifyEmail from "./component/VerifyEmail.svelte";
  import MemberPosts from "./component/MemberPosts.svelte";

  export let img, user, posts, auth;
</script>

<Head {user} />

<Navgram {img} {user} {auth} />

{#if user.email_verified_at === null}
  <VerifyEmail />
{:else}
  <div class="container mt-5 col-10">
    <div class="row pt-5 justify-content-center align-items-center g-3">
      <div class="col-8">
        {#if posts}
          {#each posts as post}
            <MemberPosts {post} />
          {/each}
        {/if}
      </div>
    </div>
  </div>
{/if}
