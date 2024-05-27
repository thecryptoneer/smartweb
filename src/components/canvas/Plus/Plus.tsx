import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import {MeshProps, useLoader, extend, ReactThreeFiber, useFrame, useThree} from "@react-three/fiber";
import * as T from "three";
import {SVGLoader, SVGResult} from "three/examples/jsm/loaders/SVGLoader";
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

const Extrude = forwardRef<T.ExtrudeGeometry, ExtrudeProps>(({ shapes, options, ...props }, ref) => {
  return <extrudeGeometry ref={ref} args={[shapes, options]} {...props} />;
});

const PlusSvg = (props: MeshProps) => {
  const meshRef = useRef<T.Group>(null);
  const meshRef1 = useRef<T.Group>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const svgData: SVGResult = useLoader(SVGLoader, "/plus-mosaic.svg");

  // Calculate the bounding box and center the shapes
  const shapes = useMemo(() => {
    const shapePaths = svgData.paths.flatMap((path) => path.toShapes(true));

    // Get the center of the bounding box
    const center = new T.Box2().setFromPoints(shapePaths[0].getPoints()).getCenter(new T.Vector2());

    // Offset all shapes to the center
    shapePaths.forEach((shape) => {
      // update currentPoint
      if (shape.curves) {
        shape.curves.forEach((curve:any) => {
          if (curve.v0) curve.v0.sub(center);
          if (curve.v1) curve.v1.sub(center);
          if (curve.v2) curve.v2.sub(center);
          if (curve.v3) curve.v3.sub(center);
        });
      }
    })

    return shapePaths;
  }, [svgData, meshRef.current, meshRef1.current]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // const mouseXY = getXYFromMouse(event);
      // console.log("mouseXY", mouseXY);
      setMousePos({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const { width: w, height: h } = useThree((state) => state.viewport);
  const { camera } = useThree();

  const lerpTime = 0.2;
  useFrame(() => {
    if (!meshRef?.current || !meshRef1?.current) return;
    const visibleWidth = visibleWidthAtZDepth(meshRef.current.position.z, camera);
    const visibleHeight = visibleHeightAtZDepth(meshRef.current.position.z, camera);
    const xRange = [-visibleWidth / 2, visibleWidth / 2];
    const yRange = [-visibleHeight / 2, visibleHeight / 2];

    if (meshRef.current) {
      const x = mousePos.x;
      const y = mousePos.y;

      const distance = Math.sqrt((x-meshRef.current.position.x)**2 + (y-meshRef.current.position.y)**2) * 1.5;

      const offsetX = 0.8 // distance from left edge
      const offsetY = 0.95 // distance from top edge

      // top left corner
      meshRef.current.position.x = xRange[0] + offsetX;
      meshRef.current.position.y = yRange[1] - offsetY;
      meshRef.current.position.z = 0.01;

      meshRef.current.rotation.z = T.MathUtils.lerp(meshRef.current.rotation.z, distance, lerpTime);
    }

    if (meshRef1.current) {
      const x = mousePos.x;
      const y = mousePos.y;

      const distance = Math.sqrt((x-meshRef.current.position.x)**2 + (y-meshRef.current.position.y)**2) * 1.5;

      // get center of meshRef1
      const center = new T.Vector3();
      meshRef1.current.getWorldPosition(center);

      // get width of meshRef1
      const box = new T.Box3().setFromObject(meshRef1.current);
      // console.log("box", box);

      // calculate real center
      center.x -= box.getSize(new T.Vector3()).x / 2;
      center.y += box.getSize(new T.Vector3()).y / 2;

      const offsetX = 1.8 // distance from left edge
      const offsetY = 0.95 // distance from top edge

      // top left corner
      meshRef1.current.position.x = xRange[0] + offsetX;
      meshRef1.current.position.y = yRange[1] - offsetY;
      meshRef1.current.position.z = 0.01;

      meshRef1.current.rotation.z = T.MathUtils.lerp(meshRef1.current.rotation.z, distance, lerpTime);
    }
  });

  return (
    <>
      <group ref={meshRef1} scale={0.03}>
        {shapes.map((shape, i) => (
          <mesh key={i}>
            <Extrude
              shapes={[shape]}
              options={{ depth: 2, bevelEnabled: false, steps: 1}}
            />
            <meshPhongMaterial color={"#c27efc"} side={T.DoubleSide} />
          </mesh>
        ))}
      </group>

      <group ref={meshRef} scale={0.03}>
        {shapes.map((shape, i) => (
          <mesh key={i}>
            <Extrude
              shapes={[shape]}
              options={{ depth: 2, bevelEnabled: false, steps: 1}}
            />
            <meshPhongMaterial color={"#09f8d8"} side={T.DoubleSide} />
          </mesh>
        ))}
      </group>
    </>
  );
};
PlusSvg.displayName = "Plus";
export default PlusSvg;
