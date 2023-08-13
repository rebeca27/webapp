let scene, camera, renderer, globe;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#globeCanvas") });
    renderer.setSize(200, 200);

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const texture = new THREE.TextureLoader().load('path-to-earth-image.jpg'); // Replace with a good Earth texture
    const material = new THREE.MeshBasicMaterial({ map: texture });
    globe = new THREE.Mesh(geometry, material);

    scene.add(globe);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.005;
    renderer.render(scene, camera);
}

init();
