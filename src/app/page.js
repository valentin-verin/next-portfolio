"use client";

import { useState, useEffect, useRef } from "react";
import Footer from "./footer";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import styles from "./page.module.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // Import du plugin

export default function Home() {
  const [heightsAdjusted, setHeightsAdjusted] = useState(false); // Suivi si les hauteurs ont été ajustées
  const buttonRef = useRef(null);
  const boxesContainerRef = useRef(null);
  const topSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const projectsSectionRef = useRef(null);

  useEffect(() => {
    
    // Initialisation des fonctionnalités
    const cleanupMouseTrail = initializeMouseTrail();
    const cleanupHandScroll = initializeHandScroll();
    const cleanupScrollPercentage = initializeScrollPercentage();
    const cleanupMouseButton = initializeMouseButton(buttonRef);
    const oneDataElements = gsap.utils.toArray(`.${styles.oneData}`);

    //console.log(oneDataElements);

    let elements = document.querySelectorAll(".text");

    elements.forEach((element) => {
      let innerText = element.innerText;
      element.innerHTML = "";

      let textContainer = document.createElement("div");
      textContainer.classList.add(styles.block); // Utilisation de la classe CSS Module pour "block"

      for (let letter of innerText) {
        let span = document.createElement("span");
        span.innerText = letter.trim() === "" ? "\xa0" : letter;
        span.classList.add(styles.letter); // Utilisation de la classe CSS Module pour "letter"
        textContainer.appendChild(span);
      }

      element.appendChild(textContainer);
      element.appendChild(textContainer.cloneNode(true));
    });

    elements.forEach((element) => {
      element.addEventListener("mouseover", () => {
        element.classList.remove(styles.play); // Utilisation de la classe CSS Module pour "play" (si définie)
      });
    });

    // Vérifier que GSAP et Draggable sont disponibles
    gsap.registerPlugin(Draggable, ScrollTrigger, ScrollToPlugin);

    // div reveal
    oneDataElements.forEach((element, index) => {
      gsap.from(element, {
        opacity: 0,
        y: 50, // Déplacement vertical initial
        duration: 1, // Durée de chaque animation
        ease: "power2.out", // Courbe d'animation
        stagger: 0.3, // Décalage entre chaque animation (un par un)
        scrollTrigger: {
          trigger: element, // Chaque élément est maintenant un trigger individuel
          start: "top 75%", // L'animation commence lorsque le haut de l'élément atteint 80% de la fenêtre
          end: "top 20%", // L'animation continue jusqu'à ce que l'élément atteigne 20% de la fenêtre
          toggleActions: "play none none none", // Joue l'animation uniquement une fois
        },
      });
    });

    //     //Initialisation des boîtes draggable
    if (boxesContainerRef.current) {
      const boxes = gsap.utils.toArray(".draggable-box");
      if (boxes.length > 0) {
        console.log("Boîtes trouvées :", boxes);

        const containerRect = boxesContainerRef.current.getBoundingClientRect();

        // Boîtes qui seront rendues draggable (toutes sauf la cinquième)
        const draggableBoxes = [];

        boxes.forEach((box, index) => {
          if (index === 4) {
            // Positionner la cinquième boîte au centre
            const centerX = (containerRect.width - box.offsetWidth) / 2;
            const centerY = (containerRect.height - box.offsetHeight) / 2;

            gsap.set(box, { x: centerX, y: centerY });
          } else {
            // Ajouter cette boîte à la liste des draggables
            const centerX = (containerRect.width - box.offsetWidth) / 2;
            const centerY = (containerRect.height - box.offsetHeight) / 2;

            gsap.set(box, { x: centerX, y: centerY });
            draggableBoxes.push(box);
          }
        });

        // Animation pour repositionner les boîtes
        const totalChanges = 15; // Nombre total de changements de position
        const totalDuration = 500; // Durée totale en millisecondes (5 secondes)
        let interval = totalDuration / totalChanges; // Temps initial entre chaque changement

        let changes = 0; // Compteur de changements

        const repositionBoxes = () => {
          draggableBoxes.forEach((box) => {
            const randomX = gsap.utils.random(
              0,
              containerRect.width - box.offsetWidth
            );
            const randomY = gsap.utils.random(
              0,
              containerRect.height - box.offsetHeight
            );
            gsap.to(box, {
              x: randomX,
              y: randomY,
              duration: 20,
              ease: "expo.out",
            }); // Très lent vers la fin
          });

          changes += 1;
          if (changes < totalChanges) {
            interval *= 1.2; // Augmenter le délai progressivement
            setTimeout(repositionBoxes, interval);
          }
        };

        // Lancer la première animation
        repositionBoxes();

        // Rendre les boîtes (sauf la cinquième) draggable après l'animation
        Draggable.create(draggableBoxes, {
          bounds: boxesContainerRef.current, // Limiter le déplacement au conteneur
          zIndex: true, // Améliorer le z-index au clic
          cursor: false,
        });
        Draggable.zIndex = 99;
      }
    }

    // S'assurer que ScrollTrigger est bien chargé
    gsap.registerPlugin(ScrollTrigger);

    const cards = [
      { id: `.${styles.card1}`, endTranslatex: -2000, rotate: 45 },
      { id: `.${styles.card2}`, endTranslatex: -1000, rotate: -30 },
      { id: `.${styles.card3}`, endTranslatex: -2000, rotate: 45 },
      { id: `.${styles.card4}`, endTranslatex: -1500, rotate: -30 },
      { id: `.${styles.card5}`, endTranslatex: -1500, rotate: -30 },
      { id: `.${styles.card6}`, endTranslatex: -1500, rotate: 30 },
      { id: `.${styles.card7}`, endTranslatex: -1500, rotate: -45 },
    ];
    ScrollTrigger.create({
      trigger: `.${styles.wrapper404}`,
      start: "top top",
      end: "+=4000vh", // Durée synchronisée avec le contenu
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        // Calculer dynamiquement la largeur totale du contenu
        const contentWidth = document.querySelector(
          `.${styles.wrapper404}`
        ).scrollWidth;
        const viewportWidth = window.innerWidth;
        const maxDistance = contentWidth - viewportWidth;

        // Calculer la distance horizontale en fonction de la progression
        const horizontalDistance = -maxDistance * self.progress;

        gsap.to(`.${styles.wrapper404}`, {
          x: `${horizontalDistance}px`,
          duration: 0.5,
          ease: "power3.out",
        });
      },
    });

    const cardElements = gsap.utils.toArray(`.${styles.card}`);

    cardElements.forEach((card, index) => {
      const config = cards[index];
      if (config) {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          end: "+=7200vh",
          scrub: 1,
          onUpdate: (self) => {
            gsap.to(card, {
              x: `${config.endTranslatex * self.progress * 0.9}px`,
              rotate: `${config.rotate * self.progress}`,
              duration: 0.5,
              ease: "power3.out",
            });
          },
        });
      }
    });








    const slides = gsap.utils.toArray(`.${styles.slide}`);
    const activeSlideImages = gsap.utils.toArray(`.${styles.activeSlide} img`);
    
    // Son à jouer au changement de slide
    const audio = new Audio('./../sound/wind-2.mp3'); // Assure-toi que ce chemin est correct
    let lastActiveIndex = -1;
    
    function getInitialTranslateZ(slide) {
      const style = window.getComputedStyle(slide);
      const matrix = style.transform.match(/matrix3d\((.+)\)/);
      if (matrix) {
        const values = matrix[1].split(", ");
        return parseFloat(values[14] || 0);
      }
      return 0;
    }
    
    function mapRange(value, inMin, inMax, outMin, outMax) {
      return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }
    
    slides.forEach((slide, index) => {
      const initialZ = getInitialTranslateZ(slide);
    
      ScrollTrigger.create({
        trigger: `.${styles.projectsContainer}`,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const zIncrement = progress * 20000;
          const currentZ = initialZ + zIncrement;
    
          // Opacité en fonction de la profondeur
          let opacity;
          if (currentZ > -2500) {
            opacity = mapRange(currentZ, -2500, 0, 0.5, 1);
          } else {
            opacity = mapRange(currentZ, -5000, -2500, 0, 0.5);
          }
    
          // Effet inversé : moins flou et plus grand en s'approchant
          const scale = mapRange(currentZ, -5000, 0, 0.8, 1);
          const blur = mapRange(currentZ, -5000, 0, 10, 0);
    
          slide.style.opacity = opacity;
          slide.style.transform = `translateX(-50%) translateY(-20%) translateZ(${currentZ}px) scale(${scale})`;
          slide.style.filter = `blur(${blur}px)`;
    
          // Affiche ou cache les images selon la profondeur
          if (currentZ < 700) {
            gsap.to(activeSlideImages[index], {
              opacity: 1,
              duration: 1.5,
              ease: "power3.out",
            });
          } else {
            gsap.to(activeSlideImages[index], {
              opacity: 0,
              duration: 1.5,
              ease: "power3.out",
            });
          }
    
          // 🔈 Détection de slide "active" et lecture du son
          if (currentZ >= -1900 && currentZ <= -1890) {
            if (lastActiveIndex !== index) {
              lastActiveIndex = index;
              audio.currentTime = 0;
              audio.play().catch((e) => {
                // Peut échouer si l'utilisateur n'a pas interagi avec la page
                console.warn("Impossible de jouer le son :", e);
              });
            }
          }
        },
      });
    });
    





    

    // Nettoyage des effets au démontage
    return () => {
      cleanupMouseTrail();
      cleanupHandScroll();
      cleanupScrollPercentage();
      cleanupMouseButton();

      // Nettoyage des Draggables
      const draggables = Draggable.getAll?.();
      if (draggables && draggables.length > 0) {
        draggables.forEach((draggable) => draggable.kill());
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Fonction qui modifie les hauteurs et ajoute un margin-right avec délai pour la soundBox
  function adjustHeights() {
    console.log("adjustHeights appelé");

    // Tailles originales des boxes
    const originalHeights = [8, 8, 8, 10, 12, 14, 18, 20]; // Mets ici les tailles d'origine
    const newHeights = [4, 8, 10, 18, 28, 20, 12, 16];

    const boxes = document.querySelectorAll(`.${styles.soundBox}`);
    const audioElement = document.getElementById("a1");

    if (boxes.length === 0) {
      console.log("Aucune boîte trouvée !");
      return;
    }

    // Si les hauteurs ont déjà été ajustées, on remet les tailles d'origine
    if (heightsAdjusted) {
      console.log("Remettre les tailles d'origine");

      boxes.forEach((box, index) => {
        setTimeout(() => {
          box.style.height = `${originalHeights[index]}px`;
          box.style.marginRight = index === 1 ? "2px" : "0px"; // Ajout de 2px pour la deuxième boîte
        }, index * 100);
      });

      // Stopper l'audio
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0; // Remettre l'audio au début
      }

      setHeightsAdjusted(false); // Réinitialise l'état des tailles
    } else {
      console.log("Ajuster les hauteurs");

      boxes.forEach((box, index) => {
        setTimeout(() => {
          box.style.height = `${newHeights[index]}px`;
          box.style.marginRight = "2px"; // Ajoute une marge à droite
        }, index * 100);
      });

      // Jouer l'audio
      if (audioElement) {
        audioElement.play();
      }

      setHeightsAdjusted(true); // Les hauteurs ont été ajustées
    }
  }

  // Fonction pour scroll vers une section
  const scrollToSection = (ref) => {
    gsap.to(window, {
      duration: 1, // Durée de l'animation du scroll
      scrollTo: ref.current, // Cible l'élément référencé
      ease: "power2.out", // Courbe d'animation
    });
  };

  /************   HTML   *********************************************************/

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p id="visitedPercent" className={styles.visitedPercent}>
          0%
        </p>
        <img src="/vv.svg" className={styles.vv} id="vv" />

        <div className={styles.speaker} id="speaker" onClick={adjustHeights}>
          <div className={styles.soundBox} id={styles.soundBox1}></div>
          <div className={styles.soundBox} id={styles.soundBox2}></div>
          <div className={styles.soundBox} id={styles.soundBox3}></div>
          <div className={styles.soundBox} id={styles.soundBox4}></div>
          <div className={styles.soundBox} id={styles.soundBox5}></div>
          <div className={styles.soundBox} id={styles.soundBox6}></div>
          <div className={styles.soundBox} id={styles.soundBox7}></div>
          <div className={styles.soundBox} id={styles.soundBox8}></div>
        </div>
      </div>

      <div ref={topSectionRef} className={styles.pageContainer}>
        <audio id="a1" autoPlay loop>
          <source src="./../sound/ambiance.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        {/*************** PROJECTS **********************************************/}

        <div ref={projectsSectionRef} className={styles.projects}>
          <div className={styles.projectsContainer}>
            <div className={styles.activeSlide}>
              <img src={`/img/amd.png`} />
              <img src={`/img/vevolve.png`} />
              <img src={`/img/TS.png`} />
              <img src={`/img/texeira.png`} />
              <img src={`/img/bitkraft.png`} />
              <img src={`/img/fitkids.png`} />
              <img src={`/img/rotor.png`} />
            </div>

            <div className={styles.slider}>
              <div className={styles.slide} id={styles.slide1}>
                <div className={styles.slideCopy}>
                  <p>Aux milles délices</p>
                  <p id={styles.index}>ux - flow - ui</p>
                </div>
                <div className={styles.slideImg}>
                  <img src={`/img/amd.png`} />
                </div>
              </div>
              <div className={styles.slide} id={styles.slide2}>
                <div className={styles.slideCopy}>
                  <p>Vevolve</p>
                  <p id={styles.index}>App - Brand</p>
                </div>
                <div className={styles.slideImg}>
                <img src={`/img/vevolve.png`} />
                </div>
              </div>
              <div className={styles.slide} id={styles.slide3}>
                <div className={styles.slideCopy}>
                  <p>Douvitch's SkateShop</p>
                  <p id={styles.index}>Identité Visuelle, Image</p>
                </div>
                <div className={styles.slideImg}>
                  <img src={`/img/douv.png`} />
                </div>
              </div>
              <div className={styles.slide} id={styles.slide4}>
                <div className={styles.slideCopy}>
                  <p>TeamSquare</p>
                  <p id={styles.index}>Front-end</p>
                </div>
                <div className={styles.slideImg}>
                  <img src={`/img/TS.png`} />
                </div>
              </div>
              <div className={styles.slide} id={styles.slide5}>
                <div className={styles.slideCopy}>
                  <p>Texeira Creation</p>
                  <p id={styles.index}>LP Design</p>
                </div>
                <div className={styles.slideImg}>
                  <img src={`/img/texeira.png`} />
                </div>
              </div>
              <div className={styles.slide} id={styles.slide6}>
                <div className={styles.slideCopy}>
                  <p>BITKRAFT Redesign</p>
                  <p id={styles.index}>UI - UX - 3D</p>
                </div>
                <div className={styles.slideImg}>
                  <img src={`/img/bitkraft.png`} />
                </div>
              </div>
              <div className={styles.slide} id={styles.slide7}>
                <div className={styles.slideCopy}>
                  <p>Fitkids</p>
                  <p id={styles.index}>Branding - DA - App</p>
                </div>
                <div className={styles.slideImg}>
                  <img src={`/img/fitkids.png`} />
                </div>
              </div>
              <div className={styles.slide} id={styles.slide8}>
              <div className={styles.slideCopy}>
                  <p>Rotor</p>
                  <p id={styles.index}>UI - VR</p>
                </div>
                <div className={styles.slideImg}>
                  <img src={`/img/rotor.png`} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*************** PUZZLE **********************************************/}

        <div ref={boxesContainerRef} className={styles.draggableContainer}>
          {/* Boîtes draggable */}
          <img
            src={`/img/P1.png`}
            alt="Draggable"
            className={`draggable-box ${styles.box}`}
          />
          <img
            src={`/img/P2.png`}
            alt="Draggable"
            className={`draggable-box ${styles.box}`}
          />
          <img
            src={`/img/P3.png`}
            alt="Draggable"
            className={`draggable-box ${styles.box}`}
          />
          <img
            src={`/img/P4.png`}
            alt="Draggable"
            className={`draggable-box ${styles.box}`}
          />
          <img
            src={`/img/P5.png`}
            alt="Draggable"
            className={`draggable-box ${styles.box}`}
          />
          <img
            src={`/img/P6.png`}
            alt="Draggable"
            className={`draggable-box ${styles.box}`}
          />
          <img
            src={`/img/P7.png`}
            alt="Draggable"
            className={`draggable-box ${styles.box}`}
          />
          <img
            src={`/img/P8.png`}
            alt="Draggable"
            className={`draggable-box ${styles.box}`}
          />
          <img
            src={`/img/P9.png`}
            alt="Draggable"
            className={`draggable-box ${styles.box}`}
          />
          <img
            src={`/img/P10.png`}
            alt="Draggable"
            className={`draggable-box ${styles.box}`}
          />
          <img
            src={`/img/P11.png`}
            alt="Draggable"
            className={`draggable-box ${styles.box}`}
          />
          <img
            src={`/img/P12.png`}
            alt="Draggable"
            className={`draggable-box ${styles.box}`}
          />
          <img
            src={`/img/P13.png`}
            alt="Draggable"
            className={`draggable-box ${styles.box}`}
          />
        </div>

        {/*************** ABOUT **********************************************/}

        <div ref={aboutSectionRef} className={styles.datas}>
          <div className={`${styles.oneData} ${styles.selfRight}`}>
            <h2>
              <span className={styles.sectionNb}>01 I</span>nfos
            </h2>
          </div>
          <div className={`${styles.oneData} ${styles.selfRight}`}>
            <p>Arras - France</p>
            <p>06 24 02 13 60</p>
            <a href="mailto: vverinpro@gmail.com">
              <p>vverinpro@gmail.com</p>
            </a>
          </div>
          <div className={styles.oneData}>
            <h2>
              <span className={styles.sectionNb}>02 E</span>ducation
            </h2>
          </div>
          <div className={styles.oneData}>
            <h2>2024 - 2025 UQAC, QC</h2>
            <p>Bacalauréat Informatique</p>
            <p>
              Augmented and Virtual Reality, UX/UI Design, Video Game
              Development, Mobile Application Development, Natural Language
              Processing, Project Management, and Advanced Web Programming
            </p>
          </div>
          <div className={styles.oneData}>
            <h2>2024 ISPGAYA, PT</h2>
            <p>Exchange program</p>
            <p>
              Graphic Computing, including Design and Multimedia, Web
              Technologies and Applications, Branding and Content Management, as
              well as Entrepreneurship, Seminars, and a Business Project.
            </p>
          </div>
          <div className={styles.oneData}>
            <h2>2022 - 2025 IUT de Lens</h2>
            <p>BUT MMI</p>
            <p>
              Understand ecosystems, user needs, and digital communication tools
              to co-design an effective strategic response to complex issues by
              delivering a message through digital media. Develop skills in web
              and digital media development, and gain insight into entering the
              digital sector.
            </p>
          </div>
          <div className={styles.oneData}>
            <h2>2020 - 2022 CESI Lille</h2>
            <p>Développeur Informatique</p>
            <p>Work-study contract</p>
            <p>
              Analysing the company's software requirements and formalising a
              preliminary study to design, develop, deploy and maintain a
              website or mobile / IT application. Developing professional
              practices.
            </p>
          </div>

          <div className={`${styles.oneData} ${styles.selfRight}`}>
            <h2>
              <span className={styles.sectionNb}>03 W</span>ork Experience
            </h2>
          </div>

          <div className={`${styles.oneData} ${styles.selfRight}`}>
            <h2>2024 - Now Freelance</h2>
            <p>UX/UI & FrontEnd Developer</p>
            <p>
              Passionate Front-End Developer and UX/UI Designer, dedicated to
              crafting intuitive and visually compelling digital experiences. I
              seamlessly combine creativity and technology to bring ideas to
              life through user-centered solutions.
            </p>
          </div>
          <div className={`${styles.oneData} ${styles.selfRight}`}>
            <h2>2020 - 2022 Bils-Deroo</h2>
            <p>Software Developer</p>
            <p>Work-study contract</p>
            <p>
              Intranet development: Training and property management
              application.
            </p>
            <p>C# - ASP.NET Core Blazor - IBM DB2 - ClickUp</p>
          </div>
        </div>

        {/*************** TOOLS **********************************************/}

        <div className={styles.container}>
          <section className={styles.wrapper404}>
            <h1 className={styles.explora}>
              TOOLS THAN I USE MORE THAN MY LEGS
            </h1>
            <div className={styles.card} id={styles.card1}>
              <img src={`/img/tool1.png`} className={`${styles.fImg}`} />
            </div>
            <div className={styles.card} id={styles.card2}>
              <img
                src={`/img/tool2.png`}
                alt="Draggable"
                className={`${styles.fImg}`}
              />
            </div>
            <div className={styles.card} id={styles.card3}>
              <img src={`/img/tool3.png`} className={`${styles.fImg}`} />
            </div>
            <div className={styles.card} id={styles.card4}>
              <img src={`/img/tool4.png`} className={`${styles.fImg}`} />
            </div>
            <div className={styles.card} id={styles.card5}>
              <img src={`/img/tool5.png`} className={`${styles.fImg}`} />
            </div>
            <div className={styles.card} id={styles.card6}>
              <img src={`/img/tool6.png`} className={`${styles.fImg}`} />
            </div>
            <div className={styles.card} id={styles.card7}>
              <img src={`/img/tool7.png`} className={`${styles.fImg}`} />
            </div>
          </section>
        </div>

        {/*************** MAIL **********************************************/}

        <a href="mailto: vverinpro@gmail.com">
          <div className={styles.splineContainer}>
            <p className={styles.collabCTA}>
              <span className={styles.sectionNb}>O</span>FFER A DIGITAL
              EXPERIENCE THAT LIVES UP TO YOUR IDEAS
            </p>
            <script
              type="module"
              src="https://unpkg.com/@splinetool/viewer@1.9.63/build/spline-viewer.js"
            ></script>
            <spline-viewer
              url="https://prod.spline.design/3EHfse5AG9zw7mhY/scene.splinecode"
              className={styles.viewer}
            ></spline-viewer>
            <div ref={buttonRef} className={styles.floatingButton}>
              Click to mail me
            </div>
          </div>
        </a>
      </div>
      {/*************** FOOTER **********************************************/}

      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <a href="mailto: vverinpro@gmail.com">
            <p className={styles.contactTitle}>Contact</p>
          </a>
          <a href="mailto:vverinpro@gmail.com">vverinpro@gmail.com</a>
        </div>
        <div className={styles.footerMiddle}>
          <p>2024 - © VALENTIN VERIN</p>
        </div>
        <div className={styles.footerRight}>
          <div className={styles.footerRightContainer}>
            <p
              className={`${styles.fImg}, ${styles.text} text`}
              onClick={() => scrollToSection(topSectionRef)}
            >
              Top
            </p>
            <p
              className={`${styles.fImg}, ${styles.text} text`}
              onClick={() => scrollToSection(aboutSectionRef)}
            >
              About
            </p>
            <p 
              className={`${styles.fImg}, ${styles.text} text`}
              onClick={() => scrollToSection(projectsSectionRef)}
            >
              Project
            </p>
            <a href="/nowhere">
              <p className={`${styles.fImg}, ${styles.text} text`}>Nowhere</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// suivi de la souris
