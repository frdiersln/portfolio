"use client"
import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { useControls } from 'leva'

extend({ MeshLineGeometry, MeshLineMaterial })
useGLTF.preload('/assets/card.glb')
useTexture.preload('/assets/band.jpg')

function Band({ maxSpeed = 50, minSpeed = 10 }) {
    const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef() // prettier-ignore
    const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3() // prettier-ignore
    const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 }
    const { nodes, materials } = useGLTF('/assets/card.glb')
    const texture = useTexture('/assets/band.jpg')
    const { width, height } = useThree((state) => state.size)
    const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]))
    const [dragged, drag] = useState(false)
    const [hovered, hover] = useState(false)
    console.log('Available materials:', materials)
    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]) // prettier-ignore
  
    useEffect(() => {
      if (hovered) {
        document.body.style.cursor = dragged ? 'grabbing' : 'grab'
        return () => void (document.body.style.cursor = 'auto')
      }
    }, [hovered, dragged])
  
    useFrame((state, delta) => {
      if (dragged) {
        vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
        dir.copy(vec).sub(state.camera.position).normalize()
        vec.add(dir.multiplyScalar(state.camera.position.length()))
        ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
        card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
      }
      if (fixed.current) {
        // Fix most of the jitter when over pulling the card
        ;[j1, j2].forEach((ref) => {
          if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
          const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
          ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
        })
        // Calculate catmul curve
        curve.points[0].copy(j3.current.translation())
        curve.points[1].copy(j2.current.lerped)
        curve.points[2].copy(j1.current.lerped)
        curve.points[3].copy(fixed.current.translation())
        band.current.geometry.setPoints(curve.getPoints(32))
        // Tilt it back towards the screen
        ang.copy(card.current.angvel())
        rot.copy(card.current.rotation())
        card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
      }
    })
  
    curve.curveType = 'chordal'
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  
    return (
      <>
        <group position={[4, 5, 0]}>
          <RigidBody ref={fixed} {...segmentProps} type="fixed" />
          <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
            <BallCollider args={[0.1]} />
          </RigidBody>
          <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
            <BallCollider args={[0.1]} />
          </RigidBody>
          <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
            <BallCollider args={[0.1]} />
          </RigidBody>
          <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
            <CuboidCollider args={[0.8, 1.125, 0.01]} />
            <group
              scale={2.25}
              position={[0, -1.2, -0.05]}
              rotation={[0, Math.PI, 0]}
              onPointerOver={() => hover(true)}
              onPointerOut={() => hover(false)}
              onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
              onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}>
              <mesh geometry={nodes.card.geometry} material={materials['Material.002']}>
                <mesh 
                  geometry={nodes['Group_1_(3)'].geometry} 
                  material={materials['Group 1 (3)']}
                  position={[0, 0.49, -0.207]} 
                  rotation={[Math.PI/2, 0, Math.PI]}
                  scale={[0.77, 0.77, 0.77]}
                />
              </mesh>
              <mesh geometry={nodes.clip.geometry} material={materials.metal} />
              <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
            </group>
          </RigidBody>
        </group>
        <mesh ref={band}>
          <meshLineGeometry />
          <meshLineMaterial color="white" depthTest={false} resolution={[width, height]} useMap map={texture} repeat={[-3, 1]} lineWidth={1} />
        </mesh>
      </>
    )
  }

const ThreeDCard = () => {
    return (
        <div className="canvas-container">
            <Canvas camera={{ position: [0, 0, 12], fov: 25 }}
                    style={{ position: 'absolute', pointerEvents: 'auto'}}
                    gl={{ 
                      alpha: true,
                      antialias: true,
                      transparent: true
                    }}
                    >
                <ambientLight intensity={0.22} />
                <spotLight 
                position={[10, 10, 10]} 
                angle={0.15} 
                penumbra={1} 
                intensity={0.22} 
                castShadow 
                />
                <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
                <Band />
                </Physics>
                <Environment background={false}>
                <Lightformer intensity={1} color="var(--background)" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.4, 1]} />
                <Lightformer intensity={2} color="var(--background)" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.4, 1]} />
                <Lightformer intensity={1} color="var(--background)" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.4, 1]} />
                <Lightformer intensity={5} color="var(--background)" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
                </Environment>
            </Canvas>
        </div>
    )
  };
export default ThreeDCard;