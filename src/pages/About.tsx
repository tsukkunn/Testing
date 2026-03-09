import React, { useRef, Suspense, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Eye, Target, CheckCircle2, Leaf, MapPin } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

// --- 3D FLUID SHAPES COMPONENT ---

const vertexShader = `
  uniform float uTime;
  uniform float uDistort;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vUv = uv;
    vNormal = normal;
    
    vec3 pos = position;
    
    // Add fluid noise
    float noiseFreq = 2.0;
    vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y * noiseFreq + uTime * 0.5, pos.z * noiseFreq);
    float noise = snoise(noisePos) * uDistort;
    
    vec3 finalPos = pos + normal * noise;
    
    vPosition = finalPos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vec3 lightDir = normalize(vec3(1.0, 2.0, 1.0));
    
    // Approximate normal since we deformed the vertices
    vec3 dx = dFdx(vPosition);
    vec3 dy = dFdy(vPosition);
    vec3 calcNormal = normalize(cross(dx, dy));
    
    float diff = max(dot(calcNormal, lightDir), 0.0);
    
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - max(dot(calcNormal, viewDir), 0.0), 3.0);
    
    float mixFactor = sin(vPosition.y * 2.0 + uTime) * 0.5 + 0.5;
    vec3 baseColor = mix(uColor1, uColor2, mixFactor);
    
    vec3 finalColor = baseColor * (diff * 0.6 + 0.4) + vec3(1.0) * fresnel * 0.8;
    
    gl_FragColor = vec4(finalColor, 0.95);
  }
`;

// Shared material instance
const fluidMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uDistort: { value: 0.05 },
    uColor1: { value: new THREE.Color('#ea580c') }, // Orange
    uColor2: { value: new THREE.Color('#16a34a') }, // Green
  },
  transparent: true,
  side: THREE.DoubleSide,
});

// 1. Daun Maple (Maple Leaf)
function MapleShape() {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 1.2);
    s.lineTo(0.2, 0.6);
    s.lineTo(0.8, 0.7);
    s.lineTo(0.4, 0.2);
    s.lineTo(0.9, -0.4);
    s.lineTo(0.3, -0.3);
    s.lineTo(0.1, -0.9);
    s.lineTo(0.05, -1.4); // stem
    s.lineTo(-0.05, -1.4);
    s.lineTo(-0.1, -0.9);
    s.lineTo(-0.3, -0.3);
    s.lineTo(-0.9, -0.4);
    s.lineTo(-0.4, 0.2);
    s.lineTo(-0.8, 0.7);
    s.lineTo(-0.2, 0.6);
    s.lineTo(0, 1.2);
    return s;
  }, []);
  return (
    <mesh material={fluidMaterial} position={[0, 0, -0.1]}>
      <extrudeGeometry args={[shape, { depth: 0.2, bevelEnabled: true, bevelSegments: 4, steps: 2, bevelSize: 0.05, bevelThickness: 0.05 }]} />
    </mesh>
  );
}

// 2. Daun Monstera (Monstera Leaf)
function MonsteraShape() {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, -1.2); // stem base
    s.lineTo(0.05, -0.8);
    s.bezierCurveTo(0.8, -1.0, 1.3, -0.2, 1.1, 0.5); 
    s.lineTo(0.6, 0.4); s.lineTo(1.1, 0.8); // cut 1
    s.bezierCurveTo(1.0, 1.2, 0.6, 1.4, 0.3, 1.4);
    s.lineTo(0.1, 0.9); s.lineTo(0.1, 1.5); // cut 2
    s.bezierCurveTo(-0.2, 1.5, -0.6, 1.3, -0.8, 1.0);
    s.lineTo(-0.4, 0.7); s.lineTo(-1.0, 0.8); // cut 3
    s.bezierCurveTo(-1.2, 0.4, -1.2, -0.1, -0.9, -0.5);
    s.lineTo(-0.4, -0.3); s.lineTo(-0.8, -0.8); // cut 4
    s.bezierCurveTo(-0.5, -1.0, -0.2, -0.9, -0.05, -0.8);
    s.lineTo(0, -1.2);

    const hole1 = new THREE.Path();
    hole1.absellipse(0.4, -0.2, 0.08, 0.15, 0, Math.PI*2, false, 0.2);
    s.holes.push(hole1);

    const hole2 = new THREE.Path();
    hole2.absellipse(-0.3, 0.1, 0.06, 0.12, 0, Math.PI*2, false, -0.3);
    s.holes.push(hole2);

    return s;
  }, []);
  return (
    <mesh material={fluidMaterial} position={[0, 0, -0.1]}>
      <extrudeGeometry args={[shape, { depth: 0.2, bevelEnabled: true, bevelSegments: 4, steps: 2, bevelSize: 0.05, bevelThickness: 0.05 }]} />
    </mesh>
  );
}

