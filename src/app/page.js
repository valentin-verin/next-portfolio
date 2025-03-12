"use client";

import { useEffect, useRef } from "react";
import Footer from "./footer";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import styles from "./page.module.css";

export default function Home() {
  const buttonRef = useRef(null);
  const boxesContainerRef = useRef(null);

  useEffect(() => {
    // Initialisation des fonctionnalités
    const cleanupMouseTrail = initializeMouseTrail();
    const cleanupHandScroll = initializeHandScroll();
    const cleanupScrollPercentage = initializeScrollPercentage();
    const cleanupMouseButton = initializeMouseButton(buttonRef);


    // Vérifier que GSAP et Draggable sont disponibles
    gsap.registerPlugin(Draggable);

    // Initialisation des boîtes draggable
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
            draggableBoxes.push(box);
          }
        });

        // Animation pour repositionner les boîtes
        const totalChanges = 20; // Nombre total de changements de position
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
              duration: 1,
              ease: "expo.out",
            }); // Très lent vers la fin
          });

          changes += 1;
          if (changes < totalChanges) {
            interval *= 1.1; // Augmenter le délai progressivement
            setTimeout(repositionBoxes, interval);
          }
        };

        // Lancer la première animation
        repositionBoxes();

        // Rendre les boîtes (sauf la cinquième) draggable après l'animation
        Draggable.create(draggableBoxes, {
          bounds: window,
          zIndexBoost: true, // Améliorer le z-index au clic
        });
      }
    }

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
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p id="visitedPercent" className={styles.visitedPercent}>
          0%
        </p>
        <img src="/vv.svg" className={styles.vv} id="vv" />
        <img
          aria-hidden
          src="/frame62.svg"
          alt="File icon"
          width={24}
          height={24}
        />
      </div>
      <div className={styles.pageContainer}>
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
        </div>
        <div className={styles.datas}>
          <div className={`${styles.oneData} ${styles.selfRight}`}>
            <h2>#01 Infos</h2>
          </div>
          <div className={`${styles.oneData} ${styles.selfRight}`}>
            <p>Arras - France</p>
            <p>06 24 02 13 60</p>
            <a href="mailto: vverinpro@gmail.com">
              <p>vverinpro@gmail.com</p>
            </a>
          </div>
          <div className={styles.oneData}>
            <h2>#02 Education</h2>
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
            <h2>#03 Work Experience</h2>
            <p>2024 - Now Freelance</p>
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
        <a href="mailto: vverinpro@gmail.com">
          <div className={styles.splineContainer}>
            <p className={styles.collabCTA}>
              OFFREZ UNE EXPÉRIENCE DIGITALE À LA HAUTEUR DE VOS IDÉES
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
      <Footer />
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
      const scale = Math.max(0.4, 1 - scrollY / 500); // Minimum 15% de l'échelle

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

    button.style.opacity = 1; // Rendre visible
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

// "use client";

// "use client";

// import { useEffect, useRef } from "react";
// import Footer from "./footer";
// import gsap from "gsap";
// import { Draggable } from "gsap/Draggable";
// import styles from "./page.module.css";

// export default function Home() {
//   const buttonRef = useRef(null);
//   const boxesContainerRef = useRef(null);

//   useEffect(() => {
//     // Initialisation des fonctionnalités
//     const cleanupMouseTrail = initializeMouseTrail();
//     const cleanupHandScroll = initializeHandScroll();
//     const cleanupScrollPercentage = initializeScrollPercentage();
//     const cleanupMouseButton = initializeMouseButton(buttonRef);

//     // Vérifier que GSAP et Draggable sont disponibles
//     gsap.registerPlugin(Draggable);

//     // Initialisation des boîtes draggable
//     if (boxesContainerRef.current) {
//       const boxes = gsap.utils.toArray(".draggable-box");
//       if (boxes.length > 0) {
//         console.log("Boîtes trouvées :", boxes);

