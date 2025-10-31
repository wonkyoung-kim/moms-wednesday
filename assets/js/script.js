document.addEventListener("DOMContentLoaded", (event) => {
  // GSAP
  gsap.registerPlugin(ScrollTrigger);

  gsap.set(".btn-floating", {
    opacity: 0,
    y: 30,
    position: "fixed",
    bottom: "2rem",
  });

  ScrollTrigger.create({
    start: "top -200", // 페이지 상단에서 200px 스크롤 시
    onEnter: () =>
      gsap.to(".btn-floating", { opacity: 1, y: 0, duration: 0.5 }),
    onLeaveBack: () =>
      gsap.to(".btn-floating", { opacity: 0, y: 30, duration: 0.5 }),
  });

  ScrollTrigger.create({
    trigger: ".sc-offer",
    start: "top 70%", // 시작 느슨하게
    end: "bottom bottom", // 끝 느슨하게
    onEnter: () => {
      setFloating("absolute", "0");
    },
    onLeave: () => {
      setFloating("absolute", "0");
    },
    onEnterBack: () => {
      setFloating("fixed", "2rem");
    },
    onLeaveBack: () => {
      setFloating("fixed", "2rem");
    },
  });

  function setFloating(position, bottom) {
    gsap.set(".btn-floating", { position, bottom });
  }

  window.addEventListener("load", () => {
    setTimeout(() => ScrollTrigger.refresh(), 500);
  });

  const dots = document.querySelectorAll(".dot");
  const icon = document.querySelector(".icon2");

  const tl = gsap.timeline({
    repeat: -1,
    defaults: { ease: "sine.inOut" },
  });

  dots.forEach((dot, i) => {
    tl.to(
      dot,
      {
        y: -8,
        duration: 0.4,
        yoyo: true,
        repeat: 1,
      },
      i * 0.15
    );
  });
  tl.to(
    icon,
    {
      y: -10,
      duration: 0.5,
      yoyo: true,
      repeat: 1,
    },
    "-=0.25"
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
              ease: "linear",
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

  const path = document.querySelector(".graph-stroke");
  const length = path.getTotalLength();

  // 초기 상태 (선이 안 보이게)
  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });
  gsap.set(".graph-fill", { opacity: 0 });

  ScrollTrigger.create({
    trigger: ".sc-benefit",
    start: "top top",
    once: true,
    delay: 2,
    onEnter: () => {
      const tl = gsap.timeline();

      tl.to(path, {
        strokeDashoffset: 0,
        duration: 3.2,
        ease: "power2.out",
      });

      tl.to(
        ".graph-fill",
        {
          opacity: 0.4,
          duration: 1.8,
          ease: "power1.out",
        },
        "-=2"
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
        delay: 0.6,
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