function initializeMouseTrail() {
  const points = [];
  let lastPointTime = 0; // Temps de la dernière création de point
  let isMouseTrailActive = true; // Variable pour activer/désactiver le suivi

  // Fonction qui gère le comportement du curseur
  const handleMouseMove = (event) => {
    if (!isMouseTrailActive) return; // Si désactivé, ne pas exécuter

    const newPoint = { x: event.pageX, y: event.pageY };
    const currentTime = Date.now();

    // Ne pas créer de point si le dernier point a été créé il y a moins de 50 ms
    if (currentTime - lastPointTime < 50) return;

    // Vérifier l'espacement minimum de 5 pixels avec les autres points
    const isTooClose = points.some((point) => {
      const distance = Math.sqrt(
        Math.pow(point.x - newPoint.x, 2) + Math.pow(point.y - newPoint.y, 2)
      );
      return distance < 5; // Distance minimum de 5 pixels
    });

    if (isTooClose) return; // Si trop proche, ne pas créer le point

    // Créer un nouveau point à la position de la souris
    let point = document.createElement("div");
    point.classList.add(styles.dot);
    point.style.top = newPoint.y + "px";
    point.style.left = newPoint.x + "px";
    document.body.appendChild(point);

    // Ajouter un chiffre aléatoire 0 ou 1 dans chaque point
    point.innerText = Math.random() < 0.5 ? "0" : "1"; // Générer 0 ou 1 aléatoirement

    // Ajouter le point à la liste des points
    points.push(newPoint);
    lastPointTime = currentTime; // Mettre à jour le temps de la dernière création de point

    // Ajouter une classe pour rendre l'élément invisible après 1 seconde
    setTimeout(() => {
      point.classList.add(styles.hidden);
    }, 100);

    // Supprimer le point après la transition d'opacité pour ne pas encombrer le DOM
    setTimeout(() => {
      point.remove();
      // Retirer le point de la liste
      points.shift();
    }, 1100); // Attendre un peu plus que la transition d'opacité
  };

  // Attacher l'événement de mouvement de la souris
  document.addEventListener("mousemove", handleMouseMove);

  // Gestion des événements pour activer/désactiver le suivi
  const splineContainer = document.querySelector(`.${styles.splineContainer}`);
  if (splineContainer) {
    splineContainer.addEventListener("mouseenter", () => {
      isMouseTrailActive = false; // Désactiver le suivi
    });

    splineContainer.addEventListener("mouseleave", () => {
      isMouseTrailActive = true; // Réactiver le suivi
    });
  }

  // Retourne une fonction de nettoyage pour désactiver l'effet
  return () => {
    document.removeEventListener("mousemove", handleMouseMove);
    if (splineContainer) {
      splineContainer.removeEventListener("mouseenter", () => {
        isMouseTrailActive = false;
      });

      splineContainer.removeEventListener("mouseleave", () => {
        isMouseTrailActive = true;
      });
    }
  };
}

