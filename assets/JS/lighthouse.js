let scene, camera, renderer, mesh;
let sea, ambientLight, sunlight, infraredLight, ultraVioletLight, controls;

let keyboard = {};
let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
let USE_WIREFRAME = false;
 
function init(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(100, 1920/1080, 0.1, 1000);
  camera.position.set(110,50,110);
  scene.background = (new THREE.TextureLoader().load('assets/texture/sky.jpg' ))

//clouds
cloudTexture1 =  new THREE.TextureLoader().load('assets/texture/cloudTexture1.png');
cloudTexture2 =  new THREE.TextureLoader().load('assets/texture/cloudTexture2.png');
cloudTexture3 =  new THREE.TextureLoader().load('assets/texture/cloudTexture3png.png');

   cloud1 = new THREE.Mesh(new THREE.PlaneBufferGeometry(150,40), new THREE.MeshPhongMaterial({opacity: 0.8,transparent: true,map: cloudTexture1, wireframe:USE_WIREFRAME}));
   cloud1.position.set(-96,125,-60),cloud1.rotation.x = 0.5,cloud1.rotation.y = 0.5, cloud1.receiveShadow = true, scene.add(cloud1);

   cloud2 = new THREE.Mesh(new THREE.PlaneBufferGeometry(150,40), new THREE.MeshPhongMaterial({opacity: 0.8,transparent: true,map: cloudTexture2, wireframe:USE_WIREFRAME}));
   cloud2.position.set(-29,95,96),cloud2.rotation.x = 0,cloud2.rotation.y = 9,cloud2.rotation.z = 0, cloud2.receiveShadow = true, scene.add(cloud2);

   cloud3 = new THREE.Mesh(new THREE.PlaneBufferGeometry(150,40), new THREE.MeshPhongMaterial({opacity: 0.8,transparent: true,map: cloudTexture3, wireframe:USE_WIREFRAME}));
   cloud3.position.set(20,150,96),cloud3.rotation.x = 0,cloud3.rotation.y = 9,cloud3.rotation.z = 0, cloud3.receiveShadow = true, scene.add(cloud3);

   cloud4 = new THREE.Mesh(new THREE.PlaneBufferGeometry(150,40), new THREE.MeshPhongMaterial({opacity: 0.8,transparent: true,map: cloudTexture2, wireframe:USE_WIREFRAME}));
   cloud4.position.set(-5,145,-90),cloud4.rotation.x = 0.5,cloud4.rotation.y = 0.5, cloud4.receiveShadow = true, scene.add(cloud4);
//land
   landTexture = new THREE.TextureLoader().load( 'assets/texture/landTexture.jpg' );

   land = new THREE.Mesh(
      new THREE.DodecahedronBufferGeometry(36),
      new THREE.MeshLambertMaterial({map: landTexture, wireframe:USE_WIREFRAME})
   );
   land.position.set(-22,14,-89);
   land.rotation.x = 9;
   land.rotation.y = 4;
   land.receiveShadow = true;
   scene.add(land);

   mainland = new THREE.Mesh(
      new THREE.SphereBufferGeometry(80,88,91),
      new THREE.MeshPhongMaterial({map: landTexture, wireframe:USE_WIREFRAME})
   );
   mainland.position.set(-18,-50,-67);
   mainland.receiveShadow = true;
   scene.add(mainland);

   landExtension = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(25,10,110,70),
      new THREE.MeshPhongMaterial({map: landTexture, wireframe:USE_WIREFRAME})
   );
   landExtension.position.set(-16,0,10);
   landExtension.rotation.x -= Math.PI / 2;
   landExtension.receiveShadow = true;
   scene.add(landExtension);

   land1 = new THREE.Mesh(new THREE.SphereBufferGeometry(23,20,40), new THREE.MeshPhongMaterial({map: landTexture, wireframe:USE_WIREFRAME}));
   land1.position.set(-17,-5,110), land1.receiveShadow = true, scene.add(land1);

