import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';

const ABOUT_TEXT =
    "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let\u2019s build something incredible together!";

export default function AboutSection() {
    return (
        <section
            id="about"
            className="relative min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-10 py-20"
            style={{ background: '#0c0c0c' }}
        >
            {/* Decorative images */}
            {/* Top-left: Moon */}
            <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
                <img
                    src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
                    alt="Moon decoration"
                    className="absolute w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none select-none"
                    style={{ top: '4%', left: 'clamp(1%, 4%, 4%)' }}
                />
            </FadeIn>

            {/* Bottom-left: 3D object */}
            <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
                <img
                    src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
                    alt="3D object decoration"
                    className="absolute w-[100px] sm:w-[140px] md:w-[180px] pointer-events-none select-none"
                    style={{ bottom: '8%', left: 'clamp(3%, 10%, 10%)' }}
                />
            </FadeIn>

            {/* Top-right: Lego */}
            <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
                <img
                    src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
                    alt="Lego icon decoration"
                    className="absolute w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none select-none"
                    style={{ top: '4%', right: 'clamp(1%, 4%, 4%)' }}
                />
            </FadeIn>

            {/* Bottom-right: 3D group */}
            <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
                <img
                    src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
                    alt="3D group decoration"
                    className="absolute w-[130px] sm:w-[170px] md:w-[220px] pointer-events-none select-none"
                    style={{ bottom: '8%', right: 'clamp(3%, 10%, 10%)' }}
                />
            </FadeIn>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center gap-10 sm:gap-14 md:gap-16">
                {/* Heading */}
                <FadeIn delay={0} y={40} duration={0.7}>
                    <h2
                        className="hero-heading font-black uppercase leading-none tracking-tight"
                        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
                    >
                        About me
                    </h2>
                </FadeIn>

                {/* Animated paragraph + button */}
                <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
                    <div style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}>
                        <AnimatedText
                            text={ABOUT_TEXT}
                            className="text-[#D7E2EA] font-medium leading-relaxed max-w-[560px] text-center"
                        />
                    </div>
                    <ContactButton />
                </div>
            </div>
        </section>
    );
}
