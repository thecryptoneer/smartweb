import React, { forwardRef, useEffect, useMemo, useRef } from "react";
import { useLoader, extend, ReactThreeFiber, useFrame, useThree } from "@react-three/fiber";
import * as T from "three";
import { SVGLoader, SVGResult } from "three/examples/jsm/loaders/SVGLoader";
import {visibleHeightAtZDepth, visibleWidthAtZDepth} from "@/helpers/global";

// Extend Three.js with ExtrudeGeometry
extend({ ExtrudeGeometry: T.ExtrudeGeometry });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      extrudeGeometry: ReactThreeFiber.BufferGeometryNode<T.ExtrudeGeometry, typeof T.ExtrudeGeometry>;
    }
  }
}

// Custom Extrude component
interface ExtrudeProps extends ReactThreeFiber.BufferGeometryProps {
  shapes: T.Shape[];
  options: T.ExtrudeGeometryOptions;
}

const headedTowards = new T.Vector3(0,0,-4);
const headedTowards1 = new T.Vector3(0,0,-2);

const Extrude = forwardRef<T.ExtrudeGeometry, ExtrudeProps>(({ shapes, options, ...props }, ref) => {
  return <extrudeGeometry ref={ref} args={[shapes, options]} {...props} />;
});

const Circle = (props: any) => {

  const svgData: SVGResult = useLoader(SVGLoader, "/circle-striped.svg");
  const position = props.position ? props.position : [6.2, 3, -4];
  const position1 = props.position1 ? props.position1 : [-6.4, -3, -2];
  const amount = props.amount ? props.amount : 2;
  const color = props.color ? props.color : "#ffc64b";
  const color1 = props.color1 ? props.color1 : "#4d8cff";
  // console.log({position, position1})

  useEffect(() => {
    headedTowards.set(position[0], position[1], position[2]);
    headedTowards1.set(position1[0], position1[1], position1[2]);
  }, [position, position1]);

  // Calculate the bounding box and center the shapes
  const shapes = useMemo(() => {
    const shapePaths = svgData?.paths?.flatMap((path) => path.toShapes(true));
    const boundingBox = new T.Box2();
    if (!shapePaths) return [];

    // Expand bounding box to include all shapes
    shapePaths.forEach((shape) => {
      const box = new T.Box2().setFromPoints(shape.getPoints());
      boundingBox.expandByPoint(box.min);
      boundingBox.expandByPoint(box.max);
    });

    // Get the center of the bounding box
    const center = boundingBox.getCenter(new T.Vector2());

    // Offset all shapes to the center
    shapePaths.forEach((shape) => {
      if (shape.curves) {
        shape.curves.forEach((curve: any) => {
          if (curve.v0) { curve.v0.sub(center); }
          if (curve.v1) { curve.v1.sub(center); }
          if (curve.v2) { curve.v2.sub(center); }
          if (curve.v3) { curve.v3.sub(center); }
        });
      }
    });

    return shapePaths;
  }, [svgData]);

  const meshRef = useRef<T.Group>(null);
  const meshRef1 = useRef<T.Group>(null);
  const { camera } = useThree();

  const speed = 0.13;
  const speed1 = 0.21;

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.copy(headedTowards);
    }
    if (amount > 1 && meshRef1.current) {
      meshRef1.current.position.copy(headedTowards1);
    }
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Check if the object is within the visible width and height
      const visibleWidth = visibleWidthAtZDepth(meshRef.current.position.z, camera);
      const visibleHeight = visibleHeightAtZDepth(meshRef.current.position.z, camera);
      const xRange = [-visibleWidth / 2, visibleWidth / 2];
      const yRange = [-visibleHeight / 2, visibleHeight / 2];
      const offset = 1;
      const projected = meshRef.current.position.clone().project(camera);
      const isOutside = (
        projected.x < -visibleWidth / 2 + offset ||
        projected.x > visibleWidth / 2 + offset ||
        projected.y < -visibleHeight / 2 + offset ||
        projected.y > visibleHeight / 2 + offset
      );

      // set scale
      const scale = Math.sin(state.clock.elapsedTime / 4 + 3/4*Math.PI) * 0.0012 + 0.01;
      meshRef.current.scale.set(scale, scale, scale);

      const moveTowardsTarget = headedTowards.clone().sub(meshRef.current.position).normalize();
      const moveTowards = moveTowardsTarget.multiplyScalar(speed);

      const distanceFromMoveTowards = meshRef.current.position.distanceTo(headedTowards);
      if (isOutside || distanceFromMoveTowards < 0.1) {
        const x = 2 + Math.abs(Math.random() * xRange[0]);
        const y = 2 + Math.abs(Math.random() * yRange[0]);
        // create random point outside the safe box
        const randomPoint = new T.Vector2(
          Math.random() > 0.5 ? x : -x,
          Math.random() > 0.5 ? y : -y
        );
        headedTowards.set(randomPoint.x, randomPoint.y, 0);
      } else {
        meshRef.current.position.add(moveTowards.multiplyScalar(delta));
      }
    }

    if (amount > 1 && meshRef1.current) {
      // Check if the object is within the visible width and height
      const visibleWidth = visibleWidthAtZDepth(meshRef1.current.position.z, camera);
      const visibleHeight = visibleHeightAtZDepth(meshRef1.current.position.z, camera);
      const xRange = [-visibleWidth / 2, visibleWidth / 2];
      const yRange = [-visibleHeight / 2, visibleHeight / 2];
      const projected = meshRef1.current.position.clone().project(camera);
      const offset = 1;
      const isOutside = (
        projected.x < -visibleWidth / 2 + offset ||
        projected.x > visibleWidth / 2 + offset ||
        projected.y < -visibleHeight / 2 + offset ||
        projected.y > visibleHeight / 2 + offset
      );

      const scale = Math.sin(state.clock.elapsedTime / 6) * 0.001 + 0.007;
      meshRef1.current.scale.set(scale, scale, scale);

      const moveTowardsTarget = headedTowards1.clone().sub(meshRef1.current.position).normalize();
      const moveTowards = moveTowardsTarget.multiplyScalar(speed1);

      const distanceFromMoveTowards = meshRef1.current.position.distanceTo(headedTowards1);
      if (isOutside || distanceFromMoveTowards < 1) {
        const x = 2 + Math.abs(Math.random() * xRange[0]);
        const y = 2 + Math.abs(Math.random() * yRange[0]);
        // create random point outside the safe box
        const randomPoint = new T.Vector2(
          Math.random() > 0.5 ? x : -x,
          Math.random() > 0.5 ? y : -y
        );
        headedTowards1.set(randomPoint.x, randomPoint.y, 0);
      } else {
        meshRef1.current.position.add(moveTowards.multiplyScalar(delta));
      }
    }
  });

  return (
    <>
      <group ref={meshRef} scale={0.016} position={position} rotation={[0, 0, Math.PI / 2]}>
        {shapes.map((shape, i) => (
          <mesh key={i}>
            <Extrude shapes={[shape]} options={{ depth: 1, bevelEnabled: false, steps: 20 }} />
            <meshPhongMaterial color={color} side={T.DoubleSide} opacity={1} />
          </mesh>
        ))}
      </group>

      {
        amount > 1 && (<group ref={meshRef1} scale={0.00951} position={position1} rotation={[0, 0, Math.PI / 2]}>
          {shapes.map((shape, i) => (
            <mesh key={i}>
              <Extrude shapes={[shape]} options={{ depth: 1, bevelEnabled: false, steps: 20 }} />
              <meshPhongMaterial color={color1} side={T.DoubleSide} opacity={1} />
            </mesh>
          ))}
        </group>)
      }
    </>
  );
};

Circle.displayName = "Circle"
export default Circle;