// 3. Daun Ek (Oak Leaf)
function OakShape() {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, -1.3); // stem
    s.lineTo(0.05, -0.9);
    s.bezierCurveTo(0.5, -0.9, 0.7, -0.5, 0.4, -0.2); // lobe 1 right
    s.bezierCurveTo(0.9, -0.1, 1.0, 0.4, 0.5, 0.6);   // lobe 2 right
    s.bezierCurveTo(0.9, 0.8, 0.7, 1.3, 0.3, 1.2);    // lobe 3 right
    s.bezierCurveTo(0.4, 1.6, 0.1, 1.7, 0, 1.6);      // top lobe
    s.bezierCurveTo(-0.1, 1.7, -0.4, 1.6, -0.3, 1.2); // top lobe left
    s.bezierCurveTo(-0.7, 1.3, -0.9, 0.8, -0.5, 0.6); // lobe 3 left
    s.bezierCurveTo(-1.0, 0.4, -0.9, -0.1, -0.4, -0.2); // lobe 2 left
    s.bezierCurveTo(-0.7, -0.5, -0.5, -0.9, -0.05, -0.9); // lobe 1 left
    s.lineTo(0, -1.3);
    return s;
  }, []);
  return (
    <mesh material={fluidMaterial} position={[0, 0, -0.1]} scale={0.9}>
      <extrudeGeometry args={[shape, { depth: 0.2, bevelEnabled: true, bevelSegments: 4, steps: 2, bevelSize: 0.05, bevelThickness: 0.05 }]} />
    </mesh>
  );
}

// 4. Daun Ginkgo (Ginkgo Leaf)
function GinkgoShape() {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, -1.2); // stem bottom
    s.lineTo(0.05, -0.4); // stem top right
    s.bezierCurveTo(0.8, -0.3, 1.4, 0.5, 1.2, 1.1); // right fan edge
    s.bezierCurveTo(1.0, 1.4, 0.4, 1.3, 0.05, 0.8); // right top wavy to center cleft
    s.lineTo(0, 0.4); // cleft
    s.lineTo(-0.05, 0.8); // left top wavy from center cleft
    s.bezierCurveTo(-0.4, 1.3, -1.0, 1.4, -1.2, 1.1); // left top wavy
    s.bezierCurveTo(-1.4, 0.5, -0.8, -0.3, -0.05, -0.4); // left fan edge
    s.lineTo(0, -1.2);
    return s;
  }, []);
  return (
    <mesh material={fluidMaterial} position={[0, 0, -0.1]}>
      <extrudeGeometry args={[shape, { depth: 0.2, bevelEnabled: true, bevelSegments: 4, steps: 2, bevelSize: 0.05, bevelThickness: 0.05 }]} />
    </mesh>
  );
}

// 5. Daun Singkong (Cassava / Palmate Leaf)
function CassavaShape() {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, -1.2); // stem
    s.lineTo(0.05, -0.2); // center base
    // Right lower leaflet
    s.lineTo(0.8, -0.5); s.lineTo(0.9, -0.4); s.lineTo(0.15, -0.05);
    // Right middle leaflet
    s.lineTo(1.2, 0.2); s.lineTo(1.2, 0.35); s.lineTo(0.15, 0.15);
    // Right top leaflet
    s.lineTo(0.8, 1.0); s.lineTo(0.7, 1.1); s.lineTo(0.1, 0.25);
    // Center top leaflet
    s.lineTo(0.15, 1.3); s.lineTo(0, 1.4); s.lineTo(-0.15, 1.3); s.lineTo(-0.1, 0.25);
    // Left top leaflet
    s.lineTo(-0.7, 1.1); s.lineTo(-0.8, 1.0); s.lineTo(-0.15, 0.15);
    // Left middle leaflet
    s.lineTo(-1.2, 0.35); s.lineTo(-1.2, 0.2); s.lineTo(-0.15, -0.05);
    // Left lower leaflet
    s.lineTo(-0.9, -0.4); s.lineTo(-0.8, -0.5); s.lineTo(-0.05, -0.2);
    s.lineTo(0, -1.2);
    return s;
  }, []);
  return (
    <mesh material={fluidMaterial} position={[0, 0, -0.1]} scale={0.9}>
      <extrudeGeometry args={[shape, { depth: 0.2, bevelEnabled: true, bevelSegments: 4, steps: 2, bevelSize: 0.04, bevelThickness: 0.04 }]} />
    </mesh>
  );
}

