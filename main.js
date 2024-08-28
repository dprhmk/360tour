import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let camera, scene, renderer, controls;

function initPanorama(imageSrc) {
    // Очистка попереднього контенту
    const viewerContainer = document.getElementById('viewer-container');
    viewerContainer.innerHTML = ''; // Видаляємо попередній рендерер

    // Ініціалізація сцени та камери
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    controls = new OrbitControls(camera, renderer.domElement);

    renderer.setSize(window.innerWidth, window.innerHeight);
    viewerContainer.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    const texture = new THREE.TextureLoader().load(imageSrc);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.set(0, 0, 0.1);
    controls.update();

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Завантажити першу панораму за замовчуванням
initPanorama('/public/1.jpeg');

// Переключення між панорамами
document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.addEventListener('click', function () {
        document.querySelector('.thumbnail.active').classList.remove('active');
        thumb.classList.add('active');
        initPanorama(thumb.dataset.src); // Ініціалізація нової панорами
    });
});
