function formatDate(date) {
	return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
}

export function savePlay(award) {
    const now = new Date();
    const date = now.toISOString();
    let play = {
        dateToShow: formatDate(now),
        date: date,
        award: award
    }
    localStorage.setItem('play', JSON.stringify(play));
    console.log('Jugada guardada:', play);
    return play;
}

function hasOneDayPassed(date) {
    const oneDayInMilliseconds  = 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const oldDate = new Date(date);
    return (currentDate - oldDate) > oneDayInMilliseconds;
}

export function checkTimeAndClearData() {
    const data = localStorage.getItem('play');
    if (data) {
        const play = JSON.parse(data);
        if (hasOneDayPassed(play.date)) {
            localStorage.removeItem('play');
            console.log('Se elimino la jugada, pasó un día.');
        }
    }
}