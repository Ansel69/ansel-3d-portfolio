/**
 * Three.js Hero Background Scene — Cute & Playful Pastel Edition
 * Floating soft stars, pastel spheres, cute donuts, and gentle interactive particles
 */

(function initCuteHeroThreeScene() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 1. Pastel Floating Bubbles & Stars
    const particleCount = 450;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const pinkColor = new THREE.Color(0xff70a6);
    const yellowColor = new THREE.Color(0xffd670);
    const mintColor = new THREE.Color(0x70d6ff);
    const lavenderColor = new THREE.Color(0xb388eb);

    const palette = [pinkColor, yellowColor, mintColor, lavenderColor];

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 80;
        positions[i + 1] = (Math.random() - 0.5) * 80;
        positions[i + 2] = (Math.random() - 0.5) * 50;

        const chosen = palette[Math.floor(Math.random() * palette.length)];
        colors[i] = chosen.r;
        colors[i + 1] = chosen.g;
        colors[i + 2] = chosen.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 0.9,
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(geometry, particleMaterial);
    scene.add(particleSystem);

    // 2. Cute Floating Objects (Pastel Donut, Star Spheres, Rounded Cubes)
    const objectsGroup = new THREE.Group();
    scene.add(objectsGroup);

    // Floating Pastel Donut (Torus)
    const donutGeo = new THREE.TorusGeometry(3.5, 1.4, 16, 32);
    const donutMat = new THREE.MeshStandardMaterial({
        color: 0xff70a6,
        roughness: 0.4,
        metalness: 0.05,
        transparent: true,
        opacity: 0.35
    });
    const donutMesh = new THREE.Mesh(donutGeo, donutMat);
    donutMesh.position.set(18, -6, -10);
    donutMesh.rotation.x = 0.8;
    objectsGroup.add(donutMesh);

    // Floating Lavender Sphere
    const sphereGeo = new THREE.SphereGeometry(2.8, 24, 24);
    const sphereMat = new THREE.MeshStandardMaterial({
        color: 0xb388eb,
        roughness: 0.3,
        metalness: 0.1,
        transparent: true,
        opacity: 0.3
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.position.set(-20, 8, -12);
    objectsGroup.add(sphereMesh);

    // Floating Yellow Rounded Star-Diamond (Octahedron)
    const starGeo = new THREE.OctahedronGeometry(2.2, 0);
    const starMat = new THREE.MeshStandardMaterial({
        color: 0xffd670,
        roughness: 0.2,
        metalness: 0.1,
        transparent: true,
        opacity: 0.45
    });
    const starMesh = new THREE.Mesh(starGeo, starMat);
    starMesh.position.set(-14, -10, -5);
    objectsGroup.add(starMesh);

    // 3. Warm Pastel Lighting
    const ambientLight = new THREE.AmbientLight(0xfff0f5, 1.5);
    scene.add(ambientLight);

    const pointLightPink = new THREE.PointLight(0xff70a6, 2.5, 50);
    pointLightPink.position.set(15, 15, 15);
    scene.add(pointLightPink);

    const pointLightMint = new THREE.PointLight(0x70d6ff, 2.5, 50);
    pointLightMint.position.set(-15, -15, 15);
    scene.add(pointLightMint);

    // 4. Mouse Parallax Motion
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // 5. Animation Loop
    let clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        particleSystem.rotation.y = elapsedTime * 0.02;
        particleSystem.rotation.x = elapsedTime * 0.01;

        donutMesh.rotation.x = elapsedTime * 0.15;
        donutMesh.rotation.y = elapsedTime * 0.2;

        sphereMesh.position.y = 8 + Math.sin(elapsedTime * 0.8) * 1.5;
        starMesh.rotation.y = elapsedTime * 0.3;
        starMesh.rotation.z = elapsedTime * 0.2;

        camera.position.x += (targetX * 15 - camera.position.x) * 0.04;
        camera.position.y += (-targetY * 15 - camera.position.y) * 0.04;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();
})();
