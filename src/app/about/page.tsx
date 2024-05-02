export default function AboutPage() {
    return (
        <section className="max-w-xl mx-auto text-center mt-16">
            <h1 className="text-4xl font-bold italic">
                Frequently Asked Questions
            </h1>
            <div className="mt-6 mb-6">
                If you can't find an answer that you're looking for, feel free to drop us a line.
            </div>
            <div className="flex justify-between ml-8 mr-8">
                <button className="border-2 border-black rounded-full p-2">
                    About the Company
                </button>
                <button className="border-2 border-black rounded-full p-2">
                    Contact Support
                </button>
                <button className="border-2 border-black rounded-full p-2">
                    Visit Help Center
                </button>
            </div>
        </section>

    )
}