//rocks
   rockTexture = new THREE.TextureLoader().load( 'assets/texture/rockTexture.jpg' );
   rocks = new THREE.Mesh(
      new THREE.BoxGeometry(10,15,110),
      new THREE.MeshPhongMaterial({map: rockTexture, wireframe:USE_WIREFRAME})
   );
   rocks.position.set(-10,2,44);
   rocks.receiveShadow = true;
   scene.add(rocks);

   rocksSet = new THREE.Mesh(
      new THREE.IcosahedronBufferGeometry(17),
      new THREE.MeshPhongMaterial({map: rockTexture, wireframe:USE_WIREFRAME})
   );
   rocksSet.position.set(-24,23,-41);
   rocksSet.rotation.x = 6;
   rocksSet.receiveShadow = true;
   scene.add(rocksSet);

   rock1 = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(8), new THREE.MeshPhongMaterial({map: rockTexture, wireframe:USE_WIREFRAME}));
   rock1.position.set(-10,9,57), rock1.receiveShadow = true, scene.add(rock1);
   
   rock2 = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(12), new THREE.MeshPhongMaterial({map: rockTexture, wireframe:USE_WIREFRAME}));
   rock2.position.set(-10,29,-37), rock2.receiveShadow = true, scene.add(rock2);

   rock3 = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(12), new THREE.MeshPhongMaterial({map: rockTexture, wireframe:USE_WIREFRAME}));
   rock3.position.set(4,7,-47), rock3.receiveShadow = true, scene.add(rock3);

   rock4 = new THREE.Mesh(new THREE.DodecahedronBufferGeometry(8), new THREE.MeshPhongMaterial({map: rockTexture, wireframe:USE_WIREFRAME}));
   rock4.position.set(-23,7,67), rock4.receiveShadow = true, scene.add(rock4);

   rock5 = new THREE.Mesh(new THREE.BoxGeometry(13,9,40), new THREE.MeshPhongMaterial({map: rockTexture, wireframe:USE_WIREFRAME}));
   rock5.position.set(-17,5,79), rock5.receiveShadow = true, scene.add(rock5);

   rock6 = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(8), new THREE.MeshPhongMaterial({map: rockTexture, wireframe:USE_WIREFRAME}));
   rock6.position.set(-14,10,88), rock6.rotation.x =- Math.PI / 2, rock6.receiveShadow = true, scene.add(rock6);

//cabin
   cabinBaseTexture = new THREE.TextureLoader().load( 'assets/texture/cabinBasetexture.jpg' );
   cabinRoofTexture = new THREE.TextureLoader().load( 'assets/texture/cabinRoof.jpg' );
   cabinChimneyTexture = new THREE.TextureLoader().load( 'assets/texture/cabinChimneyTexture.jpg' );
   cabinBase = new THREE.Mesh(
      new THREE.BoxGeometry(15,15,15),
      new THREE.MeshPhongMaterial({map: cabinBaseTexture, wireframe:USE_WIREFRAME})
   );
   cabinBase.position.set(-15,21,111);
   cabinBase.receiveShadow = true;
   scene.add(cabinBase); 

   cabinRoof = new THREE.Mesh(new THREE.ConeBufferGeometry(13,9,35), new THREE.MeshPhongMaterial({map: cabinRoofTexture, wireframe:USE_WIREFRAME}));
   cabinRoof.position.set(-15,33,111), cabinRoof.receiveShadow = true, scene.add(cabinRoof);

   cabinChimney = new THREE.Mesh(new THREE.BoxGeometry(2,9,2), new THREE.MeshPhongMaterial({map: cabinChimneyTexture, wireframe:USE_WIREFRAME}));
   cabinChimney.position.set(-15,36,116), cabinChimney.receiveShadow = true, scene.add(cabinChimney);
//sea
  seaTexture = new THREE.TextureLoader().load( 'assets/texture/water.jpg' );
  sea = new THREE.Mesh(
     new THREE.BoxGeometry(220,320,0),
     new THREE.MeshPhongMaterial({map: seaTexture, wireframe:USE_WIREFRAME})
  );
  sea.position.set(1,-0.45,0);
  sea.rotation.x -= Math.PI / 2;
  sea.receiveShadow = true;
  scene.add(sea);

//moon
  moon = new THREE.Mesh(
     new THREE.CircleBufferGeometry(30,49),
     new THREE.MeshBasicMaterial({color: 0xffffff, wireframe:USE_WIREFRAME})
  );
  moon.position.set(-99,85,42);
  moon.rotation.y = 14;
  moon.rotation.x = 8;
  scene.add(moon);


