// Main application state
const orbData = [
    {tooltip: "Chatroom 1 - 15 Active Users", url: "chatroom1.html", image: "space1.jpg"},
    {tooltip: "Chatroom 2 - 7 Active Users", url: "chatroom2.html", image: "space7.png"},
    {tooltip: "Friend Requests - 5 New", url: "friendrequests.html", image: "space3.jpg"},
    {tooltip: "User Reports - 2 Pending", url: "userreports.html", image: "space4.jpg"},
    // Additional orb data can be added
];

let scene, camera, renderer, globe;

document.addEventListener('DOMContentLoaded', () => {
    initGlobe();
    initOrbs();
    initJoystickControls();
    initOrbClickEvents();
    startStarGenerator();
});

function initGlobe() {
    const container = document.querySelector('.globe');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#globeCanvas"), antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);

    const geometry = new THREE.SphereGeometry(3, 32, 32);
    const texture = new THREE.TextureLoader().load('images/earth.jpg');
    const material = new THREE.MeshBasicMaterial({ map: texture, wireframe: true });
    globe = new THREE.Mesh(geometry, material);

    scene.add(globe);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    animateGlobe();
}

function animateGlobe() {
    requestAnimationFrame(animateGlobe);
    globe.rotation.y += 0.005;
    renderer.render(scene, camera);
}

function initOrbs() {
    const mediaGalaxy = document.querySelector('.media-galaxy');
    orbData.forEach((data, i) => {
        const orb = document.createElement('div');
        orb.classList.add('media-orb');
        const randomTop = Math.floor(Math.random() * 80) + 5;
        const randomLeft = Math.floor(Math.random() * 80) + 5;

        orb.style.top = `${randomTop}%`;
        orb.style.left = `${randomLeft}%`;
        orb.style.backgroundImage = `url('images/${data.image}')`;
        orb.setAttribute('data-tooltip', data.tooltip);
        orb.setAttribute('data-url', data.url);

        mediaGalaxy.appendChild(orb);
    });
}

function initJoystickControls() {
    const joystick = document.getElementById('joystick');
    const sections = document.querySelectorAll('.nav-controls .section');
    let isDragging = false;

    joystick.addEventListener('mousedown', function(e) {
        isDragging = true;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        joystick.style.left = e.pageX - joystick.clientWidth / 2 + 'px';
        joystick.style.top = e.pageY - joystick.clientHeight / 2 + 'px';
        sections.forEach(section => section.classList.remove('highlighted'));
        closestSection().classList.add('highlighted');
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    function closestSection() {
        let closest = null;
        let closestDistance = Infinity;

        sections.forEach(section => {
            const sectionRect = section.getBoundingClientRect();
            const joystickRect = joystick.getBoundingClientRect();
            const distance = Math.abs(joystickRect.top - sectionRect.top);

            if (distance < closestDistance) {
                closestDistance = distance;
                closest = section;
            }
        });

        return closest;
    }

    joystick.addEventListener('dblclick', function() {
        const selectedSection = closestSection();
        if (selectedSection) {
            window.location.href = selectedSection.getAttribute('data-url');
        }
    });
}

function initOrbClickEvents() {
    const orbs = document.querySelectorAll('.media-orb');
    orbs.forEach(orb => {
        orb.addEventListener('click', function() {
            orb.classList.toggle('expanded');
        });
    });
}

function startStarGenerator() {
    function generateStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        document.querySelector('.space-background').appendChild(star);
        star.addEventListener('animationend', function() {
            star.remove();
        });
    }
    setInterval(generateStar, Math.random() * 5000 + 2000);
}
