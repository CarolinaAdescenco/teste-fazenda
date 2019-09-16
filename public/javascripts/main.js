 // Make percentage calculation
percentageCalculation = (total, prop) =>  parseFloat((Math.round(prop * 100) / total)).toFixed(0);


//Compare positive percentage of participants and sort by result
sortParticipants = (a, b) => {
    let participant = parseInt(a.positive) + parseInt(a.negative);
    let otherParticipant = parseInt(b.positive) + parseInt(b.negative);
    return percentageCalculation(participant, a.negative) - percentageCalculation(otherParticipant, b.negative);
}

// Ajax request for fazenda.json
const requestAjax = (URL_TO_FETCH, func, method = 'get', contentJson = null) => {
    if (method == 'get') {
        fetch(URL_TO_FETCH, {
            method: 'get'
        })
            .then(response => {
                return response.json();
            }).then(response => {
                let body_ranking = document.getElementById('ranking-wrapper');
                body_ranking.innerHTML = func(response.data);
            })
            .catch(function (err) {
                console.error(err);
            });
    }
}

const makeHtml = (content) => {

    let html = '';

    content.sort((a, b) => {
        return sortParticipants(a, b);
    }).forEach((participant, i) => {

        let total = parseInt(participant.positive) + parseInt(participant.negative);

        html += `
            <div class="rank-item tooltip">
                <div class="row">
                    <div class="image">
                        <img src="${participant.picture}"
                            class="img-fluid" alt="">
                        <span>${i + 1}</span>
                    </div>
                    <div class="content-box">
                        <h2>${participant.name}</h2>
                        <p>${participant.description}</p>
                    </div>
                </div>

                <div class="tooltiptext">
                    <div class="positive">
                        <h3>Gostam</h3>
                        <p>${total && participant.positive && percentageCalculation(total, participant.positive) || 0}% </p>
                    </div>
                    <div class="negative">
                        <h3>Não gostam</h3>
                        <p>${total && participant.negative && percentageCalculation(total, participant.negative) || 0}% </p>
                    </div>
                </div>
            </div>
        `
    });

    return [html];
}


requestAjax('./fazenda.json', makeHtml);