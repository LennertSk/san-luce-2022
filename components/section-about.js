import React from 'react';
import Link from 'next/link';

const SectionAbout = () => {

    return (
        <div className="section-about__wrapper">
            <div className="section-about">
                <div className="section-about__inner">
                    <h1>Lorem ipsum dolor!</h1>
                    <br/>
                    <p className='text'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum nulla perferendis possimus quas vitae? Dignissimos error nam nemo nulla pariatur, provident repellat sit voluptatem. In.
                    </p>
                    <br/>
                    <Link href='#'>
                        <a className='btn btn-outline-light'>
                            Line up
                        </a>
                    </Link>
                    <br/>
                    <Link href='#'>
                        <a className='btn btn-light'>
                            Tickets
                        </a>
                    </Link>
                </div>
                <div className="section-about__movie">
                    <video
                        controls
                        src={ "/media/aftermovie.mp4" }
                        autoPlay
                        muted
                        loop
                        className='section-about__movie--player' />
                </div>
            </div>
        </div>
    );
};

export default SectionAbout;