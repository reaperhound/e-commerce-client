import gsap from "gsap";

export const animateFormSignUp = (containerRef) => {
    const TL = gsap.timeline({ defaults: { x: -900, scale: 0.5, duration: 0.8 } });
  
    TL.from("h1", {})
      .from(".form__username", {}, "-=0.6")
      .from(".form__email", {}, "-=0.6")
      .from(".form__password", {}, "-=0.6")
      .from("button", {rotate: 80}, "-=0.6");
  };
export const animateFormLogIn = (containerRef) => {
  const TL = gsap.timeline({ defaults: { x: -800, scale: 0.5, duration: 0.8 } });
  
    TL.from("h1", {})
      .from(".form__email", {}, "-=0.6")
      .from(".form__password", {}, "-=0.6")
      .from("button", {rotate: 80}, "-=0.6");
}