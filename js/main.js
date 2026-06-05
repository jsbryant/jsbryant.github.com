// ==========================================================================
// CORE PLUGINS & REGISTRATION (Calculated immediately to avoid screen shifts)
// ==========================================================================
gsap.registerPlugin(ScrollTrigger);

// --- High-Performance Parallax Calculations ---
const parallaxWindow = document.querySelector(".parallax-window");
const parallaxImg = document.querySelector(".parallax-img");

if (parallaxWindow && parallaxImg) {
    gsap.to(parallaxImg, {
        y: "-20%", 
        ease: "none",
        scrollTrigger: {
            trigger: parallaxWindow,
            start: "top bottom", 
            end: "bottom top",   
            scrub: true
        }
    });
}

// ==========================================================================
// CORE PAGE ORCHESTRATION ENGINE & STRUCTURAL ANIMATIONS (Runs at Window Load)
// ==========================================================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    
    // 1. Trigger the smooth fade-out of the preloader canvas
    if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
    }
    
    // 2. Wait exactly 500ms for the fade-out animation to finish before initializing layout reveals
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.remove();
        }
        
        // 3. Initialize AOS Reveal Libraries safely once elements are unmasked
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                once: true,    
            });
        }

        // ==================================================================
        // HIGH-PERFORMANCE HOMEPAGE REVEAL SYSTEM (GSAP NATIVE)
        // ==================================================================
        const homeSections = document.querySelectorAll(".about, .clickable-section-wrapper");
        
        if (homeSections.length > 0) {
            // Animate FROM dropped & hidden TO baseline layout dimensions
            gsap.fromTo(homeSections, 
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.0,
                    ease: "power2.out",
                    stagger: 0.15
                }
            );
        }

        // ==================================================================
        // GLOBAL & CONDITIONAL CASE STUDY ROUTING CORE
        // ==================================================================

        // [A] Staggered Core Scope SVG Metric Icons Reveal
        const scopeSection = document.getElementById('scope');
        const svgContainers = document.querySelectorAll('#scope .column .svg-image');

        if (scopeSection && svgContainers.length > 0) {
            gsap.set(svgContainers, {
                opacity: 0,
                scale: 0.5,
                y: 30,
                transformOrigin: "center center"
            });

            gsap.to(svgContainers, {
                opacity: 1,
                scale: 0.60,
                y: 0,
                duration: 1.0,         
                ease: "power2.out",   
                stagger: 0.2,          
                scrollTrigger: {
                    trigger: scopeSection,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            });     
        }

        // [B] Case Study Standard Secondary Visual Inline Image Reveals
        const detailImages = document.querySelectorAll(
            '.project-detail img:not(.parallax-img):not(.layer-cake-container img), .project-detail-image:not(.dh-image-01)'
        );

        if (detailImages.length > 0) {
            gsap.set(detailImages, {
                opacity: 0,
                y: 40,
                transformOrigin: "center center"
            });

            detailImages.forEach((img) => {
                gsap.to(img, {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: img,           
                        start: "top 85%",       
                        toggleActions: "play none none none" 
                    }
                });
            });
        }

        // [C] HPE Page — Sequential Image Grid Staggering
        const hpeFigures = document.querySelectorAll('#image-01 figure');
        if (hpeFigures.length > 0) {
            gsap.set(hpeFigures, { opacity: 0, y: 50 });
            ScrollTrigger.batch(hpeFigures, {
                start: "top 85%", 
                onEnter: batch => gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power2.out",
                    stagger: 0.2, 
                    overwrite: "auto"
                }),
                once: true 
            });
        }

        // [D] Vroozi Page — Bottom Showcase Scroll Reveal
        const vrooziImages = document.querySelectorAll('#outcome img, .project-detail img:last-of-type');
        if (vrooziImages.length > 0) {
            gsap.set(vrooziImages, {
                opacity: 0,
                y: 40,
                transformOrigin: "center center"
            });

            vrooziImages.forEach((img) => {
                gsap.to(img, {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: img,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            });
        }

        // [E] Exploded Layer-Cake Interface Assembly System
        const layerCake = document.querySelector('.layer-cake-container');
        const outcomeSection = document.getElementById('outcome');

        if (layerCake && outcomeSection) {
            const cakeTimeline = gsap.timeline();

            cakeTimeline.to(".cake-layer-5", { y: "-40%", ease: "none" }, 0)
                        .to(".cake-layer-4", { y: "-20%", opacity: 1, ease: "none" }, 0)
                        .to(".cake-layer-3", { y: "0%",   opacity: 1, ease: "none" }, 0) 
                        .to(".cake-layer-2", { y: "20%",  opacity: 1, ease: "none" }, 0)
                        .to(".cake-layer-1", { y: "35%",  opacity: 1, ease: "none" }, 0);

            ScrollTrigger.create({
                animation: cakeTimeline,
                trigger: outcomeSection,       
                start: "top 30%",          
                end: "+=300",              
                scrub: 1,                  
                pin: true,                 
                pinSpacing: true
            });
        }

        // [F] Video Case Studies — Scroll Reveal & Smart Autoplay Engine
        const portfolioVideos = document.querySelectorAll(".dtv-video-section video, .video-wrapper video, #image-01 video");

        if (portfolioVideos.length > 0) {
            gsap.set(portfolioVideos, {
                opacity: 0,
                y: 40
            });

            portfolioVideos.forEach((video) => {
                gsap.to(video, {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: video,
                        start: "top 85%", 
                        toggleActions: "play none none none", 
                        
                        onEnter: () => {
                            video.muted = true; 
                            video.play().catch(err => console.log("Autoplay blocked by browser rules:", err));
                        },       
                        onLeave: () => video.pause(),      
                        onEnterBack: () => {
                            video.muted = true;
                            video.play().catch(err => console.log("Autoplay blocked by browser rules:", err));
                        },  
                        onLeaveBack: () => video.pause()  
                    }
                });
            });
        }

    }, 500); // End of the 500ms core delay block
}); // End of Window Load Wrapper

