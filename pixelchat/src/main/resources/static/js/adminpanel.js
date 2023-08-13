let scene, camera, renderer, globe;

document.addEventListener('DOMContentLoaded', () => {

    init();
    
    const mediaGalaxy = document.querySelector('.media-galaxy');


for (let i = 0; i < 8; i++) {
    const orb = document.createElement('div');
    orb.classList.add('media-orb');

    const randomTop = Math.floor(Math.random() * 80) + 5;
    const randomLeft = Math.floor(Math.random() * 80) + 5;

    orb.style.top = `${randomTop}%`;
    orb.style.left = `${randomLeft}%`;

    if (i < 4) { // For first 4 orbs, use .jpg from 1 to 4
        orb.style.backgroundImage = `url('images/space${i + 1}.jpg')`;
    } else { // For next 4 orbs, use .png from 5 to 8
        orb.style.backgroundImage = `url('images/space${i + 1}.png')`;
    }

    mediaGalaxy.appendChild(orb);
}

});

function init() {
    const container = document.querySelector('.globe');

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#globeCanvas"), antialias: true,  alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);

    const geometry = new THREE.SphereGeometry(3, 32, 32);
    const texture = new THREE.TextureLoader().load('images/earth.jpg'); 
    const material = new THREE.MeshBasicMaterial({ map: texture, wireframe: true });
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

const joystick = document.getElementById('joystick');
const sections = document.querySelectorAll('.nav-controls .section');

let isDragging = false;

joystick.addEventListener('mousedown', function(e) {
    isDragging = true;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

function onMouseMove(e) {
    if (!isDragging) return;

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
        let sectionRect = section.getBoundingClientRect();
        let joystickRect = joystick.getBoundingClientRect();

        let distance = Math.abs(joystickRect.top - sectionRect.top);

        if (distance < closestDistance) {
            closestDistance = distance;
            closest = section;
        }
    });

    return closest;
}

joystick.addEventListener('dblclick', function() {
    let selectedSection = closestSection();
    if (selectedSection) {
        window.location.href = selectedSection.getAttribute('data-url');
    }
});



const orbs = document.querySelectorAll('.media-orb');

orbs.forEach(orb => {
    orb.addEventListener('click', function() {
        orb.classList.toggle('expanded');
    });
});

function generateStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    document.querySelector('.space-background').appendChild(star);

    // This will remove the star from the DOM after its animation completes
    star.addEventListener('animationend', function() {
        star.remove();
    });
}

// Mock traffic data - every few seconds, generate a shooting star
setInterval(generateStar, Math.random() * 5000 + 2000);

