import React, { useRef } from 'react'
import { OrbitControls, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import flowerImg from '../assets/gta.jpeg'
import { useFrame } from '@react-three/fiber'
const Scene = () => {
  const tex = useTexture(flowerImg)
  let cyl = useRef(null)
  
  useFrame((state, delta) => {
    cyl.current.rotation.y += delta
  })
 return (
  <group rotation={[0, 0, 0]}>
    <OrbitControls/>
    <mesh ref={cyl} scale={[1.1, 1.6, 1.1]}>
      <cylinderGeometry args={[2, 2, 3, 60, 60, true]} />
      <meshBasicMaterial
        map={tex}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  </group>
)
}

export default Scene