<script>
  import Head from "./component/Head.svelte";
  import Navgram from "./component/Navgram.svelte";
  import VerifyEmail from "./component/VerifyEmail.svelte";
  import MemberPosts from "./component/MemberPosts.svelte";
  import People from "./component/People.svelte";
  import { onMount } from "svelte";
  let Carousel; // for saving Carousel component class
  let carousel; // for calling methods of carousel instance

  onMount(async () => {
    const module = await import("svelte-carousel");
    Carousel = module.default;
  });

  export let img, user, posts, auth, peoples;
  let result = [];
  let pooller = [];
  const slidePerPage = 3;
  let newPeoples = peoples.map((d, i) => {
    pooller.push(d);
    if (i > 0 && (i + 1) % slidePerPage == 0) {
      result.push(pooller);
      pooller = [];
    } else {
      if (peoples.length == i + 1) {
        result.push(pooller);
      }
    }
    if (i == 0) {
      return result;
    }
  });
  newPeoples.length = 1;
  newPeoples = newPeoples[0];
</script>

<Head {user} />

<Navgram {img} {user} {auth} />

{#if user.email_verified_at === null}
  <VerifyEmail />
{:else}
  <!-- People around you -->
  <div class="container mt-5">
    <div class="row pt-5 justify-content-center align-items-center">
      <h5 class="text-center pb-3">People's around you</h5>
      <div class="row col col-md-9 col-lg-7 g-3">
        <svelte:component
          this={Carousel}
          autoplay
          autoplayDuration={5000}
          pauseOnFocus
          dots={false}
          bind:this={carousel}
        >
          {#each newPeoples as peoples}
            <div class="d-flex justify-content-center">
              {#each peoples as people}
                <People {people} />
              {/each}
            </div>
          {/each}
        </svelte:component>
      </div>
    </div>
  </div>

  <div class="container mt-3">
    <div class="row justify-content-center align-items-center g-3">
      <div class="col col-md-9 col-lg-7">
        {#if posts}
          {#each posts as post}
            <MemberPosts {post} />
          {/each}
        {/if}
      </div>
    </div>
  </div>
{/if}
