/* ==========================================================
   QREDIT LANDING-PAGE INTERACTIONS
========================================================== */
(() => {
      /* 01. ELEMENT REFERENCES*/
      const nav = document.getElementById("siteNav");
      const progress = document.getElementById("scrollProgress");
      const toggle = document.getElementById("menuToggle");
      const menu = document.getElementById("mobileMenu");
      const heroZoomScene = document.getElementById("brandMotion");
      const heroZoomSticky = document.getElementById("heroZoomSticky");
      const heroZoomCanvas = document.getElementById("heroZoomCanvas");
      const heroZoomScreen = document.getElementById("heroZoomScreen");
      const sloganOne = document.getElementById("sloganOne");
      const sloganTwo = document.getElementById("sloganTwo");
      const heroZoomCue = document.getElementById("heroZoomCue");
      const storyWraps = [...document.querySelectorAll(".story-card-wrap")];
      const storyCards = storyWraps.map(wrap => wrap.querySelector(".story-card"));
      const storyPhotos = storyWraps.map(wrap => wrap.querySelector(".story-photo"));
      const paymentUniverse = document.getElementById("paymentUniverse");
      const faqSection = document.getElementById("faq");
      const faqMore = document.getElementById("faqMore");
      const faqCards = [...document.querySelectorAll("#faq .faq-card")];
      const pricingSection = document.getElementById("pricing");
      const pricingToggle = document.getElementById("pricingToggle");
      const reduceMotion = { matches: false, addEventListener() {} };
      const mobileStory = window.matchMedia("(max-width: 680px)");
      const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
      let storyFrame = 0;

      /* 02. SHARED MOTION HELPERS */
      const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
      const easeOutCubic = value => 1 - Math.pow(1 - clamp(value), 3);
      const localizedText = (arabic, english) => window.qreditLanguage?.text(arabic, english) ?? arabic;
      const svgNamespace = "http://www.w3.org/2000/svg";
      const valuesRibbonLines = document.getElementById("valuesRibbonLines");
      const fiberBurstLines = document.getElementById("fiberBurstLines");

      /* 03. GENERATED DECORATIVE SVG ART*/
      const buildAmbientMotion = () => {
        if (valuesRibbonLines) {
          const lineCount = 16;

          for (let index = 0; index < lineCount; index += 1) {
            const path = document.createElementNS(svgNamespace, "path");
            const band = index < lineCount / 2 ? 0 : 1;
            const lane = index % (lineCount / 2);
            const offset = (lane - 3.5) * 7.2;
            const shape = band === 0
              ? `M -100 ${235 + offset} C 210 ${75 + offset * .35} 400 ${315 + offset * .55} 705 ${172 + offset * .25} S 1130 ${55 + offset * .5} 1500 ${170 + offset * .3}`
              : `M -80 ${302 + offset * .5} C 250 ${250 - offset * .3} 490 ${60 + offset * .35} 760 ${126 + offset * .3} S 1160 ${280 - offset * .4} 1490 ${82 + offset * .25}`;

            path.setAttribute("d", shape);
            path.setAttribute("pathLength", "1");
            path.style.setProperty("--motion-delay", `${-(lane * .29 + band * 1.6).toFixed(2)}s`);
            valuesRibbonLines.appendChild(path);
          }
        }

        if (fiberBurstLines) {
          const rayCount = 28;

          for (let index = 0; index < rayCount; index += 1) {
            const angle = (index / rayCount) * Math.PI * 2 - Math.PI / 2 + Math.sin(index * 2.17) * .025;
            const radius = 158 + ((index * 37) % 188);
            const x2 = 500 + Math.cos(angle) * radius;
            const y2 = 310 + Math.sin(angle) * radius * .76;
            const group = document.createElementNS(svgNamespace, "g");
            const line = document.createElementNS(svgNamespace, "line");
            const tip = document.createElementNS(svgNamespace, "circle");
            const color = index % 12 === 3 ? "#F0B43E" : index % 12 === 7 ? "#E2553D" : "#3B6FE0";

            group.setAttribute("class", "fiber-ray");
            group.style.color = color;
            line.setAttribute("x1", "500");
            line.setAttribute("y1", "310");
            line.setAttribute("x2", x2.toFixed(2));
            line.setAttribute("y2", y2.toFixed(2));
            line.setAttribute("pathLength", "1");
            tip.setAttribute("cx", x2.toFixed(2));
            tip.setAttribute("cy", y2.toFixed(2));
            tip.setAttribute("r", index % 9 === 0 ? "2.2" : "1.25");
            group.append(line, tip);
            fiberBurstLines.appendChild(group);
          }
        }
      };

      buildAmbientMotion();

      /* Pause decorative CSS animation */
      const ambientMotionTargets = [
        document.querySelector(".values-section"),
        paymentUniverse,
        document.querySelector(".cta-section")
      ].filter(Boolean);

      if ("IntersectionObserver" in window) {
        const ambientMotionObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => entry.target.classList.toggle("motion-active", entry.isIntersecting));
        }, { threshold: .06, rootMargin: "120px 0px" });
        ambientMotionTargets.forEach(target => ambientMotionObserver.observe(target));
      } else {
        ambientMotionTargets.forEach(target => target.classList.add("motion-active"));
      }

      /* 04. BRAND GROWTH SCROLL SCENE*/
      const updateHeroZoom = () => {
        if (!heroZoomScene || !heroZoomSticky || !heroZoomCanvas) return;

        if (window.innerWidth <= 680 || reduceMotion.matches) {
          heroZoomCanvas.style.setProperty("--zoom-clip-y", "0%");
          heroZoomCanvas.style.setProperty("--zoom-clip-x", "0%");
          heroZoomCanvas.style.setProperty("--zoom-radius", "24px");
          heroZoomCanvas.style.setProperty("--zoom-screen-scale", "1");
          heroZoomCanvas.style.setProperty("--zoom-shade", ".46");
          [sloganOne, sloganTwo].forEach(word => {
            if (!word) return;
            word.style.opacity = "1";
            word.style.clipPath = "inset(0)";
            word.style.transform = "none";
            word.style.position = "static";
            word.style.left = "auto";
            word.style.right = "auto";
            word.style.top = "auto";
            word.style.bottom = "auto";
            word.style.maxWidth = "none";
            word.style.width = "auto";
            word.style.display = "block";
            word.style.textAlign = "center";
          });
          if (heroZoomCue) heroZoomCue.style.opacity = "0";
          return;
        }

        const sceneRect = heroZoomScene.getBoundingClientRect();
        const stickyTop = Number.parseFloat(getComputedStyle(heroZoomSticky).top) || 78;
        const travel = Math.max(1, heroZoomScene.offsetHeight - heroZoomSticky.offsetHeight);
        const rawProgress = clamp((stickyTop - sceneRect.top) / travel);
        const expansion = easeOutCubic(rawProgress / .72);
        const compact = window.innerWidth <= 680;
        const tablet = window.innerWidth <= 900;
        const startClipX = compact ? 6 : tablet ? 13 : 23;
        const startClipY = compact ? 12 : tablet ? 15 : 18;

        heroZoomCanvas.style.setProperty("--zoom-clip-y", `${(startClipY * (1 - expansion)).toFixed(3)}%`);
        heroZoomCanvas.style.setProperty("--zoom-clip-x", `${(startClipX * (1 - expansion)).toFixed(3)}%`);
        heroZoomCanvas.style.setProperty("--zoom-radius", `${(30 * (1 - expansion)).toFixed(2)}px`);
        heroZoomCanvas.style.setProperty("--zoom-screen-scale", (1.055 - expansion * .055).toFixed(4));

        const shadeProgress = easeOutCubic((rawProgress - .25) / .48);
        heroZoomCanvas.style.setProperty("--zoom-shade", (.12 + shadeProgress * .34).toFixed(3));

        const sloganProgress = easeOutCubic((rawProgress - .46) / .27);
        if (sloganOne) {
          sloganOne.style.opacity = sloganProgress.toFixed(3);
          sloganOne.style.clipPath = `inset(0 0 ${((1 - sloganProgress) * 100).toFixed(2)}% 0)`;
          sloganOne.style.transform = `translateY(${((1 - sloganProgress) * 42).toFixed(2)}px)`;
        }
        if (sloganTwo) {
          sloganTwo.style.opacity = sloganProgress.toFixed(3);
          sloganTwo.style.clipPath = `inset(${((1 - sloganProgress) * 100).toFixed(2)}% 0 0 0)`;
          sloganTwo.style.transform = `translateY(${((1 - sloganProgress) * -42).toFixed(2)}px)`;
        }
        if (heroZoomCue) heroZoomCue.style.opacity = clamp((rawProgress - .68) / .16).toFixed(3);
      };

      /* 05. DAILY USE-CASE STORY STACK*/
      const updatePhotoStory = () => {
        if (!storyWraps.length) return;

        if (reduceMotion.matches || mobileStory.matches) {
          storyCards.forEach(card => {
            card.style.setProperty("--stack-scale", "1");
            card.style.setProperty("--stack-offset", "0px");
          });
          storyPhotos.forEach(photo => photo.style.setProperty("--media-scale", "1"));
          return;
        }

        const stickyTop = Number.parseFloat(getComputedStyle(storyWraps[0]).top) || 94;
        const cardHeight = storyWraps[0].offsetHeight;
        const overlapRange = cardHeight * .76;

        storyWraps.forEach((wrap, index) => {
          let cardsAbove = 0;

          for (let nextIndex = index + 1; nextIndex < storyWraps.length; nextIndex += 1) {
            const nextTop = storyWraps[nextIndex].getBoundingClientRect().top;
            cardsAbove += clamp((stickyTop + overlapRange - nextTop) / overlapRange);
          }

          const wrapTop = wrap.getBoundingClientRect().top;
          const isAtStickyTop = clamp((stickyTop + 64 - wrapTop) / 64);
          const scale = Math.max(.82, 1 - cardsAbove * .075);
          const offset = index * 14 * isAtStickyTop;
          const entrance = clamp((window.innerHeight - wrapTop) / (window.innerHeight * .72));

          storyCards[index].style.setProperty("--stack-scale", scale.toFixed(4));
          storyCards[index].style.setProperty("--stack-offset", `${offset.toFixed(2)}px`);
          storyPhotos[index].style.setProperty("--media-scale", (1.065 - entrance * .065).toFixed(4));
        });
      };

      /* animation frame for both scroll-driven scenes */
      const requestStoryUpdate = () => {
        if (storyFrame) return;
        storyFrame = requestAnimationFrame(() => {
          storyFrame = 0;
          updateHeroZoom();
          updatePhotoStory();
        });
      };

      /* 06. PAYMENT-CHANNEL POINTER TILT*/
      const interactiveMotionAllowed = () => finePointer.matches && !reduceMotion.matches && window.innerWidth > 900;

      if (paymentUniverse) {
        paymentUniverse.addEventListener("pointermove", event => {
          if (!interactiveMotionAllowed()) return;
          const rect = paymentUniverse.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - .5;
          const y = (event.clientY - rect.top) / rect.height - .5;
          paymentUniverse.style.setProperty("--orbit-x", `${(-y * 5).toFixed(2)}deg`);
          paymentUniverse.style.setProperty("--orbit-y", `${(x * 7).toFixed(2)}deg`);
        });
        paymentUniverse.addEventListener("pointerleave", () => {
          paymentUniverse.style.setProperty("--orbit-x", "0deg");
          paymentUniverse.style.setProperty("--orbit-y", "0deg");
        });
      }

      /* 07. FAQ ACCORDION*/
      faqCards.forEach(card => {
        card.addEventListener("toggle", () => {
          if (!card.open) return;
          faqCards.forEach(other => {
            if (other !== card) other.open = false;
          });
        });
      });

      faqMore?.addEventListener("click", () => {
        const expanded = faqSection.classList.toggle("is-expanded");
        faqMore.setAttribute("aria-expanded", String(expanded));
        const label = faqMore.querySelector(".faq-more-label");
        if (label) label.textContent = expanded
          ? localizedText("عرض أسئلة أقل", "Show Fewer Questions")
          : localizedText("عرض المزيد من الأسئلة", "Show More Questions");
        if (!expanded) {
          faqSection.querySelectorAll(".faq-extra").forEach(item => { item.open = false; });
        }
      });

      /* 08. PRICING DETAIL TOGGLE */
      pricingToggle?.addEventListener("click", () => {
        const expanded = pricingSection.classList.toggle("is-expanded");
        pricingToggle.setAttribute("aria-expanded", String(expanded));
        const label = pricingToggle.querySelector(".pricing-toggle-label");
        if (label) label.textContent = expanded
          ? localizedText("إخفاء تفاصيل الخطط", "Hide Plan Details")
          : localizedText("عرض جميع تفاصيل الخطط", "Show All Plan Details");
      });

      /* 09. PAGE SCROLL STATE*/
      const onScroll = () => {
        nav.classList.toggle("is-scrolled", window.scrollY > 12);
        const distance = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = `${distance > 0 ? (window.scrollY / distance) * 100 : 0}%`;
        requestStoryUpdate();
      };

      /* 10. MOBILE NAVIGATION */
      const closeMenu = () => {
        menu.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", localizedText("فتح قائمة التنقل", "Open navigation menu"));
      };

      toggle.addEventListener("click", () => {
        const open = !menu.classList.contains("is-open");
        menu.classList.toggle("is-open", open);
        document.body.classList.toggle("menu-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open
          ? localizedText("إغلاق قائمة التنقل", "Close navigation menu")
          : localizedText("فتح قائمة التنقل", "Open navigation menu"));
      });

      /* Refresh dynamic labels*/
      window.addEventListener("qredit:languagechange", () => {
        const faqLabel = faqMore?.querySelector(".faq-more-label");
        if (faqLabel) faqLabel.textContent = faqSection.classList.contains("is-expanded")
          ? localizedText("عرض أسئلة أقل", "Show Fewer Questions")
          : localizedText("عرض المزيد من الأسئلة", "Show More Questions");

        const pricingLabel = pricingToggle?.querySelector(".pricing-toggle-label");
        if (pricingLabel) pricingLabel.textContent = pricingSection.classList.contains("is-expanded")
          ? localizedText("إخفاء تفاصيل الخطط", "Hide Plan Details")
          : localizedText("عرض جميع تفاصيل الخطط", "Show All Plan Details");

        toggle.setAttribute("aria-label", menu.classList.contains("is-open")
          ? localizedText("إغلاق قائمة التنقل", "Close navigation menu")
          : localizedText("فتح قائمة التنقل", "Open navigation menu"));
      });

      menu.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
      /* 11. GLOBAL EVENT LISTENERS AND INITIAL STATE */
      window.addEventListener("resize", () => {
        if (window.innerWidth > 900) closeMenu();
        if (!interactiveMotionAllowed()) {
          paymentUniverse?.style.setProperty("--orbit-x", "0deg");
          paymentUniverse?.style.setProperty("--orbit-y", "0deg");
        }
        requestStoryUpdate();
      });
      window.addEventListener("scroll", onScroll, { passive: true });
      reduceMotion.addEventListener?.("change", requestStoryUpdate);
      mobileStory.addEventListener?.("change", requestStoryUpdate);
      onScroll();

      /* 12. ONE-TIME REVEAL-ON-SCROLL FOR ELEMENTS WITH .reveal */
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: .12, rootMargin: "0px 0px -40px" });
        document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
      } else {
        document.querySelectorAll(".reveal").forEach(element => element.classList.add("is-visible"));
      }
    })();
