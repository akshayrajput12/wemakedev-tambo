
import { steps } from '../../data';

export default function HowItWorks() {
    return (
        <section className="w-full bg-[#111827] py-24">
            <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">How It Works</h2>
                    <p className="mt-4 text-gray-400">Get hired in three simple steps. We've streamlined the process so you can focus on what matters most.</p>
                </div>
                <div className="grid gap-8 md:grid-cols-3 relative">
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-800 -z-10"></div>
                    {steps.map((step, index) => (
                        <div key={index} className="group flex flex-col items-center text-center">
                            <div className="flex size-24 items-center justify-center rounded-full bg-[#101922] border-4 border-gray-800 text-primary shadow-lg mb-6 group-hover:scale-110 transition-transform shadow-primary/20">
                                <span className="material-symbols-outlined text-4xl">{step.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-gray-400 leading-relaxed max-w-xs">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
