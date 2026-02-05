
import { steps } from '../../data';

export default function HowItWorks() {
    return (
        <section className="w-full bg-white py-16 lg:py-24 dark:bg-[#101922]">
            <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-slate-dark dark:text-white sm:text-4xl">How It Works</h2>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">Get hired in three simple steps. We've streamlined the process so you can focus on what matters most.</p>
                </div>
                <div className="grid gap-8 md:grid-cols-3 relative">
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-100 dark:bg-gray-800 -z-10"></div>
                    {steps.map((step, index) => (
                        <div key={index} className="group flex flex-col items-center text-center">
                            <div className="flex size-24 items-center justify-center rounded-full bg-white border-4 border-slate-50 text-primary shadow-lg mb-6 group-hover:scale-110 transition-transform dark:bg-[#1e293b] dark:border-gray-700">
                                <span className="material-symbols-outlined text-4xl">{step.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-dark dark:text-white mb-3">{step.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
