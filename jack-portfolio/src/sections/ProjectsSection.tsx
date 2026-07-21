import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';

const projects = [
    {
        num: '01',
        category: 'Client',
        name: 'Nextlevel Studio',
        images: {
            col1: [
                'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
                'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
            ],
            col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
        },
    },
    {
        num: '02',
        category: 'Personal',
        name: 'Aura Brand Identity',
        images: {
            col1: [
                'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
                'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
            ],
            col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
        },
    },
    {
        num: '03',
        category: 'Client',
        name: 'Solaris Digital',
        images: {
            col1: [
                'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
                'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
            ],
            col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
        },
    },
];

const TOTAL = projects.length;

function ProjectCard({
    project,
    index,
    containerProgress,
}: {
    project: (typeof projects)[0];
    index: number;
    containerProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
    const targetScale = 1 - (TOTAL - 1 - index) * 0.03;
    const scale = useTransform(containerProgress, [index / TOTAL, 1], [1, targetScale]);

    return (
        <div className="sticky" style={{ top: `${96 + index * 28}px` }}>
            <motion.div
                style={{ scale, background: '#0c0c0c' }}
                className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8"
                id={`project-card-${index}`}
            >
                {/* Top row */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4 md:gap-6">
                        {/* Number */}
                        <span
                            className="font-black text-[#D7E2EA] leading-none"
                            style={{ fontSize: 'clamp(3rem, 10vw, 140px)', lineHeight: 1 }}
                        >
                            {project.num}
                        </span>
                        {/* Category + Name */}
                        <div className="flex flex-col">
                            <span
                                className="text-[#D7E2EA] font-light uppercase tracking-widest"
                                style={{ fontSize: 'clamp(0.7rem, 1.2vw, 1rem)', opacity: 0.6 }}
                            >
                                {project.category}
                            </span>
                            <span
                                className="text-[#D7E2EA] font-medium uppercase"
                                style={{ fontSize: 'clamp(1rem, 2.2vw, 2rem)' }}
                            >
                                {project.name}
                            </span>
                        </div>
                    </div>
                    <LiveProjectButton />
                </div>

                {/* Image grid */}
                <div className="flex gap-3">
                    {/* Left column — 40% */}
                    <div className="flex flex-col gap-3" style={{ flex: '0 0 40%' }}>
                        <img
                            src={project.images.col1[0]}
                            alt={`${project.name} preview 1`}
                            loading="lazy"
                            className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                            style={{ height: 'clamp(130px, 16vw, 230px)' }}
                        />
                        <img
                            src={project.images.col1[1]}
                            alt={`${project.name} preview 2`}
                            loading="lazy"
                            className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                            style={{ height: 'clamp(160px, 22vw, 340px)' }}
                        />
                    </div>

                    {/* Right column — 60% */}
                    <div style={{ flex: '1 1 60%' }}>
                        <img
                            src={project.images.col2}
                            alt={`${project.name} main`}
                            loading="lazy"
                            className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                            style={{ minHeight: 'clamp(290px, 38vw, 570px)' }}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function ProjectsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    return (
        <section
            id="projects"
            ref={containerRef}
            className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 md:pt-32 pb-32"
            style={{ background: '#0c0c0c' }}
        >
            {/* Heading */}
            <FadeIn delay={0} y={40} duration={0.7}>
                <h2
                    className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20"
                    style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
                >
                    Project
                </h2>
            </FadeIn>

            {/* Cards — each inside an h-[85vh] container to create scroll travel */}
            <div>
                {projects.map((project, i) => (
                    <div key={project.num} className="h-[85vh]">
                        <ProjectCard
                            project={project}
                            index={i}
                            containerProgress={scrollYProgress}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
