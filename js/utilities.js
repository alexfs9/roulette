// Devuelve la rotación en grados de un elemento
export function getCurrentRotation(el) {
    var st = window.getComputedStyle(el, null);
    var tm = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform") ||
        "none";
    if (tm != "none") {
        var values = tm.split('(')[1].split(')')[0].split(',');
        var angle = Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI));
        return (angle < 0 ? angle + 360 : angle);
    }
    return 0;
}

// Recibe un Nº base 1 y devuelve un Nº base 360
export function probabilityToGrades(probability) {
    return probability * 360 / 100;
}

// Recibe un Nº base 1 y devuelve radianes
function probabilityToRadians(probability) {
    return probability / 100 * 2 * Math.PI;
}

export function getPositionForProbability(probability) {
	if(probability === 100){
		return ''
	}
	if(probability >= 87.5){
		const x5 = Math.tan(probabilityToRadians(probability)) * 50 + 50;
		return `clip-path: polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 0, ${x5}% 0, 50% 50%)`
	}
	if(probability >= 75){
		const y5 = 100 - (Math.tan(probabilityToRadians(probability-75)) * 50 + 50);
		return `clip-path: polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0% ${y5}%, 50% 50%)`
	}
	if(probability >= 62.5){
		const y5 = 100 - (0.5 - (0.5/ Math.tan(probabilityToRadians(probability)))) * 100;
		return `clip-path: polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0% ${y5}%, 50% 50%)`
	}
	if(probability >= 50){
		const x4 = 100 - (Math.tan(probabilityToRadians(probability)) * 50 + 50);
		return `clip-path: polygon(50% 0, 100% 0, 100% 100%, ${x4}% 100%, 50% 50%)`
	}
	if(probability >= 37.5){
		const x4 = 100 - (Math.tan(probabilityToRadians(probability)) * 50 + 50);
		return `clip-path: polygon(50% 0, 100% 0, 100% 100%, ${x4}% 100%, 50% 50%)`
	}
	if(probability >= 25){
		const y3 = Math.tan(probabilityToRadians(probability-25)) * 50 + 50;
		return `clip-path: polygon(50% 0, 100% 0, 100% ${y3}%, 50% 50%)`
	}
	if(probability >= 12.5){
		const y3 = (0.5 - (0.5/ Math.tan(probabilityToRadians(probability)))) * 100;
		return `clip-path: polygon(50% 0, 100% 0, 100% ${y3}%, 50% 50%)`
	}
	if(probability >= 0){
		const x2 = Math.tan(probabilityToRadians(probability)) * 50 + 50;
		return `clip-path: polygon(50% 0, ${x2}% 0, 50% 50%)`
	}
}

export function getDate() {
	let today = new Date();
	return today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
}