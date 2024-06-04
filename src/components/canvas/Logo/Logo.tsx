import React, {forwardRef, useEffect, useMemo, useRef, useState} from "react";
import {MeshProps, useLoader, extend, ReactThreeFiber, useFrame, useThree} from "@react-three/fiber";
import * as T from "three";
import {SVGLoader, SVGResult} from "three/examples/jsm/loaders/SVGLoader";
import {visibleHeightAtZDepth, visibleWidthAtZDepth} from "@/helpers/global";
import {isMobile, isTablet} from 'react-device-detect';

// Extend Three.js with ExtrudeGeometry
extend({ExtrudeGeometry: T.ExtrudeGeometry});

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

const Extrude = forwardRef<T.ExtrudeGeometry, ExtrudeProps>(({shapes, options, ...props}, ref) => {
  return <extrudeGeometry ref={ref} args={[shapes, options]} {...props} />;
});

const isLikelyTouchDevice = isMobile || isTablet;

const Logo = (props: MeshProps) => {
  const svgData: SVGResult = useLoader(SVGLoader, "/smart-web.svg");

  // Calculate the bounding box and center the shapes
  const shapes = useMemo(() => {
    const shapePaths = svgData?.paths?.flatMap((path) => path.toShapes(true));
    if (!shapePaths) return [];

    const center = new T.Box2().setFromPoints(shapePaths[0].getPoints()).getCenter(new T.Vector2());

    // Offset all shapes to the center
    shapePaths.forEach((shape) => {
      // update currentPoint
      if (shape.curves) {
        shape.curves.forEach((curve: any) => {
          curve.v0.sub(center);
          curve.v1.sub(center);
          curve.v2.sub(center);
          curve.v3.sub(center);
        });
      }
    })

    return shapePaths;
  }, [svgData]);

  const meshRef = useRef<T.Group>(null);
  const [mousePos, setMousePos] = useState({x: 0, y: 0});
  const [isScrolling, setIsScrolling] = useState(false);


  useEffect(() => {
    console.log('isScrolling', isScrolling)
  }, [isScrolling]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2,
      });
    };
    const handleTouchMove = (event: TouchEvent) => {
      setMousePos({
        x: (event.touches[0].clientX / window.innerWidth) * 2 - 1,
        y: -(event.touches[0].clientY / window.innerHeight) * 2,
      });
    }
    const handleScroll = () => {
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 1000);
    }

    // mouse and mobile touch events
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    // scroll detection to block animation during scroll
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const lerpTime = 0.2;
  const {camera} = useThree();

  useFrame(() => {
    if (isScrolling) return;
    if (!meshRef?.current) return;

    const visibleWidth = visibleWidthAtZDepth(meshRef.current.position.z, camera);
    const visibleHeight = visibleHeightAtZDepth(meshRef.current.position.z, camera);
    const isLandScape = window.innerWidth > window.innerHeight;
    // Adjust these multipliers to control the sensitivity of the rotation
    const rotationMultiplier = 0.3;

    // lerp the rotation of the logo
    meshRef.current.rotation.x = T.MathUtils.lerp(meshRef.current.rotation.x, -mousePos.y * rotationMultiplier, lerpTime);
    meshRef.current.rotation.y = T.MathUtils.lerp(meshRef.current.rotation.y, mousePos.x * rotationMultiplier, lerpTime);

    const hasXAndY = meshRef.current.position.x && meshRef.current.position.y;
    if (hasXAndY && isMobile || isTablet) {
      return;
    }

    const x = mousePos.x;
    const y = mousePos.y;

    // Adjust this multiplier to control the sensitivity of the scaling
    const scaleMultiplier = 0.0045;
    const distance = Math.sqrt(mousePos.x ** 2 + mousePos.y ** 2);

    const scalar = (isLikelyTouchDevice ? 0.013 : 0.016) + -distance / 2 * scaleMultiplier;
    meshRef.current.scale.setScalar(T.MathUtils.lerp(meshRef.current.scale.x, scalar, lerpTime));

    // move the logo in direction of the mouse
    const moveMultiplierX = 0.5;
    const moveMultiplierY = 0.1;
    meshRef.current.position.x = T.MathUtils.lerp(meshRef.current.position.x, x * moveMultiplierX, lerpTime);
    let positionYMultiplier = 0.25;
    if (isMobile && isLandScape) {
      positionYMultiplier = 0.4;
    } else if (isLandScape) {
      positionYMultiplier = 0.33;
    }
    meshRef.current.position.y = T.MathUtils.lerp(meshRef.current.position.y, visibleHeight * positionYMultiplier + y * moveMultiplierY, lerpTime);
    meshRef.current.position.z = 2;
  });

  return (
    <group ref={meshRef} scale={0.0001} rotation={[0, 0, Math.PI]}>
      {shapes.map((shape, i) => (
        <mesh key={i}>
          <Extrude
            shapes={[shape]}
            options={{depth: 3, bevelEnabled: false, steps: 1}}
          />
          <meshPhongMaterial color="#000" side={T.DoubleSide}/>
        </mesh>
      ))}
    </group>
  );
};
Logo.displayName = "Logo";

export default Logo;