// effet de réduction au scroll
function initializeHandScroll() {
  const handleScroll = () => {
    const vvElement = document.getElementById("vv");
    if (vvElement) {
      const scrollY = window.scrollY;
      const minScale = window.innerWidth < 900 ? 0.7 : 0.2;
      const scale = Math.max(minScale, 1 - scrollY / 500); // Minimum 15% de l'échelle

      // Modifier l'origine de transformation pour aligner en haut
      vvElement.style.transformOrigin = "top center";
      vvElement.style.transform = `scale(${scale})`;
    }
  };

  // Ajouter l'écouteur d'événement pour le scroll
  window.addEventListener("scroll", handleScroll);

  // Retourner la fonction de nettoyage pour l'événement scroll
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}

// pourcentage de la page visité
function initializeScrollPercentage() {
  const updateScrollPercentage = () => {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    // Calculer le pourcentage de la page visité
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

    // Mettre à jour l'élément visité avec le pourcentage
    const visitedPercentElement = document.getElementById("visitedPercent");
    if (visitedPercentElement) {
      visitedPercentElement.textContent = `${Math.min(
        Math.max(scrollPercent, 0),
        100
      ).toFixed(0)}%`;
    }
  };

  // Ajouter l'écouteur d'événement pour le scroll
  window.addEventListener("scroll", updateScrollPercentage);

  // Appeler la fonction une première fois pour prendre en compte la position initiale
  updateScrollPercentage();

  // Retourner la fonction de nettoyage pour l'événement scroll
  return () => {
    window.removeEventListener("scroll", updateScrollPercentage);
  };
}

