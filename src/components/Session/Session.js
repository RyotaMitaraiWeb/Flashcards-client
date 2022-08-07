import Flashcard from '../Flashcard/Flashcard';
import Icon from '../Icon/Icon';
import { useState } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import './Session.scss';

export default function Session(props) {
    const cards = props.flashcards;
    const [counter, updateCounter] = useState(0);
    const [isFlipped, setFlip] = useState(false);

    function increment() {
        setFlip(false);
        updateCounter(state => state + 1);
    }

    function decrement() {
        setFlip(false);
        updateCounter(state => state - 1);
    }

    function flip() {
        setFlip(state => !state);
    }

    return (
        <>
            <p className="count">{counter + 1} / {cards.length}</p>
            <section className="session">
                <div className="group arrows">
                    <button className={"previous" + (counter === 0 ? " invisible" : "")} onClick={decrement}><Icon icon="arrow-left" /></button>
                </div>
                <Flippy
                    flipDirection="vertical"
                    isFlipped={isFlipped}
                    onClick={flip}
                >
                    <FrontSide>
                        <Flashcard colorTheme="purple" context="card">
                            <div className="flashcard-side front">
                                {cards[counter].front}
                            </div>
                        </Flashcard>
                    </FrontSide>
                    <BackSide>
                        <Flashcard colorTheme="purple" context="card">
                            <div className="flashcard-side">
                                {cards[counter].back}
                            </div>
                        </Flashcard>
                    </BackSide>
                </Flippy>
                <div className="group arrows">
                    <button className={"next" + (counter >= cards.length - 1 ? " invisible" : "")} onClick={increment}><Icon icon="arrow-right" /></button>
                </div>
            </section>
        </>)
}