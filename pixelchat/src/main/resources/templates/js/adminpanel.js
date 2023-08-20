// Main application state
const orbData = [{
        tooltip: "Chatroom 1 - 15 Active Users",
        url: "chatroom1.html",
        image: "space1.jpg"
    },
    {
        tooltip: "Chatroom 2 - 7 Active Users",
        url: "chatroom2.html",
        image: "space7.png"
    },
    {
        tooltip: "Friend Requests - 5 New",
        url: "friendrequests.html",
        image: "space3.jpg"
    },
    {
        tooltip: "User Reports - 2 Pending",
        url: "userreports.html",
        image: "space4.jpg"
    },
    {
        tooltip: "Blog Posts - 3 New",
        url: "blogposts.html",
        image: "space12.webp"
    }, // Example data for Blog Posts
    {
        tooltip: "Pictures - 10 New",
        url: "pictures.html",
        image: "space6.png"
    }, // Example data for Pictures
    {
        tooltip: "Staff - 5 Active",
        url: "staff.html",
        image: "space11.jpg"
    }, // Example data for Staff
    // Additional orb data can be added
];


let scene, camera, renderer, globe;

document.addEventListener('DOMContentLoaded', () => {
    initGlobe();
    initOrbs();
    initJoystickControls();
    initOrbHoverEffects();
    initOrbClickEvents();
    startStarGenerator();
    initMenuToggle();

    const aiBox = document.querySelector('.ai-box');
    const toggleAIButton = document.getElementById('toggleAIButton');

    if (toggleAIButton) {
        toggleAIButton.addEventListener('click', function () {
            console.log("Button clicked!"); // Log when the button is clicked
            aiBox.classList.toggle('minimized');
        });
    } else {
        console.warn("Toggle AI button not found in the document.");
    }

});


function initGlobe() {
    const container = document.querySelector('.globe');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#globeCanvas"),
        antialias: true,
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);

    const geometry = new THREE.SphereGeometry(3, 32, 32);
    const texture = new THREE.TextureLoader().load('images/earth.jpg');
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        wireframe: true
    });
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

        // Tooltip creation

        // Add the event listeners here
        orb.addEventListener('mouseenter', function () {
            // Check if orb is near the upper boundary and adjust tooltip position if needed
            if (parseInt(orb.style.top, 10) < 15) {
                orb.classList.add('top-boundary');
            }
        });

        orb.addEventListener('mouseleave', function () {
            orb.classList.remove('top-boundary');
        });


        // Now, append the orb to mediaGalaxy
        mediaGalaxy.appendChild(orb);
    });
}

function initOrbHoverEffects() {
    const orbs = document.querySelectorAll('.media-orb');
    orbs.forEach(orb => {
        orb.addEventListener('mouseenter', function () {
            orb.classList.add('hovered');
            if (parseInt(orb.style.top, 10) < 15) {
                orb.classList.add('top-boundary');
            }
        });

        orb.addEventListener('mouseleave', function () {
            orb.classList.remove('hovered', 'top-boundary');
        });
    });
}

function initOrbClickEvents() {
    const orbs = document.querySelectorAll('.media-orb');
    orbs.forEach(orb => {
        orb.addEventListener('click', function () {
            orb.classList.toggle('expanded');
        });
    });
}

function initJoystickControls() {
    const joystick = document.getElementById('joystick');
    const sections = document.querySelectorAll('.menu-list li');
    let isDragging = false;

    joystick.addEventListener('mousedown', function (e) {
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

            const sectionCenter = {
                x: sectionRect.left + sectionRect.width / 2,
                y: sectionRect.top + sectionRect.height / 2
            };

            const joystickCenter = {
                x: joystickRect.left + joystickRect.width / 2,
                y: joystickRect.top + joystickRect.height / 2
            };

            const distance = Math.sqrt(
                Math.pow(joystickCenter.x - sectionCenter.x, 2) +
                Math.pow(joystickCenter.y - sectionCenter.y, 2)
            );

            if (distance < closestDistance) {
                closestDistance = distance;
                closest = section;
            }
        });

        return closest;
    }


    joystick.addEventListener('dblclick', function () {
        const selectedSection = closestSection();
        if (selectedSection) {
            window.location.href = selectedSection.getAttribute('data-url');
        }
    });
}

