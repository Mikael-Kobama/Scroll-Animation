gsap.registerPlugin(ScrollTrigger);

const pageContainer = document.querySelector('.container');
console.log("Page container:", pageContainer);

const scroller = new LocomotiveScroll({
    el: pageContainer,
    smooth: true
});
console.log("Scroller initialized:", scroller);

scroller.on("scroll", () => {
    console.log("Scroll event triggered");
    ScrollTrigger.update();
});

ScrollTrigger.scrollerProxy(pageContainer, {
    scrollTop(value) {
        //console.log("ScrollTop value received:", value);
        return arguments.length
            ? scroller.scrollTo(value, 0, 0)
            : scroller.scroll.instance.scroll.y;
    },
    getBoundClientRect() {
        const rect = {
            left: 0,
            top: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
        console.log("getBoundClientRect:", rect);
        return rect;
    },
    pinType: pageContainer.style.transform ? "transform" : "fixed"
});

window.addEventListener("load", function () {
    let pinWrap = document.querySelector(".pin-wrap");
    console.log("Pin wrap:", pinWrap);

    if (!pinWrap) {
        console.error("Pin wrap not found!");
        return;
    }

    let pinWrapWidth = pinWrap.offsetWidth;
    console.log("Pin wrap width:", pinWrapWidth);

    let horizontalScrollLength = pinWrapWidth - window.innerWidth;
    console.log("Horizontal scroll length:", horizontalScrollLength);

    gsap.to(".pin-wrap", {
        scrollTrigger: {
            scroller: pageContainer,
            scrub: true,
            trigger: "#sectionPin",
            pin: true,
            start: "top top",
            end: `+=${horizontalScrollLength}`, // Ajuste aqui
        },
        x: -horizontalScrollLength
    });

    ScrollTrigger.addEventListener("refresh", () => {
        console.log("ScrollTrigger refreshed");
        scroller.update();
    });

    ScrollTrigger.refresh();
    console.log("ScrollTrigger refreshed after load");
});

const tl = gsap.timeline({
    scrollTrigger:{
        trigger: ".anima",
        scroller: pageContainer,
        start: "top 20%",
        end: "bottom 40%",
        scrub:2,
    }
})

tl.fromTo(".anima", {scale: 1}, {scale: 2.5})
tl.fromTo(".anima", {opacity: 1}, {opacity: 0})