function FluidMorph() {
  const groupRefs = [
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null)
  ];

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    fluidMaterial.uniforms.uTime.value = time;
    
    const cycleDuration = 10; // 10 seconds per shape (8s stable, 2s transition)
    const transitionDuration = 2;
    
    const phase = time % cycleDuration;
    const currentIdx = Math.floor(time / cycleDuration) % 5;
    const nextIdx = (currentIdx + 1) % 5;
    
    let progress = 0;
    if (phase > cycleDuration - transitionDuration) {
      progress = (phase - (cycleDuration - transitionDuration)) / transitionDuration;
    }
    
    const smoothProgress = progress * progress * (3 - 2 * progress);
    
    // Increase distortion during transition to make it look like a morphing blob
    fluidMaterial.uniforms.uDistort.value = 0.03 + Math.sin(smoothProgress * Math.PI) * 0.4;
    
    groupRefs.forEach((ref, idx) => {
      if (!ref.current) return;
      
      if (idx === currentIdx) {
        const scale = 1 - smoothProgress;
        ref.current.scale.setScalar(scale);
        ref.current.visible = scale > 0.01;
      } else if (idx === nextIdx) {
        const scale = smoothProgress;
        ref.current.scale.setScalar(scale);
        ref.current.visible = scale > 0.01;
      } else {
        ref.current.visible = false;
      }
    });
  });

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={1}>
      <group ref={groupRefs[0]}><MapleShape /></group>
      <group ref={groupRefs[1]}><MonsteraShape /></group>
      <group ref={groupRefs[2]}><OakShape /></group>
      <group ref={groupRefs[3]}><GinkgoShape /></group>
      <group ref={groupRefs[4]}><CassavaShape /></group>
    </Float>
  );
}

// --- MAIN PAGE COMPONENT ---