function initOrbClickEvents() {
    const orbs = document.querySelectorAll('.media-orb');
    orbs.forEach(orb => {
        orb.addEventListener('click', function () {
            orb.classList.toggle('expanded');
        });
    });
}

function startStarGenerator() {
    function generateStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        document.querySelector('.space-background').appendChild(star);
        star.addEventListener('animationend', function () {
            star.remove();
        });
    }
    setInterval(generateStar, 600000);
}


function initMenuToggle() {
    const items = document.querySelectorAll(".menu-list li");
    const toggle = document.querySelector(".menu-button");
    document.getElementById("menu-toggle").addEventListener("click", function () {
        const isOpen = toggle.classList.contains("open");

        if (isOpen) {
            items.forEach((item) => {
                item.style.transform = "scale(0) translateY(-100px)";
                item.style.opacity = "0";
            });
            toggle.classList.remove("open");
        } else {
            const radius = 180;
            items.forEach((item, i, arr) => {
                const angle = (i / arr.length) * Math.PI * 2;
                const x = radius * Math.cos(angle - Math.PI / 2); // -PI/2 to start from the top
                const y = radius * Math.sin(angle - Math.PI / 2);

                item.style.left = `50%`;
                item.style.bottom = `50%`;
                item.style.transform = `translate(${x}px, ${y}px) scale(1)`;
                item.style.opacity = "1";
            });
            toggle.classList.add("open");
        }
    });
}


function emergencyEject() {

    const confirmEject = confirm("Are you sure you want to initiate Emergency Eject? You will be logged out!");

    if (confirmEject) {
        // Send a request to the server to log out
        fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("You have been logged out. Notification sent to the tech team.");
                    // Optionally, redirect to the login page or home page
                    window.location.href = "/login";
                } else {
                    alert("Error logging out. Please try again.");
                }
            })
            .catch(error => {
                console.error("Error logging out:", error);
            });
    }
}


// System Settings Sphere Functionality

document.querySelector('.settings-button').addEventListener('click', function () {
    const settingsList = document.querySelector('.settings-list');
    settingsList.style.display = (settingsList.style.display === "none" || settingsList.style.display === "") ? "block" : "none";
});

// Get all the list items inside the settings-list
const settingsItems = document.querySelectorAll('.settings-list li');

settingsItems.forEach(item => {
    item.addEventListener('click', function() {
        switch(item.textContent) {
            case 'Backup Data':
                if(confirm('Do you want to backup all the data?')) {
                    setTimeout(() => {
                        alert('Data backed up successfully!');
                    }, 2000); // Simulating a delay for backup
                }
                break;

                case 'Adjust Settings':
                    document.getElementById('adjustSettingsModal').style.display = 'block';
                    break;
                
                case 'Site-wide Announcements':
                    document.getElementById('siteWideAnnouncementsModal').style.display = 'block';
                    break;
                

            default:
                alert('Option not recognized!');
        }
    });
});

// Close buttons
document.getElementById('closeAdjustSettings').addEventListener('click', function() {
    document.getElementById('adjustSettingsModal').style.display = 'none';
});

document.getElementById('closeAnnouncements').addEventListener('click', function() {
    document.getElementById('siteWideAnnouncementsModal').style.display = 'none';
});

// Save Settings Function
function saveSettings() {
    // Logic to save settings
    alert('Settings saved successfully!');
    document.getElementById('adjustSettingsModal').style.display = 'none';
}

// Send Announcement Function
function sendAnnouncement() {
    const text = document.getElementById('announcementText').value;
    if(text) {
        // Logic to send announcement
        alert('Announcement sent successfully!');
        document.getElementById('siteWideAnnouncementsModal').style.display = 'none';
    } else {
        alert('Please enter an announcement text.');
    }
}


