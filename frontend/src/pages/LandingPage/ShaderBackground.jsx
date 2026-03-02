import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ShaderBackground() {
	const mountRef = useRef(null);

	useEffect(() => {
		const scene = new THREE.Scene();

		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			100,
		);
		camera.position.z = 6;

		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});

		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		mountRef.current.appendChild(renderer.domElement);

		// ----------------------------
		// PARTICLE GEOMETRY
		// ----------------------------

		const particleCount = 6000;
		const geometry = new THREE.BufferGeometry();

		const positions = new Float32Array(particleCount * 3);
		const scales = new Float32Array(particleCount);

		for (let i = 0; i < particleCount; i++) {
			positions[i * 3] = (Math.random() - 0.5) * 20;
			positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
			positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

			scales[i] = Math.random() * 4;
		}

		geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

		geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

		// ----------------------------
		// SHADER MATERIAL
		// ----------------------------

		const material = new THREE.ShaderMaterial({
			transparent: true,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
			uniforms: {
				uTime: { value: 0 },
				uMouse: { value: new THREE.Vector2(0, 0) },
			},
			vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        attribute float aScale;

        varying float vScale;
        varying float vDepth;

        void main() {
          vec3 pos = position;

          // Wave motion
          pos.y += sin(pos.x * 1.5 + uTime) * 0.5;
          pos.x += cos(pos.y * 1.5 + uTime) * 0.5;

          // Mouse distortion
          float dist = distance(vec2(pos.x, pos.y), uMouse * 5.0);
          pos.z += 1.0 / (dist + 1.0) * 2.0;

          vScale = aScale;
          vDepth = pos.z;

          vec4 modelPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * modelPosition;

          gl_PointSize = 8.0 * aScale;
          gl_PointSize *= (1.0 / -modelPosition.z);
        }
      `,
			fragmentShader: `
        varying float vScale;
        varying float vDepth;

        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          float strength = 1.0 - smoothstep(0.0, 0.5, dist);

          vec3 purple = vec3(0.65, 0.2, 1.0);
          vec3 blue = vec3(0.2, 0.6, 1.0);

          float mixVal = clamp(vDepth * 0.05, 0.0, 1.0);
          vec3 color = mix(purple, blue, mixVal);

          gl_FragColor = vec4(color, strength * 1.5);
        }
      `,
		});

		const particles = new THREE.Points(geometry, material);
		scene.add(particles);

		// ----------------------------
		// CLOCK
		// ----------------------------

		const clock = new THREE.Clock();

		const animate = () => {
			const elapsedTime = clock.getElapsedTime();
			material.uniforms.uTime.value = elapsedTime;

			renderer.render(scene, camera);
			requestAnimationFrame(animate);
		};

		animate();

		// ----------------------------
		// MOUSE INTERACTION
		// ----------------------------

		const handleMouseMove = (e) => {
			const x = (e.clientX / window.innerWidth) * 2 - 1;
			const y = -(e.clientY / window.innerHeight) * 2 + 1;

			material.uniforms.uMouse.value.set(x, y);
		};

		window.addEventListener("mousemove", handleMouseMove);

		// ----------------------------
		// RESIZE
		// ----------------------------

		const handleResize = () => {
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("resize", handleResize);
			if (mountRef.current && renderer.domElement) {
				mountRef.current.removeChild(renderer.domElement);
			}
		};
	}, []);

	return (
		<div
			ref={mountRef}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				zIndex: 0,
				pointerEvents: "none",
			}}
		/>
	);
}
