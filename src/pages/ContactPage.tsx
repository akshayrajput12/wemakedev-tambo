
import ContactHero from '../components/contact/ContactHero';
import ContactInfo from '../components/contact/ContactInfo';
import ContactForm from '../components/contact/ContactForm';
import ContactFAQ from '../components/contact/ContactFAQ';

export default function ContactPage() {
    return (
        <>
            <ContactHero />
            <main className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-20 lg:py-20">
                <ContactInfo />
                <ContactForm />
                <ContactFAQ />
            </main>
        </>
    );
}
