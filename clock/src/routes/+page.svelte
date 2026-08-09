<script>
  import { onMount } from 'svelte';

  let now = new Date();

  onMount(() => {
    const tick = () => (now = new Date());
    tick();
    const timer = setInterval(tick, 250);
    return () => clearInterval(timer);
  });

  const time = () => new Intl.DateTimeFormat('ja-JP', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }).format(now);

  const date = () => new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
  }).format(now);
</script>

<svelte:head>
  <title>今の時間</title>
  <meta name="description" content="現在時刻をリアルタイムで表示するシンプルな時計" />
</svelte:head>

<main>
  <section class="clock" aria-labelledby="clock-title">
    <p class="label" id="clock-title">CURRENT TIME</p>
    <time datetime={now.toISOString()} aria-live="off">{time()}</time>
    <p class="date">{date()}</p>
    <p class="zone">あなたの端末の現在時刻</p>
  </section>
</main>

<style>
  :global(*) { box-sizing: border-box; }
  :global(html) { color-scheme: dark; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
  :global(body) { margin: 0; min-width: 320px; background: #101827; }
  main {
    min-height: 100svh; display: grid; place-items: center; padding: 24px;
    background: radial-gradient(circle at 50% 20%, #253a5e 0, #101827 48%, #090f1a 100%);
  }
  .clock {
    width: min(680px, 100%); padding: clamp(32px, 8vw, 72px) 24px; text-align: center;
    border: 1px solid #ffffff25; border-radius: 28px; background: #ffffff0d;
    box-shadow: 0 24px 80px #0008; backdrop-filter: blur(18px);
  }
  .label { margin: 0 0 22px; color: #8fb8ff; font-size: 12px; font-weight: 800; letter-spacing: .28em; }
  time {
    display: block; color: #fff; font-size: clamp(54px, 14vw, 112px); font-weight: 750;
    font-variant-numeric: tabular-nums; line-height: 1; letter-spacing: -.055em;
    text-shadow: 0 0 40px #77a7ff55;
  }
  .date { margin: 26px 0 8px; color: #dce8ff; font-size: clamp(16px, 3vw, 22px); }
  .zone { margin: 0; color: #93a4bd; font-size: 13px; }
  @media (prefers-reduced-motion: reduce) { .clock { backdrop-filter: none; } }
</style>
