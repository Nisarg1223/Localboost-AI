import React, { useRef } from 'react'
import { useTexture } from '@react-three/drei'
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
    <group rotation={[0, 1.4, 0.2]}>
      <mesh ref={cyl} scale={[2, 3, 2]} >
        <cylinderGeometry args={[2, 2, 3, 60, 60, true]} size={4} />
        <meshBasicMaterial map={tex} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

export default Scene