// ==========================================================================
// High-Performance Custom Cursor Tracking (Zero Jump Native Precision)
// ==========================================================================
const cursor = document.querySelector(".custom-cursor");

if (cursor) {
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" });

    let hasMoved = false;

    window.addEventListener("mousemove", (e) => {
        if (!hasMoved) {
            gsap.set(cursor, {
                x: e.clientX,
                y: e.clientY
            });
            cursor.style.opacity = "1";
            hasMoved = true;
        } else {
            xTo(e.clientX);
            yTo(e.clientY);
        }
    });

    // Target all interactive link interfaces dynamically
    const interactiveElements = document.querySelectorAll("a, button, .project, #logo-container");

    interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            gsap.to(cursor, {
                "--size": "50px",
                backgroundColor: "transparent",
                border: "2px solid #fff",
                duration: 0.3
            });
        });

        el.addEventListener("mouseleave", () => {
            gsap.to(cursor, {
                "--size": "20px",
                backgroundColor: "#fff",
                border: "none",
                duration: 0.3
            });
        });
    });
}

// ==========================================================================
// Copy Email to Clipboard Action System
// ==========================================================================
const emailBtn = document.getElementById("copy-email-btn");
const copyToast = document.querySelector(".copy-toast");
const emailAddress = "jsbrymail@gmail.com"; 

if (emailBtn && copyToast) {
    emailBtn.addEventListener("click", (e) => {
        e.preventDefault(); 

        navigator.clipboard.writeText(emailAddress).then(() => {
            const tl = gsap.timeline();

            tl.to(copyToast, {
                opacity: 1,
                y: 5,        
                duration: 0.3,
                ease: "power2.out"
            })
            .to(copyToast, {
                opacity: 0,
                y: 15,       
                duration: 0.4,
                ease: "power2.in",
                delay: 1.2  
            });             
        }).catch(err => {
            console.error("Fallback execution block: Could not isolate clipboard parameters safely", err);
        });
    });
}