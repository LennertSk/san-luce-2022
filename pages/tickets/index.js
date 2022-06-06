import React, {useState} from 'react';
import MasterLayout from "../../components/master-layout";
import MainHeader from "../../components/main-header";
import Script from "next/script";

const Tickets = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    return (
        <MasterLayout>
            <Script
                src="https://esq-store.s3.amazonaws.com/public/js/embed.js"
                onLoad={ () => {
                    ESQ.embed({
                        link: "https://san-luce2020.eventsquare.co/nkawi4wmgq5y/2ysnkmg3defe",
                        element: "esq-store",
                    });
                    setIsLoading(false);
                } }
                onError={ () => {
                    setError('Oeps, er ging iets fout. Probeer het later nog eens.');
                } }
            />
            <div className="main-layout__content">
                <MainHeader/>
                <div className="section-tickets">
                    <section className="container">
                        <h3>Tickets</h3>
                        <ul className="text">
                            <li>Tickets zijn enkel voor personen die 16 jaar of ouder zijn;</li>
                            <li>Dagtickets kosten &euro;11,00 en zijn geldig op de gekozen dag;</li>
                            <li>Combitickets kosten &euro;18,00 en zijn het hele weekend geldig;</li>
                            <li>Groep combitickets kosten &euro;97,00 en zijn het hele weekend geldig voor 6 personen;</li>
                            <li>Tickets worden niet terugbetaald;</li>
                            <li>Tickets kunnen niet worden doorverkocht;</li>
                            <li>Tickets zijn uitsluitend online te verkrijgen, niet aan de kassa.</li>
                        </ul>
                        <div className="section-tickets__inner">
                            <div className="section-tickets__notification">
                                San Luce is enkel toegankelijk voor personen die 16 jaar of ouder zijn!
                            </div>
                            { error ? (
                                <div className="alert alert-danger" role="alert">
                                    { error }
                                </div>
                            ) : '' }
                            { isLoading ? (
                                <div className="section-tickets__spinner">
                                    <div className="spinner-border" role="status"/>
                                </div>
                            ) : '' }
                            <div id="esq-store"/>
                        </div>
                    </section>
                </div>
            </div>
        </MasterLayout>
    )
}

export default Tickets;
