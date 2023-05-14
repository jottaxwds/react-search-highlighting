import React from 'react';

import Highlighting from '../Highlighting';
import useHighlighting from '../useHighlighting';

const Content = () => {
    const { config } = useHighlighting();
    return (
        <section>
            <article>
                <Highlighting config={config}>
                sit Sit SIt siT
                Lorem îpsum dôlor sit âmet, çonsectetûr adipîscing élît.
                Séd do ëiusmod têmpor încidunt ut lâbore et dolore mâgna âliqua.
                Ût ênim âd minim vêniam, quis nostrûd exercîtâtîon ûllamco laborîs
                nîsi ut âlîquip êx eâ commodo conséquat. Dûîs âute îrûre dolor in
                reprehenderit în vôluptâte velit esse cillûm dolore eu fugîat nûlla parîâtûr.
                Excepteur sînt occaecât cupidâtât non proîdent, sînt în culpa qui officia
                deserunt mollît anim id est laborum. Nîsi ut âlîquîp ex ea commôdo consequat.
                Dûîs autem vêl eûm iriûre reprehenderit in voluptâte velit esse cillum dolore eu
                fugiât nûlla pariatûr. Excepteur sînt occaecât cupidatat non proîdent,
                sînt in culpa qui officia deserunt mollit anim id est laborum.
                </Highlighting>
            </article>
        </section>
    );
};

export default Content;
