"use client";
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls, Environment, ContactShadows, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-gold text-xs font-bold uppercase tracking-widest whitespace-nowrap">
        Loading {Math.round(progress)}%
      </div>
    </Html>
  );
}

// Используем качественную модель машины (Porsche 911)
function Model(props: any) {
  const { scene } = useGLTF('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/porsche-911-930-turbo-1975/model.gltf');
  
  const ref = useRef<THREE.Group>(null);
  
  // Медленное вращение для динамики
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return <primitive ref={ref} object={scene} {...props} />;
}

const Car3D: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[600px] cursor-grab active:cursor-grabbing">
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 45, position: [0, 0, 8] }} gl={{ alpha: true }}>
        <Suspense fallback={<Loader />}>
          <PresentationControls
            speed={1.5}
            global
            zoom={1.2}
            polar={[-0.1, Math.PI / 4]}
            rotation={[0, Math.PI / 4, 0]}
          >
            <Stage environment="city" intensity={0.5} shadows={false}>
              <Model scale={0.7} />
            </Stage>
          </PresentationControls>
          
          <Environment preset="city" />
          
          {/* Дополнительное освещение для премиального вида */}
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0066ff" />
          <pointLight position={[10, 5, 5]} intensity={0.5} color="#ffcc00" />
          
          <ContactShadows 
            position={[0, -1.4, 0]} 
            opacity={0.75} 
            scale={10} 
            blur={2.5} 
            far={4} 
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Car3D;