//         // Positionner les boîtes de manière aléatoire
//         boxes.forEach((box) => {
//           const randomX = gsap.utils.random(0, window.innerWidth - 100);
//           const randomY = gsap.utils.random(0, window.innerHeight - 100);

//           gsap.set(box, { x: randomX, y: randomY });
//         });

//         // Rendre les boîtes draggable
//         Draggable.create(boxes, {
//           bounds: window,
//           zIndexBoost: true, // Améliorer le z-index au clic
//         });
//       }
//     }

//     // Nettoyage des effets au démontage
//     return () => {
//       cleanupMouseTrail();
//       cleanupHandScroll();
//       cleanupScrollPercentage();
//       cleanupMouseButton();

//       // Nettoyage des Draggables
//       Draggable.getAll().forEach((draggable) => draggable.kill());
//     };
//   }, []);

//   return (
//     <div className={styles.page}>
//       <div className={styles.header}>
//         <p id="visitedPercent" className={styles.visitedPercent}>
//           0%
//         </p>
//         <img src="/vv.svg" className={styles.vv} id="vv" />
//         <img
//           aria-hidden
//           src="/frame62.svg"
//           alt="File icon"
//           width={24}
//           height={24}
//         />
//       </div>
//       <div className={styles.pageContainer}>
//         <div className={styles.datas}>
//           <div className={styles.oneData}>
//             <h2>Education</h2>
//             <p>STI2D</p>
//             <p>DI 2020 - CESI Lille</p>
//             <p>MMI 2022 - IUT de Lens</p>
//           </div>
//           <div className={styles.oneData}>
//             <h2>Experience</h2>
//             <p>PSA</p>
//             <p>BilsDeroo</p>
//             <p>LaPoste</p>
//             <p>Freelance</p>
//           </div>
//           <div className={`${styles.oneData} ${styles.selfRight}`}>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//           </div>
//           <div className={`${styles.oneData} ${styles.selfRight}`}>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//           </div>
//           <div className={styles.oneData}>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//           </div>
//           <div className={styles.oneData}>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//           </div>
//           <div className={`${styles.oneData} ${styles.selfRight}`}>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//             <h2>Projet ##</h2>
//             <p>Blabla blablabla et blabla</p>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//           </div>
//           <div className={styles.oneData}>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//           </div>
//           <div className={`${styles.oneData} ${styles.selfRight}`}>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//           </div>
//           <div className={styles.oneData}>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//           </div>
//           <div className={styles.oneData}>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//             <h2>Info ##</h2>
//             <p>Blabla blablabla et blabla</p>
//           </div>
//         </div>
//         <div ref={boxesContainerRef} className={styles.draggableContainer}>
//           {/* Boîtes draggable */}
//           <img
//             src={`/img/P1.png`}
//             alt="Draggable"
//             className={`draggable-box ${styles.box}`}
//           />
//           <img
//             src={`/img/P2.png`}
//             alt="Draggable"
//             className={`draggable-box ${styles.box}`}
//           />
//           <img
//             src={`/img/P3.png`}
//             alt="Draggable"
//             className={`draggable-box ${styles.box}`}
//           />
//           <img
//             src={`/img/P4.png`}
//             alt="Draggable"
//             className={`draggable-box ${styles.box}`}
//           />
//           <img
//             src={`/img/P5.png`}
//             alt="Draggable"
//             className={`draggable-box ${styles.box}`}
//           />
//           <img
//             src={`/img/P6.png`}
//             alt="Draggable"
//             className={`draggable-box ${styles.box}`}
//           />
//           <img
//             src={`/img/P7.png`}
//             alt="Draggable"
//             className={`draggable-box ${styles.box}`}
//           />
//           <img
//             src={`/img/P8.png`}
//             alt="Draggable"
//             className={`draggable-box ${styles.box}`}
//           />
//           <img
//             src={`/img/P9.png`}
//             alt="Draggable"
//             className={`draggable-box ${styles.box}`}
//           />
//         </div>
//         <a href="mailto: vverinpro@gmail.com">
//           <div className={styles.splineContainer}>
//             <p className={styles.collabCTA}>
//               OFFREZ UN EXPERIENCE DIGITALE À LA HAUTEUR DE VOS IDÉES
//             </p>
//             <script
//               type="module"
//               src="https://unpkg.com/@splinetool/viewer@1.9.63/build/spline-viewer.js"
//             ></script>
//             <spline-viewer
//               url="https://prod.spline.design/3EHfse5AG9zw7mhY/scene.splinecode"
//               className={styles.viewer}
//             ></spline-viewer>
//             <div ref={buttonRef} className={styles.floatingButton}>
//               Click to mail me
//             </div>
//           </div>
//         </a>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// // Fonction pour initialiser le suivi de la souris
// function initializeMouseTrail() {
//   const points = [];
//   let lastPointTime = 0; // Temps de la dernière création de point
//   let isMouseTrailActive = true; // Variable pour activer/désactiver le suivi

