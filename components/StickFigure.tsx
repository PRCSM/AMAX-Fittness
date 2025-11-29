
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// --- Reusable Body Parts ---

const BodyPart = ({ position, rotation, args, color = "#2A2A2A", scale = [1, 1, 1] }: any) => {
  return (
    <mesh position={position} rotation={new THREE.Euler(...(rotation || [0, 0, 0]))} scale={scale}>
      <boxGeometry args={args} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.3} 
        metalness={0.8} 
      />
    </mesh>
  );
};

const Joint = ({ position, size = 0.25 }: { position: [number, number, number], size?: number }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial 
        color="#CDFF00" 
        emissive="#CDFF00" 
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.5}
      />
    </mesh>
  );
};

// --- Human Model Component ---

const HumanModel = ({ animationType }: { animationType: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      
      // Reset defaults
      if(leftArmRef.current) leftArmRef.current.rotation.x = 0;
      if(rightArmRef.current) rightArmRef.current.rotation.x = 0;

      // Animations
      if (animationType === 'squat') {
        // Body goes down
        const yOffset = Math.sin(t * 3) * 0.8;
        // Clamp to floor roughly (don't go below -1)
        groupRef.current.position.y = Math.max(-1, yOffset - 0.5);
        
        // Arms raise slightly for balance
        if(leftArmRef.current) leftArmRef.current.rotation.x = -Math.PI / 4 + (yOffset * 0.5);
        if(rightArmRef.current) rightArmRef.current.rotation.x = -Math.PI / 4 + (yOffset * 0.5);

      } else if (animationType === 'pushup') {
         // Pivot around feet (simplified visual trick)
         const angle = Math.abs(Math.sin(t * 2.5)) * 0.5;
         groupRef.current.rotation.x = -Math.PI / 1.8 + angle;
         groupRef.current.position.y = -1.5 + (angle * 2);
         groupRef.current.position.z = 1;

         // Arms push
         if(leftArmRef.current) leftArmRef.current.rotation.x = Math.PI / 3;
         if(rightArmRef.current) rightArmRef.current.rotation.x = Math.PI / 3;

      } else {
        // Idle - Breathing
        groupRef.current.position.y = Math.sin(t * 1.5) * 0.05;
        groupRef.current.rotation.x = 0;
        groupRef.current.position.z = 0;
        
        // Idle - Subtle arm sway
        if(leftArmRef.current) leftArmRef.current.rotation.z = 0.1 + Math.sin(t) * 0.05;
        if(rightArmRef.current) rightArmRef.current.rotation.z = -0.1 - Math.sin(t) * 0.05;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* --- Torso --- */}
      {/* Hips */}
      <BodyPart position={[0, -0.2, 0]} args={[0.7, 0.4, 0.5]} />
      {/* Stomach/Spine */}
      <BodyPart position={[0, 0.4, 0]} args={[0.5, 0.8, 0.4]} />
      {/* Chest */}
      <BodyPart position={[0, 1.1, 0]} args={[0.9, 0.7, 0.55]} />
      
      {/* --- Head --- */}
      <Joint position={[0, 1.6, 0]} size={0.15} /> {/* Neck */}
      <BodyPart position={[0, 1.95, 0]} args={[0.45, 0.55, 0.5]} color="#333" /> {/* Head */}
      {/* Visor/Eyes */}
      <mesh position={[0, 1.95, 0.26]}>
        <boxGeometry args={[0.35, 0.1, 0.05]} />
        <meshStandardMaterial color="#CDFF00" emissive="#CDFF00" emissiveIntensity={1} />
      </mesh>

      {/* --- Arms --- */}
      {/* Left Arm Group */}
      <group ref={leftArmRef} position={[-0.65, 1.3, 0]}>
        <Joint position={[0, 0, 0]} size={0.18} /> {/* Shoulder */}
        <BodyPart position={[-0.15, -0.4, 0]} args={[0.25, 0.7, 0.25]} /> {/* Upper Arm */}
        <Joint position={[-0.15, -0.85, 0]} size={0.14} /> {/* Elbow */}
        <BodyPart position={[-0.15, -1.25, 0]} args={[0.22, 0.7, 0.22]} /> {/* Forearm */}
        <BodyPart position={[-0.15, -1.65, 0]} args={[0.2, 0.25, 0.2]} color="#111" /> {/* Hand */}
      </group>

      {/* Right Arm Group */}
      <group ref={rightArmRef} position={[0.65, 1.3, 0]}>
        <Joint position={[0, 0, 0]} size={0.18} /> {/* Shoulder */}
        <BodyPart position={[0.15, -0.4, 0]} args={[0.25, 0.7, 0.25]} /> {/* Upper Arm */}
        <Joint position={[0.15, -0.85, 0]} size={0.14} /> {/* Elbow */}
        <BodyPart position={[0.15, -1.25, 0]} args={[0.22, 0.7, 0.22]} /> {/* Forearm */}
        <BodyPart position={[0.15, -1.65, 0]} args={[0.2, 0.25, 0.2]} color="#111" /> {/* Hand */}
      </group>

      {/* --- Legs --- */}
      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.25, -0.4, 0]}>
        <Joint position={[0, 0, 0]} size={0.18} /> {/* Hip Joint */}
        <BodyPart position={[0, -0.5, 0]} args={[0.3, 0.9, 0.3]} /> {/* Thigh */}
        <Joint position={[0, -1.0, 0]} size={0.16} /> {/* Knee */}
        <BodyPart position={[0, -1.5, 0]} args={[0.25, 0.9, 0.25]} /> {/* Shin */}
        <BodyPart position={[0, -2.0, 0.1]} args={[0.28, 0.15, 0.5]} color="#111" /> {/* Foot */}
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.25, -0.4, 0]}>
        <Joint position={[0, 0, 0]} size={0.18} /> {/* Hip Joint */}
        <BodyPart position={[0, -0.5, 0]} args={[0.3, 0.9, 0.3]} /> {/* Thigh */}
        <Joint position={[0, -1.0, 0]} size={0.16} /> {/* Knee */}
        <BodyPart position={[0, -1.5, 0]} args={[0.25, 0.9, 0.25]} /> {/* Shin */}
        <BodyPart position={[0, -2.0, 0.1]} args={[0.28, 0.15, 0.5]} color="#111" /> {/* Foot */}
      </group>
    </group>
  );
};

interface StickFigureProps {
  animationType?: 'idle' | 'squat' | 'pushup';
}

const StickFigure: React.FC<StickFigureProps> = ({ animationType = 'idle' }) => {
  return (
    <div className="h-full w-full bg-surfaceHighlight/50 rounded-xl overflow-hidden relative cursor-move">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={50} />
        {/* Enabled rotation controls */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          minDistance={3}
          maxDistance={8}
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 1.5} 
        />
        
        {/* Lighting Setup for 3D look */}
        <ambientLight intensity={0.3} />
        <spotLight 
          position={[5, 10, 5]} 
          angle={0.5} 
          penumbra={1} 
          intensity={200} 
          color="#CDFF00" 
          castShadow 
        />
        <pointLight position={[-5, 5, -5]} intensity={50} color="#FFFFFF" />
        
        <HumanModel animationType={animationType} />
        
        <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.5} far={10} color="#000000" />
      </Canvas>
      
      <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded-full text-xs text-primary font-mono border border-primary/20 pointer-events-none">
        3D PREVIEW • DRAG TO ROTATE
      </div>
    </div>
  );
};

export default StickFigure;
