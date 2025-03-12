"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";
import styles from "./Custom404.module.css";
import Link from "next/link";

export default function Custom404() {
  const sceneRef = useRef(null);
  const cloudRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // Vérifier si on est côté client

    // ---- Animation Matter.js ----
    const { Engine, Render, Runner, World, Bodies, Composite } = Matter;
    const engine = Engine.create();
    const world = engine.world;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: "white",
      },
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const fontSize = 80;
    const circleRadius = fontSize / 3;
    const spacing = fontSize * 1.5;
    const text404 = "404";
    const textPositions = [
      { x: width / 2 - spacing, y: height / 2 },
      { x: width / 2, y: height / 2 },
      { x: width / 2 + spacing, y: height / 2 },
    ];

    textPositions.forEach((pos, index) => {
      const circle = Bodies.circle(pos.x, pos.y, circleRadius, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      });
      circle.character = text404[index];
      World.add(world, circle);
    });

    const fallingFontSize = 24;
    const circleFallingRadius = fallingFontSize / 2;
    const rectangleWidth = fallingFontSize;
    const rectangleHeight = fallingFontSize * 2;

    function createFallingText(x, y) {
      const digit = Math.random() > 0.5 ? "1" : "0";

      const body =
        digit === "0"
          ? Bodies.circle(x, y, circleFallingRadius, {
              restitution: 0.5,
              render: { fillStyle: "transparent" },
            })
          : Bodies.rectangle(x, y, rectangleWidth, rectangleHeight, {
              restitution: 0.5,
              render: { fillStyle: "transparent" },
            });

      body.digitText = digit;
      return body;
    }

    const intervalMatter = setInterval(() => {
      const x = Math.random() * width;
      const y = -20;
      const textBody = createFallingText(x, y);
      World.add(world, textBody);
    }, 100);

    const context = render.context;

    function renderCustomText() {
      requestAnimationFrame(renderCustomText);

      context.save();
      context.textAlign = "center";
      context.textBaseline = "middle";

      Composite.allBodies(world).forEach((body) => {
        if (body.character) {
          const { x, y } = body.position;
          context.font = `${fontSize}px "Explora", serif`;
          context.fillStyle = "rgba(0, 0, 0, 0.7)";
          context.fillText(body.character, x, y);
        }

        if (body.digitText) {
          const { x, y } = body.position;
          context.font = `${fallingFontSize}px monospace`;
          context.fillStyle = "rgba(0, 0, 0, 0.2)";
          context.fillText(body.digitText, x, y);
        }
      });

      context.restore();
    }
    renderCustomText();

    // ---- Animation pluie de texte ----
    const randomText = () => {
      return Math.random() > 0.5 ? "1" : "0";
    };

    const rain = () => {
      if (!cloudRef.current) return;

      const e = document.createElement("div");
      const left = Math.floor(Math.random() * window.innerWidth);
      const size = Math.random() * 1.5;
      const duration = Math.random() * 1;

      e.classList.add(styles.text);
      cloudRef.current.appendChild(e);
      e.innerText = randomText();
      e.style.left = left + "px";
      e.style.fontSize = 0.5 + size + "em";
      e.style.animationDuration = 1 + duration + "s";

      setTimeout(() => {
        cloudRef.current?.removeChild(e);
      }, 2000);
    };

    const intervalRain = setInterval(() => {
      rain();
    }, 20);

    // Cleanup
    return () => {
      clearInterval(intervalMatter);
      clearInterval(intervalRain);
      Render.stop(render);
      World.clear(world);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  // ---- Gestion du pointeur sur l'élément "move" ----
  useEffect(() => {
    if (typeof document !== "undefined") {
      const handlePointerMove = (event) => {
        const { clientX, clientY } = event;

        const move = document.getElementById("move");
        if (!move) return;

        const offsetX = move.offsetWidth - 40; // Largeur de l'élément
        const offsetY = 20; // Décalage vertical

        move.animate(
          {
            left: `${clientX + offsetX}px`, // Position à droite de la souris
            top: `${clientY + offsetY}px`, // Décalage vertical
          },
          { duration: 1000, fill: "forwards" }
        );
      };

      document.body.onpointermove = handlePointerMove;

      return () => {
        document.body.onpointermove = null; // Cleanup
      };
    }
  }, []);

  return (
    <div>
      <audio autoPlay loop>
        <source src="../sound/ambience.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <div className={styles.move} id="move">Click to go back Home</div>
      <Link href={"/"} className="pageLink">
        <div ref={sceneRef} className={styles.sceneRef}></div>
      </Link>
      <div ref={cloudRef} className={styles.cloud}></div>
    </div>
  );
}
