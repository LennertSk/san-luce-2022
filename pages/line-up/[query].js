import React, {useState} from 'react';
import Link from 'next/link';
import MasterLayout from '../../components/master-layout';
import MainHeader from "../../components/main-header";
import {useRouter} from "next/router";
import lineUpData from '../../data/line-up.json';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faSoundcloud, faSpotify} from "@fortawesome/free-brands-svg-icons";

const Query = ({lineUpData}) => {
    const { query } = useRouter();
    const [expandedDetails, setExpandedDetails] = useState(false);
    const [detailsTitle, setDetailsTitle] = useState('');
    const [detailsDescription, setDetailsDescription] = useState('');
    const [detailsImage, setDetailsImage] = useState('');
    const [detailsDay, setDetailsDay] = useState('');
    const [detailsHour, setDetailsHour] = useState('');
    const [socials, setSocials] = useState('');

    const toggleModal = (event) => {
        event.preventDefault();

        const target = event.target.closest('.line-up__item');
        if (target) {
            const item = JSON.parse(target.getAttribute('data-detail'));
            setDetailsTitle(item.name)
            setDetailsDescription(item.description)
            setDetailsImage(item.image)
            setExpandedDetails(!expandedDetails);
            setDetailsDay(item.day);
            setDetailsHour(item.hour);
            setSocials(item.socials);
        }
    };

    const closeModal = (event) => {
        setExpandedDetails(false);
    }

    const getDetailInfo = (item) => {
        return JSON.stringify({
            'name': item.name,
            'description': item.description,
            'image': item.image,
            'day': item.date,
            'hour': item.time,
            'socials': item.socials
        });
    };

    const currentDate = new Date();

    return (
        <MasterLayout>
            <div className="main-layout__content">
                <MainHeader/>
                <div className="section-line-up">
                    <div className="container">
                        <div>
                            <ul className="section-line-up__menu">
                                <li className="main-navigation__menu--item">
                                    <Link href="/line-up">Release date</Link>
                                </li>
                                <li className={ (query.query === "friday" ? 'main-navigation__menu--item is-active' : 'main-navigation__menu--item') }>
                                    <Link href="/line-up/friday">Vrijdag</Link>
                                </li>
                                <li className={ (query.query === "saturday" ? 'main-navigation__menu--item is-active' : 'main-navigation__menu--item') }>
                                    <Link href="/line-up/saturday">Zaterdag</Link>
                                </li>
                            </ul>
                        </div>
                        <section className="section-line-up__inner">
                            <div className="grid line-up">
                                { lineUpData ? lineUpData.map((item, index) => {
                                    const isReleased = currentDate > new Date(item.release);
                                    if (!isReleased) return ('');

                                    const backgroundImage = `linear-gradient(to bottom left, rgba(235, 54, 23, 0.5), rgba(24, 158, 100, 0.5)), url('../images/lineup/${item.image}')`;
                                    return (
                                        <div
                                            key={ index }
                                            className="grid__item line-up__item"
                                            style={{backgroundImage: backgroundImage}}
                                            onClick={ toggleModal }
                                            data-detail={ getDetailInfo(item) }
                                        >
                                            <span className="line-up__item--name">
                                                {item.name}
                                            </span>
                                            <div className="line-up__item--date">
                                                <span>{item.date}</span>
                                                <span>{item.time}</span>
                                            </div>
                                        </div>
                                    );
                                }) : ''}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div className="dialog" hidden={ !expandedDetails }>
                <div className="dialog__image">
                    <img src={ `../images/lineup/${detailsImage}` } alt={ `${detailsTitle} image` }/>
                </div>
                <div className="dialog__inner">
                    <div className="dialog__title">
                        <h3>{detailsTitle}</h3>
                    </div>
                    <div className="dialog__description">
                        <p className="text">
                            {detailsDescription}
                        </p>
                    </div>
                    <div className="dialog__bottom">
                        <div className="dialog__bottom--date">
                            <span>{detailsDay}</span>
                            <span>{detailsHour}</span>
                        </div>
                        <div className="dialog__bottom--socials">
                            {socials.facebook !== '' ? (
                                <a target="_blank" className="socials--item" href={ socials.facebook } rel="noreferrer">
                                    <FontAwesomeIcon icon={ faFacebook } className="socials--item--icon" />
                                </a>
                            ) : ''}
                            {socials.instagram !== '' ? (
                                <a target="_blank" className="socials--item" href={ socials.instagram } rel="noreferrer">
                                    <FontAwesomeIcon icon={ faInstagram } className="socials--item--icon" />
                                </a>
                            ) : ''}
                            {socials.spotify !== '' ? (
                                <a target="_blank" className="socials--item" href={ socials.spotify } rel="noreferrer">
                                    <FontAwesomeIcon icon={ faSpotify } className="socials--item--icon" />
                                </a>
                            ) : ''}
                            {socials.soundcloud !== '' ? (
                                <a target="_blank" className="socials--item" href={ socials.soundcloud } rel="noreferrer">
                                    <FontAwesomeIcon icon={ faSoundcloud } className="socials--item--icon" />
                                </a>
                            ) : ''}
                        </div>
                    </div>
                </div>
            </div>
            <div className="fade modal dialog__backdrop" hidden={ !expandedDetails } onClick={ closeModal } />
        </MasterLayout>
    );
};

export const getStaticPaths = async () => {
    const data = lineUpData.data;

    const paths = data.map((item) => ({
        params: { query: item.date.toString() }
    }));

    return {
        paths,
        fallback: true,
    }
};


export const getStaticProps = async (context) => {
    const queryDate = context.params.query;

    // Filter line-up by day
    const data = lineUpData.data.filter(function (item) {
        return item['date'] === queryDate;
    });

    // Sort by time
    data.sort((a, b) => (b.time.substr(0,5) > a.time.substr(0,5)) ? 1 : ((a.time.substr(0,5) > b.time.substr(0,5)) ? -1 : 0));

    return {
        props: { lineUpData: data },
    };
};

export default Query;
