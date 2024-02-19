//SSML interpretation of expletive words

const expletiveWords = ['Shit', 'Damn', 'Bastard', 'bloody', 'Bugger'];

const bleepWords = (text) => {
    const regex = new RegExp(expletiveWords.join('|'),'gi');
    const bleepedText = text.replace(regex, (match) => {
        return `<say-as interpret-as="expletive">${match}</say-as>`;

    });

    return bleepedText;


};

export default bleepWords;