function initializeMouseButton(buttonRef) {
  const splineContainer = document.querySelector(`.${styles.splineContainer}`);
  const button = buttonRef.current;

  if (!splineContainer || !button) {
    console.error("SplineContainer or button not found");
    return () => {}; // Retourne une fonction vide si l'élément n'existe pas
  }

  // Rendre le bouton positionnable avec `absolute`
  button.style.position = "absolute";
  button.style.opacity = 0; // Invisible par défaut

  const handleMouseMove = (event) => {
    const containerRect = splineContainer.getBoundingClientRect();
    const x = event.clientX - containerRect.left; // Coordonnée relative au conteneur
    const y = event.clientY - containerRect.top;

    const offsetX = -120; // Décalage horizontal
    const offsetY = -30; // Décalage vertical

    // Utiliser l'animation pour déplacer le bouton avec un délai
    button.animate(
      {
        left: `${x + offsetX}px`, // Position horizontale avec décalage
        top: `${y + offsetY}px`, // Position verticale avec décalage
      },
      { duration: 1000, fill: "forwards" } // Délai de 500ms
    );

    button.style.opacity = 0.7; // Rendre visible
  };

  const handleMouseLeave = () => {
    button.style.opacity = 0; // Rendre invisible en dehors de la zone
  };

  const handleScroll = () => {
    button.style.opacity = 0; // Rendre invisible lors du scroll
  };

  splineContainer.addEventListener("mousemove", handleMouseMove);
  splineContainer.addEventListener("mouseleave", handleMouseLeave);
  window.addEventListener("scroll", handleScroll); // Écouteur global pour le scroll

  return () => {
    splineContainer.removeEventListener("mousemove", handleMouseMove);
    splineContainer.removeEventListener("mouseleave", handleMouseLeave);
    window.removeEventListener("scroll", handleScroll);
  };
}
