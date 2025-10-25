document.addEventListener("DOMContentLoaded", (event) => {
  // GSAP
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline();

  tl.fromTo(
    ".logo",
    { scale: 40, opacity: 0 },
    { scale: 1, opacity: 1, duration: 2, ease: "power1.out" }
  )
    .to(
      ".main-intro",
      { opacity: 1, filter: "blur(0px)", duration: 1, ease: "power1.out" },
      "-=0.8"
    )
    .fromTo(
      ".btn-flotting",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
      "+=0.03"
    );

  // sc-program
  ScrollTrigger.create({
    trigger: ".sc-program",
    start: "top 50%",

    onEnter: () => {
      gsap.from(".img-tooltip", { opacity: 0, scale: 0 }),
        gsap.to(".img-tooltip", {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          onComplete: () => {
            // 등장 후 위아래 반복 움직임
            gsap.to(".img-tooltip", {
              y: -10,
              duration: 1,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              stagger: 0.15,
            });
          },
        });
    },
  });

  // sc-benefit
  ScrollTrigger.create({
    trigger: ".sc-benefit",
    start: "top 50%",
    once: true,
    onEnter: () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".sc-benefit .benefit-list li:first-child .img",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      ).fromTo(
        ".sc-benefit .benefit-list li:first-child .msg",
        { opacity: 0, y: 20, scale: 1 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 2,
          stagger: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.6"
      );
    },
  });

  // sc-intro
  const split = new SplitType(".sc-intro .sc-title", {
    types: "chars",
    tagName: "span",
  });
  const chars = split.chars;

  const tl3 = gsap.timeline({ repeat: -1, repeatDelay: 1 });

  // 글자 하나씩 타이핑 (나타나기)
  tl3.to(chars, {
    opacity: 1,
    duration: 0.05,
    ease: "none",
    stagger: {
      each: 0.1,
      from: "start",
    },
  });

  // 잠시 멈춤
  tl3.to({}, { duration: 1.5 });

  // 글자 하나씩 지우기 (사라지기)
  tl3.to(chars, {
    opacity: 0,
    duration: 0.03,
    ease: "none",
    stagger: {
      each: 0.03,
      from: "end",
    },
  });

  ScrollTrigger.create({
    trigger: ".sc-intro",
    start: "top 50%",
    onEnter: () => {
      gsap.to(".intro-list li", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "none",
        stagger: 0.3, // 하나씩 자연스럽게
      });
    },
  });

  // sc-review
  document.querySelectorAll(".review-list").forEach((list) => {
    gsap.fromTo(
      list.querySelectorAll("li"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.2, // 순차적으로 하나씩
        scrollTrigger: {
          trigger: list, // 각 리스트 단위로 트리거
          start: "top 80%",
          toggleActions: "play none none reverse", // 스크롤 되돌리면 다시 사라짐
        },
      }
    );
  });

  // swiper
  const swiper = new Swiper(".swiper-container .swiper", {
    slidesPerView: "auto",
    spaceBetween: 12,
  });
});