export default function About() {
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal animations for text and boxes
    gsap.utils.toArray('.reveal-up').forEach((el: any) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });

    // Parallax for images
    gsap.utils.toArray('.parallax-img').forEach((img: any) => {
      gsap.to(img, {
        scrollTrigger: {
          trigger: img.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: "15%",
        ease: "none"
      });
    });
  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="bg-[#f8f9fa] dark:bg-[#0a0a0a] text-[#1a1a1a] dark:text-[#f5f5f0] transition-colors duration-500 overflow-hidden font-sans">
      
      {/* 1. HERO SECTION (Fluid 3D Model) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-gradient-to-b from-orange-50/50 to-transparent dark:from-orange-900/10 dark:to-transparent">
        {/* 3D Canvas Background */}
        <div className="absolute inset-0 z-0 opacity-90 dark:opacity-70 pointer-events-auto cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <Environment preset="city" />
            <Suspense fallback={null}>
              <FluidMorph />
              <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-32 pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight leading-tight mb-6 text-black dark:text-white drop-shadow-xl"
          >
            Nara Kupu Jogja
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl max-w-2xl mx-auto text-gray-800 dark:text-gray-200 font-medium drop-shadow-md"
          >
            Harmoni antara manusia, alam, dan kebahagiaan di jantung Yogyakarta.
          </motion.p>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.2em] uppercase font-semibold opacity-50">Scroll</span>
          <div className="w-[1px] h-12 bg-black/30 dark:bg-white/30" />
        </motion.div>
      </section>

      {/* 2. DESKRIPSI SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="reveal-up order-2 lg:order-1">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative shadow-2xl">
              <img 
                src="https://res.cloudinary.com/dchitlxsf/image/upload/v1772556494/1772556200-picsays_vwwsse.jpg" 
                alt="Rusa di Nara Kupu" 
                className="parallax-img absolute inset-0 w-full h-[120%] object-cover -top-[10%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={18} className="text-orange-400" />
                  <span className="text-sm font-medium tracking-wider uppercase">Sleman, DIY</span>
                </div>
              </div>
            </div>
          </div>
          <div className="reveal-up order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-black dark:text-white">
              Oase Ekologis di <br/><span className="text-orange-500 italic font-light">Kota Pelajar</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Nara Kupu Jogja adalah destinasi agroeduwisata terpadu yang memadukan keindahan alam, edukasi pertanian, dan rekreasi keluarga dalam satu kawasan yang asri. Terletak di lingkungan yang sejuk, kami menawarkan pelarian sempurna dari hiruk-pikuk kehidupan perkotaan.
              </p>
              <p>
                Lebih dari sekadar tempat wisata, Nara Kupu adalah ruang interaksi. Di sini, pengunjung dapat berinteraksi langsung dengan rusa-rusa jinak kami, belajar bercocok tanam organik di area agrowisata, menikmati hidangan segar dari kebun ke meja di resto & cafe kami, hingga menginap di akomodasi berkonsep tradisional yang menyatu dengan alam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SEJARAH SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto bg-white dark:bg-[#111] rounded-[3rem] md:rounded-[5rem] shadow-sm border border-gray-100 dark:border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="reveal-up">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-black dark:text-white">
              Jejak Langkah <br/><span className="text-orange-500 italic font-light">Perjalanan Kami</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Berawal dari sebuah lahan kosong yang menyimpan potensi besar, Nara Kupu Jogja didirikan dengan satu mimpi sederhana: menciptakan ruang di mana manusia dapat kembali terhubung dengan bumi.
              </p>
              <p>
                Seiring berjalannya waktu, visi tersebut berkembang. Kami mulai membangun fasilitas agrowisata untuk mengedukasi generasi muda tentang pentingnya ketahanan pangan dan kelestarian lingkungan. Kehadiran rusa-rusa yang menjadi ikon kami menambah kehangatan dan daya tarik kawasan ini.
              </p>
              <p>
                Kini, Nara Kupu Jogja telah bertransformasi menjadi ekosistem wisata yang lengkap—menyediakan resto, cafe, venue acara, hingga penginapan—tanpa pernah meninggalkan akar filosofisnya: merawat alam dan menebar kebahagiaan.
              </p>
            </div>
          </div>
          <div className="reveal-up">
            <div className="aspect-square md:aspect-[4/3] lg:aspect-square rounded-[2rem] overflow-hidden relative shadow-2xl">
              <img 
                src="https://res.cloudinary.com/dchitlxsf/image/upload/v1772941036/file_00000000df687206ad778267be2268fa-1000604423_h7biws.png" 
                alt="Sejarah Nara Kupu" 
                className="parallax-img absolute inset-0 w-full h-[120%] object-cover -top-[10%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. VISI & MISI BOXES */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <div className="text-center mb-16 reveal-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black dark:text-white mb-4">Tujuan Kami</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Kompas yang mengarahkan setiap langkah Nara Kupu Jogja.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* VISI BOX */}
          <div className="lg:col-span-5 reveal-up relative overflow-hidden rounded-[2.5rem] bg-orange-500 text-white p-10 md:p-14 flex flex-col justify-center shadow-xl">
            {/* Background Pattern/Image */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
              <img 
                src="https://res.cloudinary.com/dchitlxsf/image/upload/v1772914765/Foto_dari_Nsfall_afsymk.jpg" 
                alt="Background" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
                <Eye size={32} className="text-white" />
              </div>
              <h3 className="text-4xl font-serif font-bold mb-6">Visi</h3>
              <p className="text-xl leading-relaxed font-medium">
                "Menjadi destinasi agroeduwisata terkemuka yang menginspirasi harmoni antara manusia dan alam melalui edukasi, rekreasi, dan pemberdayaan masyarakat."
              </p>
            </div>
          </div>

          {/* MISI BOX */}
          <div className="lg:col-span-7 reveal-up rounded-[2.5rem] bg-white dark:bg-[#111] p-10 md:p-14 shadow-xl border border-gray-100 dark:border-white/5">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-500/20 rounded-2xl flex items-center justify-center mb-8">
              <Target size={32} className="text-orange-500" />
            </div>
            <h3 className="text-4xl font-serif font-bold mb-8 text-black dark:text-white">Misi</h3>
            
            <div className="space-y-6">
              {[
                "Menyediakan pengalaman wisata alam yang edukatif, interaktif, dan berkelanjutan bagi semua kalangan.",
                "Mendukung pelestarian lingkungan dan ekosistem lokal melalui praktik agrowisata yang ramah lingkungan.",
                "Memberdayakan masyarakat sekitar melalui kolaborasi ekonomi kreatif dan penyerapan tenaga kerja lokal.",
                "Memberikan pelayanan prima dengan keramahtamahan khas Indonesia untuk menciptakan kenangan tak terlupakan."
              ].map((misi, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-1 shrink-0">
                    <CheckCircle2 size={24} className="text-orange-500" />
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {misi}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