//   // Fonction qui gère le comportement du curseur
//   const handleMouseMove = (event) => {
//     if (!isMouseTrailActive) return; // Si désactivé, ne pas exécuter

//     const newPoint = { x: event.pageX, y: event.pageY };
//     const currentTime = Date.now();

//     // Ne pas créer de point si le dernier point a été créé il y a moins de 50 ms
//     if (currentTime - lastPointTime < 50) return;

//     // Vérifier l'espacement minimum de 5 pixels avec les autres points
//     const isTooClose = points.some((point) => {
//       const distance = Math.sqrt(
//         Math.pow(point.x - newPoint.x, 2) + Math.pow(point.y - newPoint.y, 2)
//       );
//       return distance < 5; // Distance minimum de 5 pixels
//     });

//     if (isTooClose) return; // Si trop proche, ne pas créer le point

//     // Créer un nouveau point à la position de la souris
//     let point = document.createElement("div");
//     point.classList.add(styles.dot);
//     point.style.top = newPoint.y + "px";
//     point.style.left = newPoint.x + "px";
//     document.body.appendChild(point);

//     // Ajouter un chiffre aléatoire 0 ou 1 dans chaque point
//     point.innerText = Math.random() < 0.5 ? "0" : "1"; // Générer 0 ou 1 aléatoirement

//     // Ajouter le point à la liste des points
//     points.push(newPoint);
//     lastPointTime = currentTime; // Mettre à jour le temps de la dernière création de point

//     // Ajouter une classe pour rendre l'élément invisible après 1 seconde
//     setTimeout(() => {
//       point.classList.add(styles.hidden);
//     }, 100);

//     // Supprimer le point après la transition d'opacité pour ne pas encombrer le DOM
//     setTimeout(() => {
//       point.remove();
//       // Retirer le point de la liste
//       points.shift();
//     }, 1100); // Attendre un peu plus que la transition d'opacité
//   };

//   // Attacher l'événement de mouvement de la souris
//   document.addEventListener("mousemove", handleMouseMove);

//   // Gestion des événements pour activer/désactiver le suivi
//   const splineContainer = document.querySelector(`.${styles.splineContainer}`);
//   if (splineContainer) {
//     splineContainer.addEventListener("mouseenter", () => {
//       isMouseTrailActive = false; // Désactiver le suivi
//     });

//     splineContainer.addEventListener("mouseleave", () => {
//       isMouseTrailActive = true; // Réactiver le suivi
//     });
//   }

//   // Retourne une fonction de nettoyage pour désactiver l'effet
//   return () => {
//     document.removeEventListener("mousemove", handleMouseMove);
//     if (splineContainer) {
//       splineContainer.removeEventListener("mouseenter", () => {
//         isMouseTrailActive = false;
//       });

//       splineContainer.removeEventListener("mouseleave", () => {
//         isMouseTrailActive = true;
//       });
//     }
//   };
// }