//lighthouse

  Base = new THREE.Mesh(
   new THREE.CylinderBufferGeometry(13,13,8,22),
    new THREE.MeshPhongMaterial({color: 0x3a3636, wireframe:USE_WIREFRAME})
   );
   Base.position.set(-22,110,-89);
   Base.rotation.z = 22;
   Base.receiveShadow = true;
   scene.add(Base);

   lighthouseBaseTexture = new THREE.TextureLoader().load( 'assets/texture/lhTexture.jpg' );
  lighthouseBase = new THREE.Mesh(
   new THREE.CylinderBufferGeometry(23,10,90,80),
    new THREE.MeshPhongMaterial({map: lighthouseBaseTexture, wireframe:USE_WIREFRAME})
   );
   lighthouseBase.position.set(-22,69,-89);
   lighthouseBase.rotation.z = 22;
   lighthouseBase.receiveShadow = true;
   scene.add(lighthouseBase);

   light = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(3,3,8,12),
       new THREE.MeshPhongMaterial({color: 0xc7c403, wireframe:USE_WIREFRAME})
      );
      light.position.set(-22,114,-89);
      light.rotation.z = 22;
      light.receiveShadow = true;
      scene.add(light);

    roof = new THREE.Mesh(
      new THREE.ConeBufferGeometry(13,8,18),
       new THREE.MeshPhongMaterial({color: 0xc3a3636, wireframe:USE_WIREFRAME})
      );
      roof.position.set(-22,125,-89);
      roof.rotation.z = 0;
      roof.receiveShadow = true;
      scene.add(roof);

      firstPillar = new THREE.Mesh(
         new THREE.BoxBufferGeometry(1,15,1),
          new THREE.MeshPhongMaterial({color: 0, wireframe:USE_WIREFRAME})
         );
         firstPillar.position.set(-14,116,-89);
         firstPillar.rotation.z = 22;
         firstPillar.receiveShadow = true;
         scene.add(firstPillar);
      
         secondPillar = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1,15,1),
             new THREE.MeshPhongMaterial({color: 0, wireframe:USE_WIREFRAME})
            );
            secondPillar.position.set(-31,114.8,-89);
            secondPillar.rotation.z = 22;
            secondPillar.receiveShadow = true;
            scene.add(secondPillar);

         thirdPillar = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1,15,1),
             new THREE.MeshPhongMaterial({color: 0, wireframe:USE_WIREFRAME})
            );
            thirdPillar.position.set(-22,116,-97);
            thirdPillar.rotation.z = 22;
            thirdPillar.receiveShadow = true;
            scene.add(thirdPillar);
         
         fourthPillar = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1,15,1),
             new THREE.MeshPhongMaterial({color: 0, wireframe:USE_WIREFRAME})
            );
            fourthPillar.position.set(-22,116,-81);
            fourthPillar.rotation.z = 22;
            fourthPillar.receiveShadow = true;
            scene.add(fourthPillar);



// moonlight,lighthouseLight
  radiation = new THREE.AmbientLight(0x0984cc, 0.3);
  scene.add(radiation);

  extramoonlight = new THREE.DirectionalLight(0x3fadec, 0.4);
  extramoonlight.position.set(0,0,0);
  extramoonlight.target.position.set(-99,85,42);
  scene.add(extramoonlight);
  scene.add(extramoonlight.target);

  helper = new THREE.DirectionalLightHelper(extramoonlight);
  scene.add(helper);

  moonlight = new THREE.DirectionalLight(0x159ceb, 0.75);
  moonlight.position.set(-99,85,42);
  scene.add(moonlight);

  lightfromlighthouse= new THREE.PointLight(0xfffb00,1);
  lightfromlighthouse.distance = 18;
  lightfromlighthouse.position.x = -22;
  lightfromlighthouse.position.y = 119;
  lightfromlighthouse.position.z = -89;
  scene.add(lightfromlighthouse);

  light = new THREE.PointLight(0xffa600, 0.7),light.position.set(-19,117,-87), light.distance = 100,scene.add(light);


  renderer = new THREE.WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
 
 
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
 
  document.body.appendChild(renderer.domElement);
  controls = new THREE.OrbitControls (camera, renderer.domElement);
  animate();
}

function animate(){

  light.rotation.x += 0.1;
  controls.update();
  requestAnimationFrame(animate);
 
 
  if(keyboard[87]){ 
     camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
     camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
  }
  if(keyboard[83]){ 
     camera.position.x += Math.sin(camera.rotation.y) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
  }
  if(keyboard[65]){ 
     camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
  }
  if(keyboard[68]){ 
     camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
  }
 
  if(keyboard[37]){ 
     camera.rotation.y -= player.turnSpeed;
  }
  if(keyboard[39]){
     camera.rotation.y += player.turnSpeed;
  }
 
  renderer.render(scene, camera);
}
 
function keyDown(event){
  keyboard[event.keyCode] = true;
}
 
function keyUp(event){
  keyboard[event.keyCode] = false;
}
 
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
 
window.onload = init;