import logo from './logoo.jpeg'
import spinner from './spinner.gif'

const send_icon = <span class="material-symbols-outlined">
    send
</span>


const arrow_left = <span className="material-symbols-outlined">
    arrow_circle_left
</span>
const summary = <span className="material-symbols-outlined">
    notes
</span>
const paraphrase = <span className="material-symbols-outlined">
    edit_note
</span>
const spell = <span className="material-symbols-outlined">
    spellcheck
</span>
const grammar = <span className="material-symbols-outlined">
    rule
</span>
const wordmean = <span className="material-symbols-outlined">
    abc
</span>
const article = <span className="material-symbols-outlined">
    article
</span>
const essay = <span className="material-symbols-outlined">
    description
</span>
const story = <span className="material-symbols-outlined">
    history_edu
</span>
const poem = <span className="material-symbols-outlined">
    align_horizontal_left
</span>
const play = <span className="material-symbols-outlined">
    diversity_3
</span>
const debate = <span className="material-symbols-outlined">
    record_voice_over
</span>

const loader = <span className='spinner'>
    <img src={spinner} alt='spinner' />
</span>

export const assets = {
    arrow_left,
    summary,
    paraphrase,
    spell,
    grammar,
    wordmean,
    article,
    essay,
    story,
    poem,
    play,
    debate,
    send_icon,
    logo,

    loader
}