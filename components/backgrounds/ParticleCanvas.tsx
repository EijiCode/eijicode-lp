"use client";

import { useEffect, useRef } from "react";
import { Renderer, Camera, Geometry, Program, Mesh, Transform } from "ogl";

interface ParticleCanvasProps {
  className?: string;
  style?: React.CSSProperties;
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
}

const COLORS = ["#4f8ef7", "#7c5cfc", "#e8eaf0"];
const PARTICLE_COUNT = 300;

const vertexShader = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uSize;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = color;
    vAlpha = random.w * 0.6 + 0.2;

    vec3 pos = position;

    float t = uTime * 0.08;
    pos.x += sin(t * random.x * 2.0 + random.y * 6.28318) * 0.25;
    pos.y += cos(t * random.y * 2.0 + random.z * 6.28318) * 0.25;

    vec2 dir = uMouse - pos.xy;
    float dist = length(dir);
    float attract = smoothstep(0.7, 0.0, dist) * 0.12;
    pos.xy += normalize(dir + vec2(0.001)) * attract;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * random.z * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord.xy - 0.5;
    float circle = smoothstep(0.5, 0.2, length(uv));
    if (circle < 0.001) discard;
    gl_FragColor = vec4(vColor, circle * vAlpha);
  }
`;

export default function ParticleCanvas({ className, style }: ParticleCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ depth: false, alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, 15);

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    }
    window.addEventListener("resize", resize);
    resize();

    const position = new Float32Array(PARTICLE_COUNT * 3);
    const random = new Float32Array(PARTICLE_COUNT * 4);
    const colorData = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      position.set(
        [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 4,
        ],
        i * 3
      );
      random.set(
        [Math.random(), Math.random(), Math.random() * 0.5 + 0.5, Math.random()],
        i * 4
      );
      const rgb = hexToRgb(COLORS[Math.floor(Math.random() * COLORS.length)]);
      colorData.set(rgb, i * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: position },
      random: { size: 4, data: random },
      color: { size: 3, data: colorData },
    });

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new Float32Array([0, 0]) },
        uSize: { value: 120 },
      },
      transparent: true,
      depthTest: false,
    });

    const scene = new Transform();
    const mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program });
    mesh.setParent(scene);

    let rafId: number;
    function update(t: number) {
      rafId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      (program.uniforms.uMouse.value as Float32Array).set(mouseRef.current);
      renderer.render({ scene, camera });
    }
    rafId = requestAnimationFrame(update);

    function onMouseMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = -(e.clientY / window.innerHeight - 0.5) * 12;
      mouseRef.current = [x, y];
    }
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      if (container.contains(canvas)) container.removeChild(canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        ...style,
      }}
    />
  );
}