// // Fonction pour initialiser l'effet de réduction au scroll
// function initializeHandScroll() {
//   const handleScroll = () => {
//     const vvElement = document.getElementById("vv");
//     if (vvElement) {
//       const scrollY = window.scrollY;
//       const scale = Math.max(0.4, 1 - scrollY / 500); // Minimum 15% de l'échelle

//       // Modifier l'origine de transformation pour aligner en haut
//       vvElement.style.transformOrigin = "top center";
//       vvElement.style.transform = `scale(${scale})`;
//     }
//   };

//   // Ajouter l'écouteur d'événement pour le scroll
//   window.addEventListener("scroll", handleScroll);

//   // Retourner la fonction de nettoyage pour l'événement scroll
//   return () => {
//     window.removeEventListener("scroll", handleScroll);
//   };
// }

// // Fonction pour calculer et afficher le pourcentage de la page visité
// function initializeScrollPercentage() {
//   const updateScrollPercentage = () => {
//     const scrollTop = window.scrollY;
//     const documentHeight = document.documentElement.scrollHeight;
//     const windowHeight = window.innerHeight;

//     // Calculer le pourcentage de la page visité
//     const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

//     // Mettre à jour l'élément visité avec le pourcentage
//     const visitedPercentElement = document.getElementById("visitedPercent");
//     if (visitedPercentElement) {
//       visitedPercentElement.textContent = `${Math.min(
//         Math.max(scrollPercent, 0),
//         100
//       ).toFixed(0)}%`;
//     }
//   };

//   // Ajouter l'écouteur d'événement pour le scroll
//   window.addEventListener("scroll", updateScrollPercentage);

//   // Appeler la fonction une première fois pour prendre en compte la position initiale
//   updateScrollPercentage();

//   // Retourner la fonction de nettoyage pour l'événement scroll
//   return () => {
//     window.removeEventListener("scroll", updateScrollPercentage);
//   };
// }

// function initializeMouseButton(buttonRef) {
//   const splineContainer = document.querySelector(`.${styles.splineContainer}`);
//   const button = buttonRef.current;

//   if (!splineContainer || !button) {
//     console.error("SplineContainer or button not found");
//     return () => {}; // Retourne une fonction vide si l'élément n'existe pas
//   }

//   // Rendre le bouton positionnable avec `absolute`
//   button.style.position = "absolute";
//   button.style.opacity = 0; // Invisible par défaut

//   const handleMouseMove = (event) => {
//     const containerRect = splineContainer.getBoundingClientRect();
//     const x = event.clientX - containerRect.left; // Coordonnée relative au conteneur
//     const y = event.clientY - containerRect.top;

//     const offsetX = -120; // Décalage horizontal
//     const offsetY = -30; // Décalage vertical

//     // Utiliser l'animation pour déplacer le bouton avec un délai
//     button.animate(
//       {
//         left: `${x + offsetX}px`, // Position horizontale avec décalage
//         top: `${y + offsetY}px`, // Position verticale avec décalage
//       },
//       { duration: 1000, fill: "forwards" } // Délai de 500ms
//     );

//     button.style.opacity = 1; // Rendre visible
//   };

//   const handleMouseLeave = () => {
//     button.style.opacity = 0; // Rendre invisible en dehors de la zone
//   };

//   const handleScroll = () => {
//     button.style.opacity = 0; // Rendre invisible lors du scroll
//   };

//   splineContainer.addEventListener("mousemove", handleMouseMove);
//   splineContainer.addEventListener("mouseleave", handleMouseLeave);
//   window.addEventListener("scroll", handleScroll); // Écouteur global pour le scroll

//   return () => {
//     splineContainer.removeEventListener("mousemove", handleMouseMove);
//     splineContainer.removeEventListener("mouseleave", handleMouseLeave);
//     window.removeEventListener("scroll", handleScroll);
//   };
// }
