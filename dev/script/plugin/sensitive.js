class Sensitive {
    constructor() {
        this.filter = ['ass', 'asslick', 'asses', 'asshole', 'assholes', 'asshoel', 'asskisser', 'asswipe', 'bearded clam',
            'bitch', 'bitcher', 'bitchers', 'bitches', 'bitchin', 'bitching', 'blowjob', 'blowjobs', 'bullshit',
            'buttfuck', 'buttfucker', 'buttfuckers', 'chink', 'circlejerk', 'circle jerk', 'clit', 'cock', 'cocks',
            'cocksuck', 'cocksucked', 'cocksucker', 'cocksucking', 'cocksucks', 'cooter', 'cum', 'cummer', 'cumming',
            'cumin', 'cumn', 'cums', 'cumshot', 'cunt', 'cuntbreath', 'cuntdog', 'cuntlick', 'cuntlicker', 'cuntlicking',
            'cunts', 'cuntsucker', 'cyberfuc', 'cyberfuck', 'cyberfucker', 'cyberfuckers', 'cyberfucking', 'damn', 'damned',
            'damnit', 'damnmit', 'dammit', 'dick', 'dickbreath', 'dickface', 'dickhead', 'dickless', 'dicks', 'dicksmack',
            'dicksucker', 'dike', 'dikes', 'dyke', 'dykes', 'dildo', 'dildos', 'dilldoe', 'dilldos', 'dink', 'dinks', 'dipshit', 'douche',
            'douchebag', 'douchebags', 'dumbass', 'dumbasses', 'fag', 'fagget', 'fagging', 'faggit', 'faggot', 'fagit', 'fagot',
            'fagots', 'fags', 'fatass', 'fatasses', 'fingerfuck', 'fingerfucked', 'fingerfucker', 'fingerfuckers', 'fingerfucking',
            'fingerfucks', 'fistfuck', 'fistfucked', 'fistfucker', 'fistfuckers', 'fistfucking', 'fistfucking', 'fistfuckings',
            'fistfucks', 'fuck', 'fuckbutt', 'fucked', 'fucker', 'fuckers', 'fuckface', 'fuckhead', 'fuckin', 'fucking', 'fuckings',
            'fuckme', 'fucks', 'fuckup', 'goddam', 'godammit', 'goddammit', 'goddamn', 'goddamm', 'jack off', 'jack-off', 'jackass',
            'jack ass', 'jackoff', 'jerkoff', 'jerk-off', 'jerk off', 'jiz', 'jizz', 'mothafuck', 'mothafucka', 'mothafuckas', 'mothafuckaz',
            'mothafucked', 'mothafucker', 'mothafuckers', 'mothafuckin', 'mothafucking', 'mothfuckings', 'mothafucks', 'motherfuck',
            'motherfucked', 'motherfucker', 'motherfuckers', 'motherfuckin', 'motherfucking', 'motherfuckings', 'motherfucks', 'mutherfucker',
            'nigger', 'niggers', 'pecker', 'peckerhead', 'penis', 'penisbreath', 'penishead', 'piss', 'pissant', 'pissed', 'pissedoff',
            'pissed off', 'pisser', 'pissers', 'pisses', 'pissin', 'pissing', 'pissoff', 'prick', 'pricks', 'puntang', 'pussies', 'pussylip',
            'pussywhip', 'pussywhiped', 'pussydick', 'pussylips', 'pussy', 'pussys', 'queer', 'sex', 'schlong', 'shit', 'shitass', 'shited',
            'shitface', 'shitfull', 'shithead', 'shithloe', 'shithole', 'shiting', 'shitings', 'shits', 'shitted', 'shitter', 'shitters',
            'shitting', 'shittings', 'shitty', 'slackass', 'slut', 'sluts', 'slutty', 'snatch', 'suck', 'tit', 'tits', 'titty', 'tittyfuck',
            'tittifuck', 'titifuck', 'titifucker', 'twat', 'vag', 'vagina', 'vaginas', 'vaginal', 'whore', 'whores'
        ];
    }

    getFilterResult(value){
    	this.Illegal = this.checkCustomName(value);
    	return 	this.Illegal;
    }

    checkCustomName(testStr) {
        let Illegal = false;
        testStr = testStr.toLowerCase();
        //check bad words
        //---------------------------------
        for (let i = 0; i < this.filter.length; i++) {
            let pattern = new RegExp('\\b' + this.filter[i] + '\\b', 'g');
            let containBadWords = pattern.test(testStr);
            if (containBadWords) {
                Illegal = true;
            }
        }
        //return containBadWords;
        //check spec illegal characters
        //---------------------------------
        if (testStr.match(/[\<\>!@#~`·()\$%^&\*,]+/i)) {
            Illegal = true;
        }
        return Illegal;
    }
}

export default Sensitive;