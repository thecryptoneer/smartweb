import React, {useEffect, useRef, useState} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import {Center, RoundedBox, Text3D} from "@react-three/drei";
import {visibleHeightAtZDepth, visibleWidthAtZDepth} from "@/helpers/global";
const colors = [
  "#000000",
]

const fonts = [
  "./fonts/droid_sans_bold.typeface.json",
  "./fonts/droid_sans_mono_regular.typeface.json",
  "./fonts/droid_sans_regular.typeface.json",
  "./fonts/droid_serif_bold.typeface.json",
  "./fonts/droid_serif_regular.typeface.json",
  "./fonts/gentilis_bold.typeface.json",
  "./fonts/gentilis_regular.typeface.json",
  "./fonts/helvetiker_bold.typeface.json",
  "./fonts/helvetiker_regular.typeface.json",
  "./fonts/optimer_bold.typeface.json",
  "./fonts/optimer_regular.typeface.json",
];

const Banner = (props) => {
  const service_examples = [
    // "Branding Kit",
    "Hosting",
    "Online Stores",
    "Blogs",
    "Websites",
    "API Integrations",
    "Frontend",
    "Backend",
    "UI/UX Design",
    "Landingpages",
    "Web Apps",
    "MVPs",
    "Prototypes",
    "Wireframes",
    "DApps",
    "Mobile Apps",
    "Animations",
    "3D Models",
    "SEO",
    "Consulting",
    "Maintenance",
  ];

  const chipRef = useRef([]);
  const groupRef = useRef(null);
  chipRef.current = [];
  const { width: w, height: h } = useThree((state) => state.viewport);

  const [hovered, setHovered] = useState(Array(service_examples.length).fill(false));
  const [font, setFont] = useState(null);

  const gap = 1.6;
  const threshold = -8;
  const offset = -8;
  const speed = 100; // Adjust the speed factor as necessary

  const degToRad = (deg) => {
    return deg * (Math.PI / 180);
  }

  const isAnimationInitialState = Array(service_examples.length).fill(false);
  const [isAnimation, setIsAnimation] = useState(isAnimationInitialState);
  // Set initial positions of the chips
  useEffect(() => {
    chipRef.current.forEach((ref: any, i: number) => {
      if (ref) {
        ref.position.x = i * gap + offset;

        // assign random color
        const mesh = ref.children[0];
        mesh.material.color.setHex(parseInt(colors[Math.floor(Math.random() * colors.length)].replace("#", "0x")));
      }
    });
  }, [gap, offset]);
  const {camera} = useThree();

  const [freezeY, setFreezeY] = useState(false);

  useFrame((state) => {
    const delta = state.clock.getDelta();
    if (!groupRef?.current) return;

    const visibleWidth = visibleWidthAtZDepth(groupRef.current.position.z, camera);
    const visibleHeight = visibleHeightAtZDepth(groupRef.current.position.z, camera);
    const isMobile = window.innerWidth < 959;
    const isLandScape = window.innerWidth > window.innerHeight;

    chipRef.current.forEach((ref, i) => {
      if (ref) {

        if (isLandScape && isMobile) {
          if (!freezeY) {
            ref.position.y = -visibleHeight / 2 + 0.5;
          }
        } else if (isLandScape) {
          if (!freezeY) {
            ref.position.y = -visibleHeight / 2 + 1;
          }
        } else {
          if (!freezeY) {
            ref.position.y = -visibleHeight / 2 + 1;
          }
        }
        if (freezeY) {
          ref.position.z = 0.1;
        }
        setFreezeY(true);

        // scroll position
        ref.position.x -= speed * delta;

        if (ref.position.x < threshold) {
          const lastChip = chipRef.current.reduce((prev, curr) => {
            return curr && curr.position.x > prev.position.x ? curr : prev;
          }, {position: {x: threshold}});

          ref.position.x = lastChip.position.x + gap;
        }

        // // if is not animating, rotate back to 0
        if (!isAnimation[i]) {
          ref.rotation.x = degToRad(-5)
        }
      }
    });
  });



  const rotateX360 = (index, xStartRad) => {
    const group = chipRef.current[index];
    const mesh = group.children[0];

    // change to random color
    // mesh.material.color.setHex(parseInt(colors[Math.floor(Math.random() * colors.length)].replace("#", "0x")));

    // rotate 360/1000 degree per millisecond
    const start = Date.now();
    const animate = () => {
      const now = Date.now();
      const elapsed = now - start;
      const rotation = (elapsed / 500) * (Math.PI * 2);
      group.rotation.x = rotation;

      if (elapsed < 500) {
        requestAnimationFrame(animate);
      } else {
        group.rotation.x = xStartRad;
        setIsAnimation((prev) => {
          const newState = [...prev];
          newState[index] = false;
          return newState;
        })
      }
    };

    if (!isAnimation[index]) {
      setIsAnimation((prev) => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      })
      animate();
    }
  }

  return (
    <group ref={groupRef} position={[0, 0, 0.2]} scale={[0.8,0.8,0.8]}>
      {service_examples.map((service, index) => (
        <group key={`service-${index}`} ref={(el) => (chipRef.current[index] = el)}>

          <RoundedBox
            args={[1.2, 0.24, 0.05]}
            onPointerOver={() => rotateX360(index, degToRad(-5))}
            onClick={() => rotateX360(index,degToRad(-5))}
          >
            <meshStandardMaterial attach="material"/>
            <Center disableZ>
              <Text3D
                position={[0, 0, 0.025]}
                scale={0.07}
                height={0.02}
                letterSpacing={0.05}
                font={fonts[7]}
                bevelEnabled={true}
                bevelThickness={0.01}
                color={"#ffffff"}
              >
                {service}
              </Text3D>
            </Center>
          </RoundedBox>

        </group>
      ))}
    </group>
  );
};

Banner.displayName = "Banner";

export default Banner;
