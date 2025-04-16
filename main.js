import * as THREE from 'three';
import { generalVertexShader, frag1Shader } from './shaders.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 42, window.innerWidth / window.innerHeight, 0.42, 42000000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

//const geometry = new THREE.BoxGeometry( 10, 10, 10 );
//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

const geometry = new THREE.SphereGeometry( 4.2, 4.2, 4.2 );

const uniforms = {
    iGlobalTime: { value: 1.0 },
    iResolution: { value: new THREE.Vector2(1.42, 1.42) },
};

const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: generalVertexShader,
    fragmentShader: frag1Shader,
    side: THREE.BackSide,
});

const sphere = new THREE.Mesh( geometry, shaderMaterial );
scene.add( sphere );

const cubegeometry = new THREE.BoxGeometry( 10, 10, 10 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( cubegeometry, material );
scene.add( cube );

function animate() {

    uniforms.iGlobalTime.value += 0.0042;

	sphere.rotation.x += 0.000042;
	sphere.rotation.y += 0.000042;
    sphere.rotation.z -= 0.000042;

	renderer.render( scene, camera );
    camera.fov -= 0.0042;
    camera.updateProjectionMatrix();

}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}